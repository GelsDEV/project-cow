<script setup lang="ts">
// TypeScript Types
interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface HistoryItem {
  id: string
  createdAt: string
  status: 'Successful' | 'Failed' | 'Running'
  debug: {
    messages: Message[]
    ip?: string
  }
  msg?: {
    id: string
    model: string
    choices: Array<{
      message: Message
    }>
  }
  logobject: string
}

interface ApiResponse {
  ok: boolean
  message?: string
  data?: any[]
}

const route = useRoute()
const page = ref(route.query.page ? parseInt(String(route.query.page)) : 1)
const allHistory = ref<HistoryItem[]>([])

useHead({
  title: 'Dunklekuh — Chatverlauf',
  script: [
    {
      type: "module",
      src: "https://md-block.verou.me/md-block.js",
    }
  ],
})

// Reaktive URL für useFetch
const apiUrl = computed(() => {
  const query = []
  if (route.query.token) query.push(`token=${route.query.token}`)
  if (page.value > 0) query.push(`page=${page.value}`)
  
  const queryString = query.length > 0 ? '?' + query.join('&') : ''
  return `https://api.gels.dev/gpt/cow/history${queryString}`
})

// useFetch für GET-Requests mit optimiertem Caching
const { data: response, pending, error, refresh } = await useFetch<ApiResponse>(apiUrl, {
  key: () => `chat-history-${page.value}-${route.query.token || 'no-token'}`,
  server: false, // Client-only da wir Token-basierte API verwenden
  default: () => ({ ok: false, message: 'Laden...', data: [] }),
  transform: (data: any) => data as ApiResponse
})

// Computed für verarbeitete Daten und Status
const fetchResult = computed(() => {
  if (error.value) {
    return { ok: false, message: 'Fehler beim Laden der Daten', size: 0 }
  }
  
  const resp = response.value
  if (!resp?.ok) {
    return { ok: false, message: resp?.message || 'Keine Daten erhalten', size: 0 }
  }
  
  return {
    ok: true,
    message: resp.message || '',
    size: resp.data?.length || 0
  }
})

// Loading state für bessere UX
const isLoading = computed(() => pending.value)

// Watch für neue Daten und History-Management
watch(response, (newResponse) => {
  if (newResponse?.ok && newResponse?.data) {
    try {
      // Daten verarbeiten und typisieren
      const processedData: HistoryItem[] = newResponse.data.map((e: any) => ({
        ...e,
        debug: typeof e.debug === 'string' ? JSON.parse(e.debug) : e.debug,
        msg: e.msg && typeof e.msg === 'string' ? JSON.parse(e.msg) : e.msg,
        logobject: e.logobject.replace(/^https?:\/\//, '')
      }))
      
      if (page.value === 1) {
        // Erste Seite: Historie ersetzen
        allHistory.value = processedData
      } else {
        // Weitere Seiten: Nur neue Daten anhängen
        const existingIds = new Set(allHistory.value.map(item => item.id))
        const newItems = processedData.filter(item => !existingIds.has(item.id))
        allHistory.value.push(...newItems)
      }
    } catch (parseError) {
      console.error('Fehler beim Verarbeiten der History-Daten:', parseError)
    }
  }
}, { immediate: true })

const loadMore = async () => {
  if (!isLoading.value && fetchResult.value.size >= 10) {
    page.value++
    await refresh()
  }
}

// Reset bei Token-Änderung
watch(() => route.query.token, () => {
  page.value = 1
  allHistory.value = []
  refresh()
}, { immediate: false })
</script>

<template>
    <div>
        <h1 class="title">Chatverlauf CowGPT</h1>
        
        <!-- Error State -->
        <div v-if="!fetchResult.ok && !isLoading">
            <div class="badge status Failed">{{ fetchResult.message }}</div>
        </div>
        
        <!-- Loading State für erste Anfrage -->
        <div v-else-if="isLoading && allHistory.length === 0" class="loading">
            <div class="badge status Running">Lade Chatverlauf...</div>
        </div>
        
        <!-- History Display -->
        <div v-else v-auto-animate>
            <div class="history" v-for="obj in allHistory" :key="obj.id">
                <div class="header">
                    <h2>{{ new Intl.DateTimeFormat('de-DE', {
                        dateStyle: 'medium', timeStyle: 'medium'
                    }).format(new Date(obj.createdAt)) }}</h2>
                    <div class="details">
                        <div class="badge status" :class="obj.status">{{ obj.status }}</div>
                        <div v-if="obj.msg?.model" class="badge model">{{ obj.msg.model }}</div>
                        <div class="badge origin">{{ obj.logobject }}</div>
                        <div v-if="obj.debug?.ip" class="badge ip">{{ obj.debug.ip }}</div>
                        <NuxtLink v-if="obj.msg?.id" class="badge id" :to="`/?chat=${obj.msg.id.split('-')[1]}`" target="_blank">
                            🔗 {{ obj.msg.id.split('-')[1] }}
                        </NuxtLink>
                    </div>
                </div>
                <div v-for="(message, i) in obj.debug.messages" :key="i" class="message">
                    <p v-if="message.role === 'user'" :class="message.role">
                        {{ message.content }}
                    </p>
                    <div v-else :class="message.role">
                        <md-block>{{ message.content }}</md-block>
                    </div>
                </div>
                <div v-if="obj.msg" class="message">
                    <div v-for="(message_gpt, i) in obj.msg.choices" :key="i" :class="message_gpt.message.role">
                        <md-block>{{ message_gpt.message.content }}</md-block>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Load More Button -->
        <div class="loadmore" v-show="fetchResult.size >= 10 && !error">
            <button class="button" @click="loadMore" :disabled="isLoading">
                {{ isLoading ? 'Lade...' : 'Mehr laden' }}
            </button>
        </div>
    </div>
</template>

<style>
/* latin */
@font-face {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    src: url(/assets/fonts/KFOmCnqEu92Fr1Mu4mxK.woff2) format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
        U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
        U+FEFF, U+FFFD;
}

body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: "Roboto", sans-serif;
    color: #111b21;
}


h1,
h2,
h3 {
    margin-block: 0px;
}

.title {
    padding: 0.5em;
}

.loadmore {
    text-align: center;
}

.loading {
    padding: 1em;
    text-align: center;
}

.button {
    cursor: pointer;
    border-radius: 0.375rem;
    background-color: #dddddd;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 600;
    margin: 1em;
    border: none;
    transition: all 0.2s;
}

.button:hover:not(:disabled) {
    background-color: #cccccc;
}

.button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.history {
    border-style: dashed;
    border-color: #dddddd;
    border-radius: 1em;
    padding: 0.5em;
    padding-bottom: 0px;
    margin-bottom: 0.5em;
}

.history .header {
    padding: 0.5em;
}

.history .header .details {
    display: flex;
    flex-wrap: wrap;
}

.history .header .details .badge {
    margin-top: 0.25em;
}

.badge {
    display: inline-block;
    background-color: rgb(243 244 246);
    border-radius: 9999px;
    font-size: .75rem;
    line-height: 1rem;
    padding-bottom: 0.125rem;
    padding-top: 0.125rem;
    padding-left: 0.625rem;
    padding-right: 0.625rem;
}

.status.Successful {
    color: rgb(3 84 63);
    background-color: rgb(222 247 236);
}

.status.Failed {
    color: rgb(155 28 28);
    background-color: rgb(253 232 232);
}

.status.Running {
    color: rgb(114 59 19);
    background-color: rgb(253 246 178);
}

.history .header .details .status,
.history .header .details .model,
.history .header .details .origin,
.history .header .details .ip {
    margin-right: 0.5em;
}

.history .header .details .id {
    text-decoration: none;
    color: #111b21;
}

.history .header .details .id:hover {
    background-color: #ddd;
}

.history .message .user {
    padding: 0.75em;
    background-color: #dcf8c7;
    border-radius: 1em;
    margin-block: 0px;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
}

.history .message .assistant {
    padding: 0.75em;
    background-color: #f7f7f7;
    border-radius: 1em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
}

.history .message .assistant p {
    margin-block: 0px;
}

.history .message .assistant pre {
    white-space: pre-wrap;
}
</style>
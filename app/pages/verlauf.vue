<script setup lang="ts">
const route = useRoute()
const page = ref(route.query.page ? parseInt(String(route.query.page)) : 1)
const history = ref<any[]>([])

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

// useFetch mit automatischem Caching und Loading State
const { data: fetchResult, pending, error, refresh } = await useFetch(apiUrl, {
  key: 'chat-history',
  transform: (response: any): { ok: boolean; message: string; size: number } => {
    if (response?.ok && response?.data) {
      // Daten verarbeiten
      response.data.forEach((e: any) => {
        e.debug = JSON.parse(e.debug)
        e.msg = JSON.parse(e.msg)
        e.logobject = e.logobject.replace(/^https?:\/\//, '')
      })
      
      // Neue Daten zur Historie hinzufügen
      if (page.value === 1) {
        history.value = response.data
      } else {
        history.value.push(...response.data)
      }
    }
    
    return {
      ok: response?.ok || false,
      message: response?.message || (error.value ? 'Fehler beim Laden' : ''),
      size: response?.data?.length || 0
    }
  },
  default: () => ({ ok: true, message: "", size: 0 })
})

const loadMore = async () => {
  page.value++
  await refresh()
}

// Watch für Seiten-Änderungen
watch(page, () => {
  refresh()
})
</script>

<template>
    <div>
        <h1 class="title">Chatverlauf CowGPT</h1>
        <div v-if="!fetchResult.ok">
            <div class="badge status Failed">{{ fetchResult.message }}</div>
        </div>
        <div v-else v-auto-animate>
            <div class="history" v-for="obj in history" :key="obj.id">
                <div class="header">
                    <h2>{{ new Intl.DateTimeFormat('de-DE', {
                        dateStyle: 'medium', timeStyle: 'medium'
                    }).format(new Date(obj.createdAt)) }}</h2>
                    <div class="details">
                        <div class="badge status" :class="obj.status">{{ obj.status }}</div>
                        <div v-if="obj.msg && obj.msg.model" class="badge model">{{ obj.msg.model }}</div>
                        <div class="badge origin">{{ obj.logobject }}</div>
                        <div v-if="obj.debug && obj.debug.ip" class="badge ip">{{ obj.debug.ip }}</div>
                        <NuxtLink v-if="obj.msg && obj.msg.id" class="badge id" :to="`/?chat=${obj.msg.id.split('-')[1]}`" target="_blank">
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
        <div class="loadmore" v-show="fetchResult?.size >= 10">
            <button class="button" @click="loadMore">Mehr laden</button>
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
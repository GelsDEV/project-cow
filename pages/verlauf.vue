<script setup lang="ts">
const route = useRoute()
let page = route.query.page ? parseInt(String(route.query.page)) : 0
const history = ref([] as Array<any>);

onMounted(() => {
    $fetch(`https://api.gels.dev/gpt/cow/history?token=${route.query.token}${page > 0 ? "&page=" + page : ""}`)
        .then((resp: any) => {
            if (resp.ok) {
                resp.data.forEach((e: any) => {
                    e.debug = JSON.parse(e.debug)
                    e.msg = JSON.parse(e.msg)
                })
                history.value = resp.data
            }
        })
})
</script>

<template>
    <div>
        <h1>Verlauf</h1>
        <div class="history" v-for="obj in history" :key="obj.createdAt">
            <h2>{{ new Date(obj.createdAt) }}</h2>
            <h3>{{ obj.status }} | {{ obj.logobject }}</h3>
            <div v-for="(message, i) in obj.debug.messages" :key="i" class="message">
                <p v-if="message.role === 'user'" :class="message.role"><code>USER:</code> {{
                    message.content
                }}</p>
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
</template>

<style>
.history .message .assistant {
    padding-left: 1em;
    padding-right: 1em;
    padding-bottom: 0.1em;
    padding-top: 0.1em;
    background-color: #dddddd;
    border-radius: 1em;
}

.history .user {
    font-style: italic;
}
</style>
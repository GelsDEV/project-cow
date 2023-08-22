<template>
  <div class="page bg">
    <div class="marvel-device nexus5">
      <div class="top-bar"></div>
      <div class="sleep"></div>
      <div class="volume"></div>
      <div class="camera"></div>
      <div class="screen">
        <div class="screen-container">
          <div class="status-bar">
            <div class="time">
              {{ deviceTime }}
            </div>
            <div class="battery">
              <i class="zmdi zmdi-battery"></i>
            </div>
            <div class="network">
              <i class="zmdi zmdi-network"></i>
            </div>
            <div class="wifi">
              <i class="zmdi zmdi-wifi-alt-2"></i>
            </div>
            <div class="star">
              <i class="zmdi zmdi-star"></i>
            </div>
          </div>
          <div class="chat">
            <div class="chat-container">
              <div class="user-bar">
                <div class="back" onclick="location.href='https://eject.dunklekuh.de';" style="cursor: pointer">
                  <i class="zmdi zmdi-arrow-left"></i>
                </div>
                <div class="avatar" onclick="location.href='https://eject.dunklekuh.de';" style="cursor: pointer">
                  <img src="/avatar.jpg" alt="Avatar" />
                </div>
                <div class="name" onclick="location.href='https://eject.dunklekuh.de';" style="cursor: pointer">
                  <span>Dunklekuh</span>
                  <span class="status">online</span>
                </div>
                <div class="actions more">
                  <i class="zmdi zmdi-more-vert" onclick="location.href='https://troll.dunklekuh.de';"
                    style="cursor: pointer"></i>
                </div>
                <div class="actions attachment">
                  <i class="zmdi zmdi-attachment-alt" onclick="location.href='https://pr0gramm.com/';"
                    style="cursor: pointer"></i>
                </div>
                <div class="actions">
                  <i class="zmdi zmdi-phone" onclick="location.href='https://discord.com/channels/624302232594022456';"
                    style="cursor: pointer"></i>
                </div>
              </div>
              <div class="conversation">
                <div class="conversation-container">
                  <div v-for="message in messages" :key="message.time">
                    <MessageSent v-if="message.type === messageType.Sender" :time="message.time" :value="message.value"
                      :readed="message.readed" />
                    <MessageReceived v-else-if="message.type === messageType.Received" :time="message.time"
                      :value="message.value" :img="message.img" />
                  </div>
                </div>
                <form class="conversation-compose" @submit.prevent="onChatInput">
                  <div class="emoji">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="smiley" x="3147" y="3209">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M9.153 11.603c.795 0 1.44-.88 1.44-1.962s-.645-1.96-1.44-1.96c-.795 0-1.44.88-1.44 1.96s.645 1.965 1.44 1.965zM5.95 12.965c-.027-.307-.132 5.218 6.062 5.55 6.066-.25 6.066-5.55 6.066-5.55-6.078 1.416-12.13 0-12.13 0zm11.362 1.108s-.67 1.96-5.05 1.96c-3.506 0-5.39-1.165-5.608-1.96 0 0 5.912 1.055 10.658 0zM11.804 1.01C5.61 1.01.978 6.034.978 12.23s4.826 10.76 11.02 10.76S23.02 18.424 23.02 12.23c0-6.197-5.02-11.22-11.216-11.22zM12 21.355c-5.273 0-9.38-3.886-9.38-9.16 0-5.272 3.94-9.547 9.214-9.547a9.548 9.548 0 0 1 9.548 9.548c0 5.272-4.11 9.16-9.382 9.16zm3.108-9.75c.795 0 1.44-.88 1.44-1.963s-.645-1.96-1.44-1.96c-.795 0-1.44.878-1.44 1.96s.645 1.963 1.44 1.963z"
                        fill="#7d8489" />
                    </svg>
                  </div>
                  <input class="input-msg" name="input" placeholder="Type a message" autocomplete="off" autofocus
                    v-model="chat" />
                  <div class="photo">
                    <i class="zmdi zmdi-camera"></i>
                  </div>
                  <button class="send">
                    <div class="circle">
                      <i class="zmdi zmdi-mail-send"></i>
                    </div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";

const route = useRoute()
const router = useRouter()

/* Interfaces */

enum messageType {
  Sender,
  Received,
}

interface message {
  value: string;
  type: messageType;
  img?: string;
  time: string;
  readed: boolean;
}

/* Declarations */

/*

const memes = ref([
  'You were hugging an old man with a beard screaming\n"DUMBLEDORE YOU\'RE ALIVE!"',
  'Dude, you smashed my turtle saying "I\'M MARIO BROS!"',
  'Dude, you grabed seven oranges and yelled "I GOT THE DRAGON BALLS!"',
  'Dude, you threw my hamster across the room and said "PIKACHU I CHOOSE YOU!"',
  "Dude, you congratulated a potato for getting a part in Toy Story",
  'Dude, you were hugging an old man with a beard screaming "DUMBLEDORE YOU\'RE ALIVE!"',
  'Dude, you were cutting all my pinapples yelling "SPONGEBOB! I KNOW YOU\'RE THERE!"',
]);
const memeTrigger = ["meme", "lol"];
const jokeTrigger = [
  "joke",
  "scherz",
  "haha",
  "job",
  "work",
  "gag",
  "humor",
  "prank",
  "parody",
  "farce",
];
const catTrigger = ["cat", "katze", "miau", "miez", "kitten", "kitty", "pussy"];
const duckTrigger = ["duck", "ente"];
const httpDogTrigger = [
  "100",
  "101",
  "102",
  "103",
  "200",
  "201",
  "202",
  "203",
  "204",
  "205",
  "206",
  "207",
  "208",
  "218",
  "226",
  "300",
  "301",
  "302",
  "303",
  "304",
  "305",
  "306",
  "307",
  "308",
  "400",
  "401",
  "402",
  "403",
  "404",
  "405",
  "406",
  "407",
  "408",
  "409",
  "410",
  "411",
  "412",
  "413",
  "414",
  "415",
  "416",
  "417",
  "418",
  "419",
  "420",
  "421",
  "422",
  "423",
  "424",
  "425",
  "426",
  "427",
  "428",
  "429",
  "430",
  "431",
  "440",
  "444",
  "449",
  "450",
  "451",
  "460",
  "463",
  "464",
  "494",
  "495",
  "496",
  "497",
  "498",
  "499",
  "500",
  "501",
  "502",
  "503",
  "504",
  "505",
  "506",
  "507",
  "508",
  "509",
  "510",
  "511",
  "520",
  "521",
  "522",
  "523",
  "524",
  "525",
  "526",
  "527",
  "529",
  "530",
  "561",
  "598",
  "599",
  "999",
];
const ipTrigger = ["ip", "address", "adresse", "local", "ipconfig"];
const userTrigger = [
  "user",
  "benutzer",
  "person",
  "name",
  "alter",
  "buyer",
  "customer",
];
const excuseTrigger = ["excuse", "ausrede", "kein bock", "help", "time"];
const coffeeTrigger = [
  "coffee",
  "kaffee",
  "müde",
  "erschöpft",
  "pause",
  "break",
  "brew",
  "java",
  "cafe",
  "hot",
];
const startupIdeaTrigger = ["startup", "business", "idea", "idee", "geschäft"];
*/

useHead({
  link: [
    {
      rel: "stylesheet",
      href: "assets/css/material-design-iconic-font.min.css",
    },
    {
      rel: "stylesheet",
      href: "assets/css/devices.min.css",
    },
    {
      rel: "icon",
      href: "https://troll.dunklekuh.de/trollcow.png",
      type: "image/png",
    },
  ],
  script: [
    {
      type: "module",
      src: "https://md-block.verou.me/md-block.js",
    }
  ],
})

const messages = ref([] as Array<message>);
const chat = ref("");
const deviceTime = ref(moment().format("H:mm"));
const chat_id = ref(route.query.chat ? String(route.query.chat) : "");

/* Methods */

const scrollTop = (time?: number | undefined) => {
  setTimeout(
    () => {
      var conversation = document.querySelector(
        ".conversation-container"
      ) as any;
      conversation.scrollTop = conversation.scrollHeight;
    },
    time ? time : 0
  );
};

const askCowGPT = () => {
  const req = { messages: [] as Array<{ role: string; content: string }> };

  messages.value.forEach((message) => {
    req.messages.push({
      role: message.type === messageType.Sender ? "user" : "assistant",
      content: message.value,
    });
  });

  $fetch("https://api.gels.dev/gpt/cow", {
    method: "POST",
    body: JSON.stringify(req),
  }).then((resp: any) => {
    if (resp.ok) {
      messages.value.push({
        readed: false,
        value: resp.data.content,
        time: moment().format("H:mm"),
        type: messageType.Received
      })
      chat_id.value = resp.chat_id
    } else {
      messages.value.push({
        readed: false,
        value: resp.message,
        time: moment().format("H:mm"),
        type: messageType.Received
      })
    }
    scrollTop(500);
  })
    .catch(error => {
      console.log(error.data)
      messages.value.push({
        readed: false,
        value: error.data.message,
        time: moment().format("H:mm"),
        type: messageType.Received
      })
    })
}

const continueCowGPT = (p_chat_id: string) => {
  $fetch(`https://api.gels.dev/gpt/cow?id=${p_chat_id}`).then((resp: any) => {
    if (resp.ok) {
      resp.data.forEach((el: any) => {
        messages.value.push({
          readed: el.role === "user" ? false : false,
          value: el.content,
          time: moment().format("H:mm"),
          type: el.role === "user" ? messageType.Sender : messageType.Received
        })
      })
    } else {
      messages.value.push({
        readed: false,
        value: resp.message,
        time: moment().format("H:mm"),
        type: messageType.Received
      })
    }
    scrollTop(500);
  })
    .catch(error => {
      console.log(error.data)
      messages.value.push({
        readed: false,
        value: error.data.message,
        time: moment().format("H:mm"),
        type: messageType.Received
      })
    })
}

/*
const addReceivedMessage = (value: string, img?: string | undefined) => {
  messages.value.push({
    readed: false,
    time: moment().format("H:mm"),
    type: messageType.Received,
    value,
    img,
  });
};
*/

const onChatInput = () => {
  const length = messages.value.length;
  let input = chat.value.toLocaleLowerCase();
  if (!input) return;
  messages.value.push({
    readed: false,
    value: chat.value,
    time: moment().format("H:mm"),
    type: messageType.Sender,
  });
  setTimeout(() => {
    messages.value[length].readed = true;
  }, 500);
  askCowGPT();

  /*

  setTimeout(async () => {
    if (memeTrigger.some((e) => input.includes(e))) {
      const resp_memes = await $fetch("https://api.imgflip.com/get_memes").then(
        (resp: any) => resp.data.memes
      );
      const rnd_meme =
        resp_memes[Math.floor(Math.random() * resp_memes.length)];
      addReceivedMessage(rnd_meme.name, rnd_meme.url);
      scrollTop(500);
    } else if (jokeTrigger.some((e) => input.includes(e))) {
      addReceivedMessage(
        await $fetch(
          "https://geek-jokes.sameerkumar.website/api?format=json"
        ).then((resp: any) => resp.joke)
      );
    } else if (catTrigger.some((e) => input.includes(e))) {
      addReceivedMessage(
        await $fetch("https://catfact.ninja/fact").then(
          (resp: any) => resp.fact
        )
      );
    } else if (httpDogTrigger.includes(input)) {
      addReceivedMessage(
        `HTTP STATUS CODE ${input}`,
        `https://http.dog/${input}.webp`
      );
      scrollTop(500);
    } else if (ipTrigger.some((e) => input.includes(e))) {
      addReceivedMessage(
        await $fetch("https://api.ipify.org/?format=json").then(
          (resp: any) => resp.ip
        )
      );
    } else if (userTrigger.some((e) => input.includes(e))) {
      addReceivedMessage(
        await $fetch("https://randomuser.me/api/").then((resp: any) =>
          JSON.stringify(resp, null, 2)
        )
      );
    } else if (excuseTrigger.some((e) => input.includes(e))) {
      addReceivedMessage(
        await $fetch("https://excuser.herokuapp.com/v1/excuse").then(
          (resp: any) => resp[0].excuse
        )
      );
    } else if (coffeeTrigger.some((e) => input.includes(e))) {
      addReceivedMessage(
        "Coffee",
        `https://coffee.alexflipnote.dev/random?${new Date().toISOString()}`
      );
      scrollTop(500);
    } else if (duckTrigger.some((e) => input.includes(e))) {
      addReceivedMessage(
        "A Duck",
        `https://random-d.uk/api/v2/randomimg?${new Date().toISOString()}`
      );
      scrollTop(500);
    } else if (startupIdeaTrigger.some((e) => input.includes(e))) {
      addReceivedMessage(
        await $fetch("https://itsthisforthat.com/api.php?text").then(
          (resp: any) => resp[0].excuse
        )
      );
    } else {
      addReceivedMessage(
        `Cat says ${input}`,
        `https://cataas.com/cat/says/${input}`
      );
      scrollTop(500);
    }
    scrollTop();
  }, 1000);

  */

  scrollTop();

  chat.value = "";
};

/* Mounted */

onMounted(() => {

  watch(chat_id, (chat_id, previous) => {
    router.push({
      path: '/',
      query: { chat: chat_id },
    })
  })

  if (chat_id.value && ["new", "neu"].includes(chat_id.value.toLowerCase())) { }
  else if (chat_id.value) continueCowGPT(chat_id.value)
  else {
    messages.value.push({
      readed: true,
      value: "Was ist letzte Nacht passiert?",
      time: moment().format("H:mm"),
      type: messageType.Sender,
    });
    messages.value.push({
      readed: false,
      value: "Du warst betrunken.",
      time: moment().format("H:mm"),
      type: messageType.Received,
    });
    messages.value.push({
      readed: true,
      value: "Nein, das war ich nicht.",
      time: moment().format("H:mm"),
      type: messageType.Sender,
    });
    /*
    messages.value.push({
      readed: false,
      value: memes.value[Math.floor(Math.random() * memes.value.length)],
      time: moment().format("H:mm"),
      type: messageType.Received,
    });
    messages.value.push({
      readed: true,
      value: "Sprich Deutsch du Hurensohn",
      time: moment().format("H:mm"),
      type: messageType.Sender,
    });
    */

    askCowGPT();
  }

  setInterval(function () {
    deviceTime.value = moment().format("H:mm");
  }, 1000);
});
</script>

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

/* latin */
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  src: url(/assets/fonts/KFOlCnqEu92Fr1MmWUlfBBc4.woff2) format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "Roboto", sans-serif;
  margin: 0;
  padding: 0;
  height: 100%;
}

#__nuxt {
  height: inherit;
}

.bg {
  /* The image used */
  background-image: url("/cow.jpg");

  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.page {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.marvel-device .screen {
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
  text-align: left;
}

.screen-container {
  height: 100%;
}

/* Status Bar */

.status-bar {
  height: 25px;
  background: #004e45;
  color: #fff;
  font-size: 14px;
  padding: 0 8px;
}

.status-bar:after {
  content: "";
  display: table;
  clear: both;
}

.status-bar div {
  float: right;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 0 0 8px;
  font-weight: 600;
}

/* Chat */

.chat {
  height: calc(100% - 69px);
}

.chat-container {
  height: 100%;
}

/* User Bar */

.user-bar {
  height: 55px;
  background: #005e54;
  color: #fff;
  padding: 0 8px;
  font-size: 24px;
  position: relative;
  z-index: 1;
}

.user-bar:after {
  content: "";
  display: table;
  clear: both;
}

.user-bar div {
  float: left;
  transform: translateY(-50%);
  position: relative;
  top: 50%;
}

.user-bar .actions {
  float: right;
  margin: 0 0 0 20px;
}

.user-bar .actions.more {
  margin: 0 12px 0 32px;
}

.user-bar .actions.attachment {
  margin: 0 0 0 30px;
}

.user-bar .actions.attachment i {
  display: block;
  transform: rotate(-45deg);
}

.user-bar .avatar {
  margin: 0 0 0 5px;
  width: 36px;
  height: 36px;
}

.user-bar .avatar img {
  border-radius: 50%;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1);
  display: block;
  width: 100%;
}

.user-bar .name {
  font-size: 17px;
  font-weight: 600;
  text-overflow: ellipsis;
  letter-spacing: 0.3px;
  margin: 0 0 0 8px;
  overflow: hidden;
  white-space: nowrap;
  width: 110px;
}

.user-bar .status {
  display: block;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0;
}

/* Conversation */

.conversation {
  height: calc(100% - 12px);
  position: relative;
  background: #efe7dd url("https://cloud.githubusercontent.com/assets/398893/15136779/4e765036-1639-11e6-9201-67e728e86f39.jpg") repeat;
  z-index: 0;
}

.conversation ::-webkit-scrollbar {
  transition: all 0.5s;
  width: 5px;
  height: 1px;
  z-index: 10;
}

.conversation ::-webkit-scrollbar-track {
  background: transparent;
}

.conversation ::-webkit-scrollbar-thumb {
  background: #b3ada7;
}

.conversation .conversation-container {
  height: calc(100% - 68px);
  box-shadow: inset 0 10px 10px -10px #000000;
  overflow-x: hidden;
  padding: 0 16px;
  margin-bottom: 5px;
}

.conversation .conversation-container:after {
  content: "";
  display: table;
  clear: both;
}

/* Messages */

.message {
  color: #000;
  clear: both;
  line-height: 18px;
  font-size: 15px;
  padding: 8px;
  position: relative;
  margin: 8px 0;
  max-width: 85%;
  word-wrap: break-word;
  z-index: -1;
  /*white-space: break-spaces;*/
}

.message:after {
  position: absolute;
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
}

.metadata {
  display: inline-block;
  float: right;
  padding: 0 0 0 7px;
  position: relative;
  bottom: -4px;
}

.metadata .time {
  color: rgba(0, 0, 0, 0.45);
  font-size: 11px;
  display: inline-block;
}

.metadata .tick {
  display: inline-block;
  margin-left: 2px;
  position: relative;
  top: 4px;
  height: 16px;
  width: 16px;
}

.metadata .tick svg {
  position: absolute;
  transition: 0.5s ease-in-out;
}

.metadata .tick svg:first-child {
  opacity: 0;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform: perspective(800px) rotateY(180deg);
  transform: perspective(800px) rotateY(180deg);
}

.metadata .tick svg:last-child {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform: perspective(800px) rotateY(0deg);
  transform: perspective(800px) rotateY(0deg);
}

.metadata .tick-animation svg:first-child {
  opacity: 1;
  -webkit-transform: perspective(800px) rotateY(0);
  transform: perspective(800px) rotateY(0);
}

.metadata .tick-animation svg:last-child {
  -webkit-transform: perspective(800px) rotateY(-179.9deg);
  transform: perspective(800px) rotateY(-179.9deg);
}

.message:first-child {
  margin: 16px 0 8px;
}

.message.received {
  background: #fff;
  border-radius: 0px 5px 5px 5px;
  float: left;
}

.message.received pre {
  white-space: pre-wrap;
}

.message.received p {
  margin-block-start: 0px;
  margin-block-end: 0px;
}

.message.received .metadata {
  padding: 0 0 0 16px;
}

.message.received:after {
  border-width: 0px 10px 10px 0;
  border-color: transparent #fff transparent transparent;
  top: 0;
  left: -10px;
}

.message.sent {
  background: #e1ffc7;
  border-radius: 5px 0px 5px 5px;
  float: right;
}

.message.sent:after {
  border-width: 0px 0 10px 10px;
  border-color: transparent transparent transparent #e1ffc7;
  top: 0;
  right: -10px;
}

/* Compose */

.conversation-compose {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  overflow: hidden;
  height: 50px;
  width: 100%;
  z-index: 2;
}

.conversation-compose div,
.conversation-compose input {
  background: #fff;
  height: 100%;
}

.conversation-compose .emoji {
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 5px 0 0 5px;
  flex: 0 0 auto;
  margin-left: 8px;
  width: 48px;
}

.conversation-compose .input-msg {
  border: 0;
  flex: 1 1 auto;
  font-size: 16px;
  margin: 0;
  outline: none;
  min-width: 50px;
}

.conversation-compose .photo {
  flex: 0 0 auto;
  border-radius: 0 0 5px 0;
  text-align: center;
  position: relative;
  width: 48px;
}

.conversation-compose .photo:after {
  border-width: 0px 0 10px 10px;
  border-color: transparent transparent transparent #fff;
  border-style: solid;
  position: absolute;
  width: 0;
  height: 0;
  content: "";
  top: 0;
  right: -10px;
}

.conversation-compose .photo i {
  display: block;
  color: #7d8488;
  font-size: 24px;
  transform: translate(-50%, -50%);
  position: relative;
  top: 50%;
  left: 50%;
}

.conversation-compose .send {
  background: transparent;
  border: 0;
  cursor: pointer;
  flex: 0 0 auto;
  margin-left: 8px;
  margin-right: 8px;
  padding: 0;
  position: relative;
  outline: none;
}

.conversation-compose .send .circle {
  background: #008a7c;
  border-radius: 50%;
  color: #fff;
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.conversation-compose .send .circle i {
  font-size: 24px;
  margin-left: 5px;
}

/* Small Screens */

@media (max-width: 768px) {
  .marvel-device.nexus5 {
    border-radius: 0 !important;
    flex: none;
    padding: 0 !important;
    max-width: none;
    overflow: hidden;
    height: 100% !important;
    width: 100% !important;
  }

  .marvel-device>.screen .chat {
    visibility: visible;
  }

  .marvel-device {
    visibility: hidden;
  }

  .marvel-device .status-bar {
    display: none;
  }

  .screen-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .conversation {
    height: calc(100vh - 55px);
  }

  .conversation .conversation-container {
    height: calc(100% - 120px);
  }
}
</style>
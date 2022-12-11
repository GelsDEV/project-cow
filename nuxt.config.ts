const title = "Dunklekuh — Just another Muh Muh";
const description = "Oh, when the workin' day is done, cows just wanna have fun...";
const url = "https://dunklekuh.de";
const image = url + "/avatar.jpg";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
        head: {
            title: title,
            meta: [
                { name: "description", content: description },
                { name: "og:type", content: "website" },
                { name: "og:url", content: url },
                { name: "og:title", content: title },
                { name: "og:description", content: description },
                { name: "og:image", content: image },
                { name: "twitter:card", content: "website" },
                { name: "twitter:url", content: url },
                { name: "twitter:title", content: title },
                { name: "twitter:description", content: description },
                { name: 'twitter:image"', content: image },
                { name: "theme-color", content: "#004e45" },
                { name: "msapplication-navbutton-color", content: "#004e45" },
                { name: "apple-mobile-web-app-status-bar-style", content: "#004e45" },
            ],
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
            style: [],
            script: [],
            noscript: []
        }
    },
    ssr: false,
    //target: "static"
})

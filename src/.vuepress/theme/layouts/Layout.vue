
<template>
    <transition name="fade" mode="out-in" appear>
        <ParentLayout class="parent-layout" @click="closeAll">
            <template #navbar-before></template>
            <template #navbar-after>
                <div class="navbar-after">
                    <div :class="menuClass">
                        <div class="iconfont icon-nav_drawer" @click="slideDown" ref="parentLayout"></div>
                        <div class="iconfont icon-game" @click.stop="showMirror"></div>
                        <div class="iconfont icon-hints" @click.stop="showIcon"></div>
                        <div :class="`iconfont ${audiuClass}`" @click.stop="speak"></div>
                        <div class="iconfont icon-arrow_down reverse" @click.stop="toggleTop"></div>
                        <div class="iconfont icon-arrow_down" @click.stop="toggleBottom"></div>
                        <div class="iconfont icon-face_happy" @click.stop="changeStyle"></div>
                    </div>
                </div>
            </template>
            <template #page-bottom></template>
            <template #page-top></template>
        </ParentLayout>
    </transition>
    <codemirror class="fixed-dialog" v-show="showCodeMirror" />
    <iconCollection class="fixed-dialog" v-show="showIconCollection" />

</template>
<script setup lang="ts">
import ParentLayout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";
import { ref, nextTick } from 'vue';
const showCodeMirror = ref(false);
const showIconCollection = ref(false);
const menuClass = ref(["tool-menu"]);

const audiuClass = ref("icon-audio")

const parentLayout = ref(null);

const slideDown = () => {
    if (!menuClass.value.includes("active")) {
        menuClass.value.push("active")
    }
    else {
        menuClass.value = menuClass.value.filter((item, index) => {
            return item !== "active"
        })
    }
}
const closeAll = () => {
    showCodeMirror.value = false;
    showIconCollection.value = false;
}
const showMirror = () => {
    showCodeMirror.value = !showCodeMirror.value;
    showIconCollection.value = false;
}
const showIcon = () => {
    showIconCollection.value = !showIconCollection.value;
    showCodeMirror.value = false;
}




const speak = () => {
    let text = '', dom: HTMLElement = document.querySelector('.theme-default-content');
    const synth = window.speechSynthesis;
    if (!dom) return;
    if (!synth.speaking) {
        text = dom.innerText;
        const utterance1 = new SpeechSynthesisUtterance(text);
        synth.speak(utterance1);
        audiuClass.value = "icon-audio"
    } else {
        synth.cancel();
        audiuClass.value = "icon-audio_mute"
    }


}

const toggleBottom = () => {
    if (!window) return;
    window.scrollTo({ top: Math.pow(10, 10), behavior: 'smooth' });
    //scrollby是相对，scrollto是绝对
}

const toggleTop = () => {
    if (!window) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    //scrollby是相对，scrollto是绝对
}
const backImg = ref("")

const changeStyle = () => {
    //操作很难逆转
    // [].forEach.call(document.querySelectorAll("p,span,strong,th"), (item: any) => {
    //     if (item.style.outline === '') {
    //         item.style.outline =
    //             "5px solid #" + (~~(Math.random() * (1 << 24))).toString(16);
    //     }
    // });

    const styleImages = ["/vuepress-shader/images/hutao1.png",
                        "/vuepress-shader/images/hutao2.jpg",
                        "/vuepress-shader/images/hutao3.png",
                        "/vuepress-shader/images/hutao4.jpg",
                        "/vuepress-shader/images/hutao5.png",
                        "/vuepress-shader/images/hutao6.jpg",
                        ""
                            ];
    if (document.body) {
        const app: HTMLElement = document.querySelector('#app');
        backImg.value = styleImages[Math.floor(Math.random()*7)];
        app.style.background = `url(${backImg.value}) top/100% 100% no-repeat fixed`;
    }

}

</script>
<style lang="scss" scoped>
.fixed-dialog {
    min-width: 90vw;
    width: 90vw;
    position: fixed;
    top: 20vh;
    background-color: azure;
    padding: 20px;
    z-index: 30;
    max-height: 30em;
    overflow-y: scroll;

    &:hover {
        outline: 1px dotted salmon;
    }

    border-radius: 1rem;
    left: 5vw;
}

.navbar-after {
    position: relative;


}


@media screen and (max-width: 900px) {
    .tool-menu {
        display: none !important;
        ;
    }
}

.tool-menu {
    max-width: 30vw;
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: transparent;
    right: 2rem;
    top: 3.6rem;
    z-index: -1;
    overflow: hidden;

    &.active {
        .iconfont {
            height: 1.5em;
            display: block;
        }
    }

    .reverse {
        transform: rotate(180deg);
        display: none;
    }

    .iconfont {
        height: 0;
        transition: height .4s;
        line-height: 1.5;
        font-size: 1.5em;
        color: var(--c-text);
        cursor: pointer;

        &:hover {
            color: var(--c-brand);
        }
    }

    .icon-nav_drawer {
        height: 1.5em;

    }


}
</style>
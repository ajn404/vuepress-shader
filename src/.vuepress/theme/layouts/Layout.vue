
<template>
    <transition name="fade" mode="out-in" appear>
        <ParentLayout class="parent-layout" @click="closeAll">
            <template #navbar-before></template>
            <template #navbar-after>
                <div class="navbar-after">
                    <div :class="menuClass">
                        <div class="iconfont icon-nav_drawer" @click="slideDown"></div>
                        <div class="iconfont icon-game" @click.stop="showMirror"></div>
                    </div>
                </div>
            </template>
            <template #page-bottom></template>
            <template #page-top></template>
        </ParentLayout>
    </transition>
    <codemirror class="code-mirror" v-show="showCodeMirror"></codemirror>
</template>
<script setup lang="ts">
import ParentLayout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";
import { ref } from 'vue';
const showCodeMirror = ref(false);
const menuClass = ref(["tool-menu"]);

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

const closeAll = ()=>{
    showCodeMirror.value = false;
}

const showMirror = () => {
    showCodeMirror.value = !showCodeMirror.value;
}
</script>


<style lang="scss" scoped>
    .code-mirror {
        min-width: 90vw;
        width: 90vw;
        position: fixed;
        top: 20vh;
        background-color: azure;
        padding: 20px;
        z-index: 19;
        &:hover{
            outline: 1px dotted salmon;
        }
        border-radius: 1rem;
        left: 5vw;
    }
.navbar-after {
    position: relative;

    
}

.tool-menu {
    max-width: 30vw;
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: transparent;
    right:2rem;
    top: 3.6rem;
    z-index: -1;
    overflow: hidden;

    &.active {
        .iconfont {
            height: 1.5em;
        }
    }

    .iconfont {
        height: 0;
        transition: height .4s;
        line-height: 1.5;
        font-size: 1.5em;
        color: var(--c-text);
    }

    .icon-nav_drawer {
        height: 1.5em;
    }

    @media screen and (max-width: 900px) {
        .icon-game {
            display: none;
        }
    }

    .icon-game {
        cursor: context-menu;
    }


}
</style>
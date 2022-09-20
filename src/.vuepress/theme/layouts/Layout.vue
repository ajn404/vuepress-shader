
<template>
    <transition name="fade" mode="out-in" appear>
        <ParentLayout class="parent-layout">
            <template #navbar-before></template>
            <template #navbar-after>
                <div class="tool-menu">
                    <div class="iconfont icon-nav_drawer">
                    </div>

                    <div class="iconfont icon-game" @click="showMirror">
                        简易试炼场
                    </div>
                    <codemirror class="code-mirror" v-if="showCodeMirror"></codemirror>
                </div>

            </template>
            <template #page-bottom></template>
            <template #page-top></template>
        </ParentLayout>
    </transition>
</template>
<script setup lang="ts">
import ParentLayout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";
import { ref } from 'vue';
const showCodeMirror = ref(false)
const showMirror = () => {
    showCodeMirror.value = !showCodeMirror.value
}
</script>


<style lang="scss" scoped>
.tool-menu {
    max-width: 30vw;
    width: 30vw;
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    background-color: transparent;
    right: 20px;
    top: 3.6rem;
    z-index: -1;


    &:hover {
        .iconfont {
            display: block;
        }
    }

    .iconfont {
        line-height: 1.5;
        display: none;

    }

    .icon-nav_drawer{
        display: block;
    }

    .icon-game {
        cursor: context-menu;
    }

    .code-mirror {
        min-width: 70vw;
        position: absolute;
        top: 0;
        left: -65vw;
    }
}
</style>
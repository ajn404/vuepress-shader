
<template>
    <transition name="fade" mode="out-in" appear>
        <ParentLayout class="parent-layout">
            <template #navbar-before></template>
            <template #navbar-after>
                <div class="tool-menu">
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
import {ref} from 'vue';
const showCodeMirror = ref(false)
const showMirror = ()=>{
    showCodeMirror.value = ! showCodeMirror.value
}
</script>


<style lang="scss" scoped>
    .tool-menu{
        position: fixed;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        padding: 10px;
        background-color: transparent;
        right: 20px;
        top: 3.6rem;
        cursor:context-menu;
        


    }
</style>
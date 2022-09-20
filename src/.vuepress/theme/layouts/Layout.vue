
<template>
    <transition name="fade" mode="out-in" appear>
        <ParentLayout class="parent-layout">
            <template #navbar-before></template>
            <template #navbar-after>
                <div class="tool-menu">
                    <div class="iconfont icon-game">
                        简易试炼场
                        <codemirror class="code-mirror"></codemirror>
                    </div>
                </div>
                
            </template>
            <template #page-bottom></template>
            <template #page-top></template>
        </ParentLayout>
    </transition>
</template>
<script setup lang="ts">
import ParentLayout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";
</script>


<style lang="scss" scoped>
    .tool-menu{
        position: fixed;
        width: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        padding: 10px;
        background-color: transparent;
        right: 20px;
        top: 3.6rem;
        cursor:context-menu;
        .code-mirror{
            
        }


    }
</style>
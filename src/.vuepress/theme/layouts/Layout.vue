<script setup lang="ts">
import ParentLayout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";
</script>
<template>
<transition name="fade" mode="out-in" appear>
 <ParentLayout class="parent-layout">
        <template #navbar-before></template>
        <template #navbar-after></template>
        <template #page-bottom></template>
        <template #page-top>
                <!-- <span class="iconfont icon-yangshi_icon_tongyong_call">
                </span> -->
        </template>
    </ParentLayout>
</transition>
</template>
<script setup lang="ts">
import ParentLayout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";
</script>
<template>
    <ParentLayout class="parent-layout">
        <template #navbar-before></template>
        <template #navbar-after></template>
        <template #page-bottom></template>
        <template #page-top></template>
    </ParentLayout>
</template>

<style lang="scss" scoped>
:deep(.page .theme-default-content){
    max-width: inherit;
    padding: 0;
    margin: 0;
}
:deep(.page-meta){
    display: none;
}
:deep(.page){
    padding: 0;
}
</style>
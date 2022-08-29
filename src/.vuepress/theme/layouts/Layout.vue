
<template>
    <transition name="fade" mode="out-in" appear>
        <ParentLayout class="parent-layout">
            <template #navbar-before></template>
            <template #navbar-after></template>
            <template #page-bottom></template>
            <template #page-top></template>
        </ParentLayout>
    </transition>
</template>

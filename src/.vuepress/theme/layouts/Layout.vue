
<template>
    <transition name="fade" mode="out-in" appear>
        <ParentLayout class="parent-layout">
            <template #navbar-before></template>
            <template #navbar-after>

            </template>
            <template #page-bottom>

            </template>
            <template #page-top>
                <!-- <img src="/images/sun.svg" ref="img" @click.prevent="hideNavbar" :class="classList"> -->
            </template>
        </ParentLayout>
    </transition>
</template>
<script setup lang="ts">
import ParentLayout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";
import { ref } from "vue";
const classList = ref(['ClockWise', 'img'])
const img = ref(null)


const hideNavbar = () => {
    const body:HTMLElement=  document.querySelector('body');
    const navbar:HTMLElement = document.querySelector('.parent-layout>.navbar')
    if (!classList.value.includes('CounterClockWise')){
        classList.value.push('CounterClockWise')
        body.style.setProperty('--navbar-height','0');
        navbar.style.setProperty('z-index','-1')
    }
    else {
        body.style.setProperty('--navbar-height','3.6rem');
        navbar.style.setProperty('z-index','20')
        classList.value.pop()
    }
}

</script>
<style lang="scss">
.img {
    width: 4em;
    position: fixed;
}
</style>
<template>
    <div>
        h
    </div>
</template>
<script lang="ts" setup>
//setup 执行时dom还不存在
import {
    ref,
    computed,
    watch,

    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onUpdated,
    onBeforeUnmount,
    onUnmounted
} from 'vue';
const data = ref([{
    value: '1', hidden: false
}]);
const computeData = computed(() => {
    return data.value.filter(item => item.hidden === false)
})

watch(data, (newVal) => {
    console.log('data changed new data is ', data)
})

const method = () => {
    console.log('i am fool');
}

//ts语法
const props = defineProps<{
    title?: String,
    msg?: String,

}>()


//整个生命周期
//setup=>beforeCreate=>created=>beforeMount=>mouted=>beforeUpdate=>updated=>beforeUnmount=>unmounted


onMounted(() => {
    console.log('onMounted')
})

onBeforeMount(() => {
    console.log('onBeforeMount')
})

onBeforeUpdate(() => {
    console.log('onBeforeUpdate')
})

onUpdated(() => {
    console.log('onUpdated')
})

onBeforeUnmount(() => {
    console.log('onBeforeUnmount')
})

onUnmounted(() => {
    console.log('onUnmounted')
})



console.log('setup')

</script>
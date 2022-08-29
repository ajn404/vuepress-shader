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

} from 'vue';
const data = ref([{
    value: '1', hidden: false
}]);
const computeData = computed(() => {
    return data.value.filter(item => item.hidden === false)
})

const method = () => {
    console.log('i am fool');
}
//https://cn.vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram
//setup=>beforeCreate=>created=>beforeMount=>mouted=>beforeUpdate=>updated=>beforeUnmount=>unmounted


</script>
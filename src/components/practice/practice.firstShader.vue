<template>
    <div class="practice_firstShader" ref="container">
    </div>
</template>

<script lang="ts" setup>
import Sketch from "@scripts/practice.setup.ts";
import { ref, nextTick } from "vue";
const container = ref(null);
let sketch = new Sketch();
nextTick(() => {
    const options = {
    container: container.value || document.body
    };
    sketch.init(options);
})


</script>
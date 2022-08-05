<template>
    <div class="practice_changeColor">
        <div ref="container"></div>
    </div>
</template>

<script lang="ts" setup>
import Sketch from "@scripts/practice.setup.ts";
import * as THREE from "three";
import { ref } from "vue";
import fs from '@shaders/practice/changeColor/fragment.glsl'
import vs from '@shaders/practice/changeColor/vertex.glsl'
console.log(fs)

const container = ref(null);
const options = {
    container: container.value || document.body
};
const uniforms = {

    u_time: { value: 0.0 },
    u_mouse: {
        value: {
            x: 0.0,
            y: 0.0
        }
    },
    u_resolution: {
        value: {
            x: 0.0,
            y: 0.0
        }
    },
    u_color: {
        value: new THREE.Color(0x00fff0)
    }
};
let s = new Sketch(options);
s.addObject = function () {
    this.geometry = new THREE.PlaneGeometry(2, 2);
    this.material = new THREE.ShaderMaterial(
        {
            // wireframe: true,
            uniforms: uniforms,
            side: THREE.DoubleSide,

            fragmentShader: fs,
            vertexShader: vs,
        }
    );
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
};
s.animate = function () {
    this.render();
    requestAnimationFrame(this.animate.bind(this));
};
s.move = function (evt: any) {
    uniforms.u_mouse.value.x = evt.touches ? evt.touches[0].clientX : evt.clientX;
    uniforms.u_mouse.value.y = evt.touches ? evt.touches[0].clientY : evt.clientY;
};

if ('ontouchstart' in window) {
    document.addEventListener('touchmove', s.move);
} else {
    document.addEventListener('mousemove', s.move);
}

s.resize = function () {
    if (uniforms.u_resolution !== undefined) {
        uniforms.u_resolution.value.x = window.innerWidth;
        uniforms.u_resolution.value.y = window.innerHeight;
    }

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.render();

}
s.init(options);

</script>
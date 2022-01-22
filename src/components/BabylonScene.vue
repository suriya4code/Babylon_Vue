<template>
  <div>
    <h3>Suriya</h3>
    <canvas></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { BasicScene } from "@/BabylonScene/BasicScene";
export default defineComponent({
  name: 'BabylonScene',
  mounted(){
    const canvas = document.querySelector("canvas")!;
    new BasicScene(canvas);
    }
});
</script>

<style scoped>
canvas {
  width: 70%;
  height: 70%;
  }
</style>




<template>
  <div>
    <h3>Standard Materials</h3>
    <canvas></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import { StandardMaterials } from "@/BabylonScene/StandardMaterials";
import { PBR } from "@/BabylonScene/PBR";
export default defineComponent({
  name: 'BabylonScene',
  mounted(){
    const canvas = document.querySelector("canvas")!;
    new PBR(canvas);
    }
});
</script>

<style scoped>
canvas {
  width: 70%;
  height: 70%;
  }
</style>




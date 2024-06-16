<script setup lang="ts">
import { defineComponent } from 'vue'
import Horse1 from './svg/Horse1SVG.vue'
import Horse2 from './svg/Horse2SVG.vue'
import Horse3 from './svg/Horse3SVG.vue'
import Horse4 from './svg/Horse4SVG.vue'

defineComponent({
  name: 'HorseIcon'
})

defineProps<{
  animation: boolean
  color: string
}>()
</script>

<template>
  <div class="horse-icon">
    <Horse1 :color="color" class="horse-frame frame-1" :class="{ animate: animation }" />
    <Horse2 v-if="animation" :color="color" class="horse-frame frame-2" />
    <Horse3 v-if="animation" :color="color" class="horse-frame frame-3" />
    <Horse4 v-if="animation" :color="color" class="horse-frame frame-4" />
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';
.horse-icon {
  position: relative;
  width: $horse-width;
  height: $horse-height;

  .horse-frame {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    transition: opacity 0.1s;
  }

  .frame-1 {
    opacity: 1;
  }

  .animate.frame-1 {
    animation: horse-run-1 0.4s steps(4) infinite;
  }
  .frame-2 {
    animation: horse-run-2 0.4s steps(4) infinite;
  }
  .frame-3 {
    animation: horse-run-3 0.4s steps(4) infinite;
  }
  .frame-4 {
    animation: horse-run-4 0.4s steps(4) infinite;
  }

  @keyframes horse-run-1 {
    0%,
    25% {
      opacity: 1;
      z-index: 2;
    }
    26%,
    100% {
      opacity: 0;
      z-index: 1;
    }
  }
  @keyframes horse-run-2 {
    0%,
    25%,
    50% {
      opacity: 0;
      z-index: 1;
    }
    51%,
    75% {
      opacity: 1;
      z-index: 2;
    }
    76%,
    100% {
      opacity: 0;
      z-index: 1;
    }
  }
  @keyframes horse-run-3 {
    0%,
    50%,
    75% {
      opacity: 0;
      z-index: 1;
    }
    76%,
    100% {
      opacity: 1;
      z-index: 2;
    }
  }
  @keyframes horse-run-4 {
    0%,
    75%,
    100% {
      opacity: 0;
      z-index: 1;
    }
    26%,
    50% {
      opacity: 1;
      z-index: 2;
    }
  }
}
</style>

<script setup lang="ts">
import Header from '@/components/HeaderComponent.vue'
</script>

<template>
  <div class="layout">
    <Header />
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
}

.content {
  flex: 1;
  padding: $layout-padding;
  margin-top: $header-height;
  background-color: $content-background-color;
  width: 100%;
  box-sizing: border-box;
  overflow: auto;
}
</style>

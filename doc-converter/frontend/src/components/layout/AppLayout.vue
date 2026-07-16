<script setup lang="ts">
import SideNav from './SideNav.vue'
import MainContent from './MainContent.vue'
</script>

<template>
  <div class="app-layout">
    <SideNav class="app-sidebar" />
    <MainContent class="app-main">
      <router-view />
    </MainContent>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  height: 100%;
  overflow: hidden;
}

.app-sidebar {
  width: var(--sidebar-width);
  flex-shrink: 0;
}

.app-main {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>

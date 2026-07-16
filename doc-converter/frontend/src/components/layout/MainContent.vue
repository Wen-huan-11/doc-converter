<script setup lang="ts">
</script>

<template>
  <div class="main-content">
    <div class="main-inner">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.main-content {
  flex: 1;
  overflow-y: auto;
  background: #f5f5f8;
}

.main-inner {
  padding: 24px;
  min-height: 100%;
}
</style>

<template>
  <div ref="banner" class="revision-banner">
    <strong>Documentation revision underway:</strong> please report issues on
    <a href="https://theqrl.org/discord" target="_blank">Discord</a> or via
    <a href="https://github.com/theQRL/test-zond" target="_blank">GitHub</a>.
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const banner = ref(null)

function updateHeight() {
  if (banner.value) {
    document.documentElement.style.setProperty(
      '--vp-layout-top-height',
      `${banner.value.offsetHeight}px`
    )
  }
}

onMounted(() => {
  updateHeight()
  window.addEventListener('resize', updateHeight)
})

onUnmounted(() => {
  document.documentElement.style.removeProperty('--vp-layout-top-height')
  window.removeEventListener('resize', updateHeight)
})
</script>

<style scoped>
.revision-banner {
  background-color: var(--vp-c-warning-soft);
  color: var(--vp-c-warning-1);
  text-align: center;
  padding: 8px 16px;
  font-size: 14px;
  line-height: 1.5;
  position: sticky;
  top: 0;
  z-index: var(--vp-z-index-nav, 32);
}

.revision-banner a {
  color: var(--vp-c-warning-1);
  text-decoration: underline;
  font-weight: 600;
}
</style>

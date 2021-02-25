<template>
  <h1>Home</h1>

  <div>
    {{ offers }}
  </div>
</template>

<script setup lang="ts">
  import store from '@/store'
  import { onBeforeMount, computed } from 'vue'

  const offers = computed(() => store.getters['hotels/items'])

  onBeforeMount(async () => {
    store.dispatch('hotels/clear')
    await store.dispatch('hotels/list', 'LON')
  })
</script>

<style lang="scss" scoped></style>

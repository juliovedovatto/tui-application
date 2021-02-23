<template>
  <div class="container mx-auto site">
    <site-header />

    <div class="site__content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { Header } from '@/components/layout'

export default defineComponent({
  name: 'App',
  components: {
    SiteHeader: Header
  }
})
</script>

<style lang="scss" scoped>

</style>

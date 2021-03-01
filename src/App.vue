<template>
  <div class="site">
    <site-header />

    <div class="site__content">
      <router-view />
    </div>

    <site-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { Header, Footer } from '@/components/layout'

export default defineComponent({
  name: 'App',
  components: {
    SiteHeader: Header,
    SiteFooter: Footer
  }
})
</script>

<style lang="scss" scoped>

</style>

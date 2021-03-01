<template>
  <header class="site__header">
    <div class="container mx-auto">
      <h1 class="site__header__title" :style="{ backgroundImage: `url('${Logo}')` }">
        TUI Application
      </h1>
    </div>
  </header>
</template>

<script setup name="Header" lang="ts">
import Logo from '@/assets/images/logo.png'
</script>

 <style lang="scss" scoped>
 .site__header {
   @apply p-4;

   @include e('title') {
    @apply bg-no-repeat bg-left-top;

    width: 178px;
    height: 100px;
    text-indent: -100vw;
    background-size: 100%;
   }
 }
 </style>

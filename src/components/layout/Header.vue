<template>
  <header class="site__header">
    <h1 class="site__header__title">TUI Application</h1>
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    >
  </header>
</template>

<script>
// import { defineComponent } from "vue";

// export default defineComponent({
//   props: [
//     { name: 'level'}
//   ]
// })
</script>

 <style lang="scss" scoped>
 .site__header {
   @include e('title') {
     @apply text-6xl;

     font-family: $font-default;
     color: $color-title;
   }
 }
 </style>

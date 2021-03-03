<template>
  <footer class="site__footer">
    <div class="flex-grow">
      Author: Julio Vedovatto &lt;<a href="mailto:juliovedovatto@gmail.com?Subject=Awesome%20Test%20Application!!">juliovedovatto@gmail.com</a>&gt;
    </div>
    <div class="site__footer__credits">
      Made with &#10084;&#65039; &nbsp; using &nbsp;&nbsp; <img :src="LogoVue" alt="Vue 3" title="Vue 3" /> and <img :src="LogoVite" alt="Vite" title="Vite" />
    </div>
  </footer>
</template>

<script setup name="Footer" lang="ts">
import LogoVue from '@/assets/images/vue-logo.svg'
import LogoVite from '@/assets/images/vite-logo.svg'
</script>

 <style lang="scss" scoped>
 .site__footer {
   @apply flex p-4 items-center;

   background-color: $tui-blue-25;
   height: 50px;

   @include e('credits') {
     img {
       width: 30px;
       vertical-align: middle;
     }
   }
 }
 </style>

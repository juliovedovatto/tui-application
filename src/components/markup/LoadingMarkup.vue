<template>
<div class="loading-markup">
  <img :src="LoadingMarkupImage" alt="Loading..." class="loading-markup__image" :style="imageStyle" />
  <div class="loading-markup__message" v-if="message">{{ message }}</div>
</div>
</template>

<script setup name="LoadingMarkup" lang="ts">
import { computed, defineProps } from 'vue'
import LoadingMarkupImage from '@/assets/images/markup/loader.svg'

const props = defineProps({
  message: {
    type: String,
    default: ''
  },
  size: {
    type: Number,
    default: 100
  }
})

const imageStyle = computed(() => ({
  width: `${props.size}px`
}))

</script>

<style lang="scss" scoped>
.loading-markup {
  @apply text-center;

  @include e('image') {}
  @include e('message') {
    @apply italic mt-4;

    color: $tui-grey-50;
  }
}
</style>

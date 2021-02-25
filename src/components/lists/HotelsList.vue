<template>
  <div class="hotels__list">
    <div :key="`item-${i}`" v-for="(item, i) in items">
      {{ item.name }}
    </div>
  </div>
</template>

<script setup name="HotelsList" lang="ts">
import { defineProps } from "vue"

const props = defineProps({
    items: {}
})
</script>

<style lang="scss" scoped></style>

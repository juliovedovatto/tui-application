<template>
  <div class="weather__list">
    <div class="flex">
      <div :key="`weather-${i}`" class="text-center mr-4 weather" v-for="(item, i) in items">
        <time :datetime="item.date">{{ formatDate(item.date) }}</time>
        <picture class="block">
          <img :src="item.icon" />
        </picture>
        <strong>{{ item.text }}</strong>
      </div>
    </div>
  </div>
</template>

<script setup name="HotelsList" lang="ts">
// TODO: add tooltip to show full text

import { defineProps } from "vue"
import { useI18n } from "vue-i18n"

import { formatLocale } from '@/core/helpers/date'

const { t } = useI18n()

const props = defineProps({
  items: {
    type: Object,
    default: () => ({})
  }
})

function formatDate(date: string): string {
  return formatLocale(date, t('date.short'))
}
</script>

<style lang="scss" scoped>
.hotels__list {
  @include e('item') {
    grid-template-columns: minmax(auto, 400px) auto;
  }
}
</style>

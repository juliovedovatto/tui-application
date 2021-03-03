<template>
  <div class="weather__list">
    <template v-if="!loading">

      <template v-if="hasItems">
        <div class="flex">
          <div :key="`weather-${i}`" class="text-center mr-4 weather" v-for="(item, i) in items">
            <time :datetime="item.date">{{ formatDate(item.date) }}</time>
            <picture class="block">
              <img :src="item.icon" />
            </picture>
            <strong>{{ item.text }}</strong>
          </div>
        </div>
      </template>
      <template v-else>
        <message-notification type="error">{{ t('error.no-items')}}</message-notification>
      </template>

    </template>
    <template v-else>
      <loading-markup :message="t('message.loading')" />
    </template>
  </div>
</template>

<script setup name="HotelsList" lang="ts">
import { computed, defineProps } from "vue"
import { useI18n } from "vue-i18n"

import { LoadingMarkup } from '@/components/markup'
import { MessageNotification } from '@/components/notification'

import { formatLocale } from '@/core/helpers/date'

const { t } = useI18n()

const props = defineProps({
  items: {
    type: Object,
    default: () => ({})
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const hasItems = computed(() => !!Object.values(props.items).length)

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

<i18n>
{
  "en": {
    "message": {
      "loading": "Gethering Forecast info..."
    },
    "error": {
      "no-items": "There are no weather information available for the selected city :("
    }
  }
}
</i18n>

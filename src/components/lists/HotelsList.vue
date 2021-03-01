<template>
  <div class="hotels__list">
    <template v-if="!loading">

      <template v-if="hasItems">
        <div :key="`item-${i}`" class="mb-4" v-for="(item, i) in items">
          <article class="grid grid-cols-2 gap-4 hotels__list__item">
            <picture class="w-full image">
              <img :src="getItemImage(item)" class="w-full object-contain" />
            </picture>
            <div classs="content">
              <h3>{{ item.name }}</h3>
              <truncate>{{ item.description }}</truncate>

              <div class="mt-4 p-6 bg-gray-50 offers">
                <h4>Offers</h4>
                <ul class="hotel__offers__list">
                  <li :key="`offer-${offerIndex}`" class="hotel__offers_item" v-for="(offer, offerIndex) in item.offers">
                    <hotel-offer-card :item="offer" />
                  </li>
                </ul>
              </div>
            </div>
          </article>
        </div>
      </template>
      <template v-else>
        <h3>{{ t('error.no-items') }}</h3>
      </template>

    </template>
    <template v-else>
      <loading-markup :message="t('message.loading')" />
    </template>
  </div>
</template>

<script setup name="HotelsList" lang="ts">
// TODO: add tooltip to show full text

import { computed, defineProps } from "vue"
import HotelMarkupImage from '@images/markup/hotel-markup.svg'

import { HotelOfferCard } from '@/components/cards'
import { Truncate } from '@/components/readmore'
import { LoadingMarkup } from '@/components/markup'
import { useI18n } from "vue-i18n"

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

function getItemImage(item) {
  const { media } = item

  return media || HotelMarkupImage
}
</script>

<style lang="scss" scoped>
.hotels__list {
  @include e('item') {
    grid-template-columns: minmax(auto, 200px) auto;
  }
}
</style>

<i18n>
{
  "en": {
    "message": {
      "loading": "Searching best hotel deals..."
    },
    "error": {
      "no-items": "There are no offers available for the selected city :("
    }
  }
}
</i18n>

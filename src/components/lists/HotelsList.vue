<template>
  <div class="hotels__list">
    <div :key="`item-${i}`" class="mb-4" v-for="(item, i) in items">
      <article class="grid grid-cols-2 gap-4 hotels__list__item">
        <picture class="w-full image">
          <img :src="getItemImage(item)" class="w-full object-contain" />
        </picture>
        <div classs="content">
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>

          <div class="mt-4 p-6 bg-gray-50 offers">
            <h4>Offers</h4>
            <ul class="offers__list">
              <li :key="`offer-${offerIndex}`" class="offers__list_item" v-for="(offer, offerIndex) in item.offers">
                <h5>{{ offer.price }}</h5>
                <h6 class="mb-4">{{ offer.guests  }} Guest(s)</h6>
                <em>{{ offer.description }}</em>
              </li>
            </ul>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup name="HotelsList" lang="ts">
import { defineProps } from "vue"
import HotelMarkupImage from '@images/markup/hotel-markup.svg'

const props = defineProps({
    items: {}
})

function getItemImage(item) {
  const { media } = item

  return media || HotelMarkupImage
}
</script>

<style lang="scss" scoped>
.hotels__list {
  @include e('item') {
    grid-template-columns: minmax(auto, 400px) auto;
  }
}
</style>

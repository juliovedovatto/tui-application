<template>
<div class="offer">
  <div class="offer__header mb-16">
    <div class="container mx-auto">
      <h3 class="mb-8">{{ t('title.page-title') }}</h3>
    </div>
  </div>
  <div class="container mx-auto" v-if="offer">
    <div class="offer__details">
      <div class="mb-8 flex">
        <picture class="offer__image">
          <img :src="image" class="w-full object-contain" />
        </picture>
        <div class="flex-grow ml-6">
          <h2 class="flex-grow mb-6">{{ name }}</h2>
          <h4 class="mb-4">{{ t('label.category') }}: {{ category }}</h4>
          <div class="mb-8 offer__description">
            <p>{{ offer.description }}</p>
          </div>
        </div>
      </div>

      <div class="flex">
        <div class="flex-grow offer__options">
          <h5>{{ t('label.checkin-details') }}</h5>
          <ul>
            <li>Check In: {{ checkInDate }}</li>
            <li>Check Out: {{ checkOutDate }}</li>
            <li>Guests: {{ offer.guests }}</li>
            <li>Payment Options: {{ paymentOptions }}</li>
          </ul>
        </div>
        <div class="ml-4 flex-grow offer__price">
          <h5 class="mb-4">{{ t('label.pricing') }}</h5>

          <strong>{{ t('label.price') }}</strong> {{ offer.price.base }} {{ offer.price.currency }}<br>

          <div class="mb-4 offer__price__taxes">
            <template v-if="hasTaxes">
              <strong>{{ t('label.taxes') }}:</strong>
              <ul>
                <li :key="`tax-${i}`" v-for="(tax, i) in offer.price.taxes">
                  {{ tax.type }}: {{ tax.amount }} {{ offer.price.currency }} ({{ taxIncludedLabel(tax.included) }})
                </li>
              </ul>
            </template>
            <template v-else>
              <strong>{{ t('label.taxes') }}: {{ t('error.not-available') }}</strong>
            </template>
          </div>

          <h6>{{ t('label.price-total')  }}: {{ priceTotal }}</h6>
        </div>
        <div class="ml-4 offer__actions">
          <button class="button--primary button--lg">{{ t('actions.get-offer') }}</button>
        </div>
      </div>
    </div>
    <div class="mt-16 text-center offer__footer">
      <h5 class="mb-4">{{ t('message.back') }}</h5>
      <router-link :to="{ name: 'home' }" class="button--link">{{ t('actions.back') }}</router-link>
    </div>
  </div>
</div>
</template>

<script setup name="OfferView" lang="ts">
import { computed, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '@/store';
import { formatLocale } from '@/core/helpers/date';
import { useI18n } from 'vue-i18n';
import { sumBy } from 'lodash-es';

import HotelMarkupImage from '@images/markup/hotel-markup.svg'

const route = useRoute()
const store = useStore()
const { t } = useI18n()

const offer = computed(() => store.getters['hotels/offer'])
const hotel = computed(() => offer?.value.hotel)
const name = computed(() => hotel.value.name)
const category = computed(() => offer.value.category || '-')
const image = computed(() => {
  const { media = null } = hotel.value

  return media || HotelMarkupImage
})
const checkInDate = computed(() => offer.value?.checkInDate && formatLocale(offer.value?.checkInDate, t('date.localized.full')) || '' )
const checkOutDate = computed(() => offer.value?.checkOutDate && formatLocale(offer.value?.checkOutDate, t('date.localized.full')) || '' )
const paymentOptions = computed(() => offer.value?.acceptedPayments?.join(', ') || t('error.not-available'))
const hasTaxes = computed(() => !!offer.value?.price?.taxes?.length)
const priceTotal = computed(() => {
  const { base, taxes, currency } = offer.value.price

  const totalTaxes = sumBy(taxes.filter(({ included }: { included: boolean }) => !included), 'amount')
  const total = base + totalTaxes

  return `${total} ${currency}`
})

onBeforeMount(() => {
  const { offer } = route.params

  store.dispatch('hotels/clearOffer')
  store.dispatch('hotels/offer', offer)
})

function taxIncludedLabel(isIncluded: boolean) {
  return t(`label.${isIncluded ? 'tax-included' : 'tax-not-included'}`)
}

</script>

<i18n>
{
  "en": {
    "title": {
      "page-title": "Offers"
    },
    "label": {
      "category": "Category",
      "checkin-details": "Checkin Details",
      "tax-included": "Included",
      "tax-not-included": "Not Included",
      "pricing": "Pricing",
      "price": "Base Price",
      "taxes": "Taxes",
      "price-total": "Total"
    },
    "message": {
      "back": "Isn't that what you're looking for? Try back to results and see other offers :)"
    }
  }
}
</i18n>

<style lang="scss" scoped>
.offer {
  @include e('header') {
    @apply p-8;

    background-color: $tui-blue-100;
    height: 96px;
    color: $tui-white;
  }
  @include e('details') {
  }
  @include e('image') {
    width: 300px;
  }
  @include e('description') {
    @apply p-4;

    background-color: $tui-beige-25u;
  }
  @include e('price') {
    @apply p-4;

    background-color: $tui-grey-25u;
  }

  @include e('footer') {
    @apply p-4;

    border-top: 1px solid $tui-grey-38;
  }
}
</style>

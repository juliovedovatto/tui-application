<template>
<div class="offer" v-if="offer">
  <h2>Offer</h2>

  <div class="details">
    <h4>Category: {{ offer.category }}</h4>
    <div class="description">
      <p>{{ offer.description }}</p>
    </div>

    <ul>
      <li>Check In: {{ checkInDate }}</li>
      <li>Check Out: {{ checkOutDate }}</li>
      <li>Guests: {{ offer.guests }}</li>
      <li>Payment Options: {{ paymentOptions }}</li>
    </ul>

    <div class="price">
      Price: {{ offer.price.base }} {{ offer.price.currency }}<br>
      Taxes:
      <ul>
        <li :key="`tax-${i}`" v-for="(tax, i) in offer.price.taxes">
          {{ tax.type }}: {{ tax.amount }} {{ offer.price.currency }} ({{ taxIncludedLabel(tax.included) }})
        </li>
      </ul>
      Total: {{ priceTotal }}
    </div>

    <button class="button--primary">{{ t('actions.get-offer') }}</button>
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

const route = useRoute()
const store = useStore()
const { t } = useI18n()

const offer = computed(() => store.getters['hotels/offer'])
const checkInDate = computed(() => offer.value?.checkInDate && formatLocale(offer.value?.checkInDate, t('date.localized.full')) || '' )
const checkOutDate = computed(() => offer.value?.checkOutDate && formatLocale(offer.value?.checkOutDate, t('date.localized.full')) || '' )
const paymentOptions = computed(() => offer.value?.acceptedPayments.join(', ') || t('error.not-available'))
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
    "label.tax-included": "Included",
    "label.tax-not-included": "Not Included",
  }
}
</i18n>

<style lang="scss" scoped></style>

<template>
  <div class="hotel__offer">
    <div class="flex">
      <div class="flex-grow hotel__offer__details">
        <h5>{{ item.price }}</h5>
        <h6 class="mb-4">{{ item.guests  }} Guest(s)</h6>
        <em>{{ item.description }}</em>
      </div>
      <div class="hotel__offer__actions">
        <router-link :to="{ name: 'offer', params: { offer: item.id } }" class="button--primary mr-3">{{ t('actions.details') }}</router-link>
        <router-link :to="'#'" class="button--secondary mr-3">{{ t('actions.get-offer') }}</router-link>
      </div>
    </div>
  </div>
</template>

<script setup name="HotelOfferCard" lang="ts">
import { defineProps } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  item: {
    offers: Object,
    required: true
  }
})

const { t } = useI18n()

</script>

<style lang="scss" scoped>
.hotel__offer {
  @include e('details') {}
  @include e('actions') {}
}
</style>

<i18n>
{
  "en": {
    "actions": {
      "details": "Details",
      "get-offer": "Get Offer"
    }
  }
}
</i18n>

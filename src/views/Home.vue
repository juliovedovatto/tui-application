<template>
  <quick-search-nav class="mb-4 " @change:filter="handleFilterChange" />
  <div class="container mx-auto">
    <template v-if="selectedCity">
      <h2 class="mb-4">Hotel Offers for {{ selectedCity }}</h2>

      <div class="bg-blue-50 p-4 mb-4 weather">
        <h4 class="mb-4">Weather Conditions</h4>
        <weather-list :items="weather" :loading="isWeatherLoading" />
      </div>
      <div class="hotels">
        <h4 class="mb-4">Available Offers</h4>
          <hotels-list :items="offers" :loading="isHotelsLoading" />
      </div>
    </template>
    <template v-else>
      <div class="text-center">
        <message-notification type="info">{{ t('message.no-city-selected')}}</message-notification>
      </div>
    </template>
  </div>
</template>

<script setup name="HomeView" lang="ts">
import { useStore } from '@/store'
import { computed, ref, watch } from 'vue'
import { HotelsList, WeatherList } from '@/components/lists'
import { QuickSearchNav } from '@/components/navs'
import { MessageNotification } from '@/components/notification'
import { useI18n } from 'vue-i18n'

const store = useStore()
const { t } = useI18n()

const selectedCity = ref('')

const isHotelsLoading = computed(() => store.getters['hotels/loading'])
const isWeatherLoading = computed(() => store.getters['weather/loading'])
const offers = computed(() => store.getters['hotels/items'])
const weather = computed(() => store.getters['weather/forecast'])
const currentCountry = computed(() => store.getters['currentCountry'])
const currentCity = computed(() => store.getters['currentCity'])

async function handleFilterChange(country: string, city: string, cityCode: string) {
  selectedCity.value = city

  if (currentCountry.value === country && currentCity.value === city) {
    return
  }

  store.commit('setCountry', country)
  store.commit('setCity', city)

  store.dispatch('hotels/clear')
  store.dispatch('weather/clear')
  store.dispatch('weather/list', { city })
  store.dispatch('hotels/list', { cityCode, sort: 'PRICE' })
}

</script>

<style lang="scss" scoped>
.quick-search {
  @apply p-8;

  background-color: $tui-blue-100;
  height: 96px;
}
</style>

<i18n>
{
  "en": {
    "message": {
      "no-city-selected": "Select a city to get the best Hotel deals"
    }
  }
}
</i18n>

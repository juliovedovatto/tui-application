<template>
  <h1>Hotel Offers</h1>

  <div>
    <h3 class="mb-8">Paris</h3>
    <div class="bg-blue-50 p-4 mb-4 weather">
      <h4 class="mb-4">Weather Conditions</h4>
      <weather-list :items="weather" />
    </div>
    <div class="hotels">
      <h4 class="mb-4">Available Offers</h4>
      <hotels-list :items="offers" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useStore } from '@/store'
  import { onBeforeMount, computed } from 'vue'
  import { HotelsList, WeatherList } from '@/components/lists'

  const store = useStore()

  const offers = computed(() => store.getters['hotels/items'])
  const weather = computed(() => store.getters['weather/forecast'])

  onBeforeMount(async () => {
    store.dispatch('hotels/clear')
    store.dispatch('weather/clear')

    await store.dispatch('weather/list', { city: 'Paris' })
    await store.dispatch('hotels/list', { cityCode: 'PAR', sort: 'PRICE' })
  })
</script>

<style lang="scss" scoped></style>

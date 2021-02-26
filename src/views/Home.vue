<template>
  <h1>Home</h1>

  <div>
    <weather-list :items="weather" />
    <hotels-list :items="offers" />
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

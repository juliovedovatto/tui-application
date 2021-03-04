<template>
<div class="quick-search">
  <div class="container mx-auto flex">
    <div class="quick-search__filters">
      <strong class="mr-4">Filter Offers by</strong>
      <dropdown-field v-model="country" :options="countries" :value="currentCountry" placeholder="Select a Contry" class="mr-4" @change="handleCountryChange"  />
      <dropdown-field ref="componentCity" v-model="city" :options="availableCities" :value="currentyCityValue" placeholder="Select a City"  />
    </div>
    <div class="quick-search__sorting">

    </div>
  </div>
</div>
</template>

<script setup name="QuickSearchNav" lang="ts">
import { computed, defineEmit, onBeforeMount, ref, watch } from 'vue'
import { DropdownField } from '@/components/form'
import { useStore } from '@/store'

const store = useStore()
const emit = defineEmit(['change:filter', 'change:sort'])

const country = ref('')
const city = ref('')
const componentCity = ref()

const availableCities = computed(() => {
  return getCities(country.value)
})
const currentCountry = computed(() => store.getters['currentCountry'])
const currentCity = computed(() => store.getters['currentCity'])
const currentyCityValue = computed(() => {
  if (!currentCountry.value) {
    return ''
  }

  const { value } = getCity(currentCity.value) || {}

  return value || ''
})

const countries = [
  { label: 'Portugal', value: 'portugal' },
  { label: 'Spain', value: 'spain' },
  { label: 'Italy', value: 'italy' },
  { label: 'Brazil', value: 'brazil' }
]
const cities: Record<string, Record<string, unknown>[]> = {
  'portugal': [
    { label: 'Lisbon', value: 'lisbon', cityCode: 'LIS' },
    { label: 'Coimbra', value: 'tavira', cityCode: 'CBP' },
    { label: 'Porto', value: 'porto', cityCode: 'OPO' }
  ],
  'spain': [
    { label: 'Madri', value: 'madri', cityCode: 'MAD' },
    { label: 'Barcelona', value: 'barcelona', cityCode: 'BCN' },
    { label: 'Ibiza', value: 'ibiza', cityCode: 'IBZ' }
  ],
  'italy': [
    { label: 'Rome', value: 'rome', cityCode: 'FCO' },
    { label: 'Milan', value: 'milan', cityCode: 'LIN' },
    { label: 'Venice', value: 'venice', cityCode: 'VCE' }

  ],
  'brazil': [
    { label: 'Rio de Janeiro', value: 'rio de janeiro', cityCode: 'GIG' },
    { label: 'São Paulo', value: 'sao paulo', cityCode: 'GRU' },
    { label: 'Salvador', value: 'salvador', cityCode: 'SSA' }
  ]
}

watch(city, (value) => {
  if (!value) {
    return
  }

  const { label, cityCode } = getCity(city.value)
  emit('change:filter', country.value, label, cityCode)
})

onBeforeMount(() => {
  if (currentCountry.value && currentCity.value) {
    country.value = currentCountry.value

    const { value } = getCity(currentCity.value)
    city.value = value as string
  }
})

function getCities(country: string): Record<string, unknown>[] {
  if (!country) {
    return []
  }

  return cities[country] || []
}

function getCity(city: string) {
  if (!country.value) {
    return {}
  }

  const cities = getCities(country.value)
  const [ data ] = cities.filter(({ label, value }) => label === city || value === city)

  return data
}

function handleCountryChange() {
  componentCity.value?.clear()
}


</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style lang="scss" scoped>
.quick-search {
  @include e('filters') {
    @apply flex items-center;
  }
}
</style>

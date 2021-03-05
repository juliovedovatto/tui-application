<template>
<div class="quick-search">
  <div class="container mx-auto flex">
    <div class="quick-search__filters">
      <strong class="mr-4">Filter Offers by</strong>
      <dropdown-field v-model="country" :options="countries" :value="currentCountry" :placeholder="t('label.country')" class="mr-4" @change="handleCountryChange"  />
      <dropdown-field ref="componentCity" v-model="city" :options="availableCities" :value="currentyCityValue" :placeholder="t('label.city')"  />
    </div>
    <div class="quick-search__sorting">
      <strong class="mr-4">Sort Results</strong>
      <dropdown-field v-model="sort" :options="sortOptions" :value="sortOptionsDefault" :placeholder="t('label.sort')" :disabled="!hasCitySelected" @change="handleSorting"  />
    </div>
  </div>
</div>
</template>

<script setup name="QuickSearchNav" lang="ts">
import { computed, defineEmit, onBeforeMount, ref, watch } from 'vue'
import { DropdownField } from '@/components/form'
import { useStore } from '@/store'

import { translate, translateChoice } from '@/core/helpers/choices'
import { Countries, HotelOffersSortOptions } from '@/core/config'
import { generateOptions } from '@/core/helpers/dropdown'
import { enumKeys, isFalsy } from '@/core/helpers/types'
import { useI18n } from 'vue-i18n'

const store = useStore()
const emit = defineEmit(['change:filter', 'change:sort'])
const { t } = useI18n()

const country = ref('')
const city = ref('')
const sort = ref('')
const componentCity = ref()

const availableCities = computed(() => {
  return getCities(country.value)
})
const currentCountry = computed(() => store.getters['currentCountry'])
const currentCity = computed(() => store.getters['currentCity'])
const currentyCityValue = computed(() => {
  if (isFalsy(currentCountry.value, true)) {
    return ''
  }

  const { value } = getCity(currentCity.value) || {}

  return value || ''
})
const hasCitySelected = computed(() => !isFalsy(city.value, true))

const translatedHotelOffersSortOptions = translateChoice(HotelOffersSortOptions)
const translatedCountries = translateChoice(Countries)

const countries = enumKeys(Countries).map(k => ({ label: translatedCountries[k], value: Countries[k] }))

// TODO: translate cities
const cities: Record<string, Record<string, unknown>[]> = {
  [Countries.PORTUGAL]: [
    { label: 'Lisbon', value: 'lisbon', cityCode: 'LIS' },
    { label: 'Coimbra', value: 'coimbra', cityCode: 'CBP' },
    { label: 'Porto', value: 'porto', cityCode: 'OPO' }
  ],
  [Countries.SPAIN]: [
    { label: 'Madri', value: 'madri', cityCode: 'MAD' },
    { label: 'Barcelona', value: 'barcelona', cityCode: 'BCN' },
    { label: 'Ibiza', value: 'ibiza', cityCode: 'IBZ' }
  ],
  [Countries.ITALY]: [
    { label: 'Rome', value: 'rome', cityCode: 'FCO' },
    { label: 'Milan', value: 'milan', cityCode: 'LIN' },
    { label: 'Venice', value: 'venice', cityCode: 'VCE' }

  ],
  [Countries.BRAZIL]: [
    { label: 'Rio de Janeiro', value: 'rio de janeiro', cityCode: 'GIG' },
    { label: 'São Paulo', value: 'sao paulo', cityCode: 'GRU' },
    { label: 'Salvador', value: 'salvador', cityCode: 'SSA' }
  ]
}

const sortOptions = enumKeys(HotelOffersSortOptions).map(k => ({ label: translatedHotelOffersSortOptions[k], value: HotelOffersSortOptions[k] }))
const sortOptionsDefault = String(HotelOffersSortOptions.PRICE_ASC)

watch(city, (value) => {
  if (isFalsy(value, true)) {
    return
  }

  handleCityChange()
})

onBeforeMount(() => {
  if (currentCountry.value && currentCity.value) {
    country.value = currentCountry.value

    const { value } = getCity(currentCity.value)
    city.value = value as string
  }
})

function getCities(country: string): Record<string, unknown>[] {
  if (isFalsy(country, true)) {
    return []
  }

  return cities[country] || []
}

function getCity(city: string) {
  if (isFalsy(country.value, true)) {
    return {}
  }

  const cities = getCities(country.value)
  const [ data ] = cities.filter(({ label, value }) => label === city || value === city)

  return data
}

function handleCountryChange() {
  componentCity.value?.clear()
}

function handleCityChange() {
  if (isFalsy(city.value, true)) {
    return
  }

  const { label, cityCode } = getCity(city.value)

  emit('change:filter', country.value, label, cityCode)
}

function handleSorting(value) {
  emit('change:sort', value)
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style lang="scss" scoped>
.quick-search {
  @include e('filters') {
    @apply flex items-center flex-grow mr-4;
  }
  @include e('sorting') {
    @apply flex items-center;
  }
}
</style>

<i18n>
{
  "en": {
    "label": {
      "country": "Select a Contry",
      "city": "Select a City",
      "sort": "Sorting Options"
    }
  }
}
</i18n>

<template>
<div class="dropdown-field" :style="componentStyle">
  <multiselect
    ref="component"
    v-model="model"
    :options="options"
    :disabled="disabled"
    :searchable="searchable"
    :placeholder="placeholder"
    @change="$attrs.onChange"
  />
</div>
</template>

<script setup name="DropdownField" lang="ts">
import { defineProps, ref, watch, defineEmit, computed, useContext, onMounted } from 'vue'
import Multiselect from '@vueform/multiselect'

const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  searchable: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  value: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  width: {
    type: Number,
    default: 300
  }
})

const { expose } = useContext()

const component = ref()

const componentStyle = computed(() => {
  return {
    width: `${props.width}px`
  }
})

const model = ref('')

const emit = defineEmit(['update:modelValue'])

watch(model, () => {
  emit('update:modelValue', model.value)
})

expose({
  clear() {
    component.value?.clear()
  }
})
</script>

<style lang="scss" scoped>
.dropdown-field {
  & ::v-deep(.multiselect) {
    background-color: $tui-white;
  }
}
</style>

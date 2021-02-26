<template>
  <component ref="el" :is="props.componentTag" class="truncate" :class="{ 'truncate--is-truncated': canShowTruncated }">
    <component ref="text" :is="props.tag" :id="`${id}-truncate`" class="truncate__text" :style="styles" :class="props.textClasses">
      <slot>{{ props.text }}</slot>
    </component>
  </component>
</template>

<script setup name="Truncate" lang="ts">
import { v1 as uuid } from 'uuid'

import { computed, defineProps, onBeforeUnmount, onMounted, ref } from 'vue'
const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  placement: {
    type: String,
    default: 'bottom'
  },
  lines: {
    type: Number,
    default: 1
  },
  textClasses: {
    type: Array,
    default: []
  },
  showOriginalText: {
    type: Boolean,
    default: true
  },
  componentTag: {
    type: String,
    default: 'div'
  },
  tag: {
    type: String,
    default: 'p'
  },
  maxWidth: {
    type: String,
    default: ''
  }
})

const el = ref<HTMLElement>()
const text = ref<HTMLElement>()

const isTruncated = ref(false)
const resizeObserver = ref<ResizeObserver>()

const styles = computed(() => ({ '-webkit-line-clamp': props.lines }))
const canShowTruncated = computed(() => isTruncated.value && props.showOriginalText)
const fullText = computed(() => props.text || text.value?.textContent || '')
const fullTextStyle = computed(() => ({ maxWidth: props.maxWidth || 'none' }))

const id = uuid()

function setResizeObserver() {
  resizeObserver.value = new ResizeObserver(entries => {
    entries.forEach(entry => {
      const {
        contentRect: { height },
        target
      } = entry
      if (!height) {
        return
      }

      const { offsetHeight, scrollHeight } = target as HTMLElement

      isTruncated.value = scrollHeight - 1 > offsetHeight
    })
  })

  resizeObserver.value.observe(el.value?.querySelector('.truncate__text') as Element)
}

onMounted(() => {
  setResizeObserver()
})

onBeforeUnmount(() => {
  resizeObserver.value?.disconnect()
})
</script>

<style lang="scss" scoped>
.truncate {
  word-break: break-word;
  white-space: normal;

  @include m('is-truncated') {
    cursor: pointer;
  }

  @include e('text') {
    margin-bottom: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
}
</style>

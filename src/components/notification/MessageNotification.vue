<template>
  <div :class="componentClasses" class="notification-message">
    <p>
      <slot />
    </p>
  </div>
</template>

<script setup name="MessageNotification" lang="ts">
import { computed, defineProps } from "vue";

const AVAILABLE_TYPES = ['success', 'info', 'warning', 'error']

const props = defineProps({
  type: {
    type: String,
    default: '',
  }
})

const notificationType = computed(() => AVAILABLE_TYPES.includes(props.type) && props.type || 'default')

const componentClasses = computed(() => ({
  [`notification-message--${notificationType.value}`]: true
}))

</script>

<style lang="scss" scoped>
.notification-message {
  @apply p-4 border;

  @include m('warning') {
    border-color: $tui-yellow-50;
    background-color: $tui-yellow-25u;
  }
  @include m('error') {
    border-color: $tui-red-50;
    background-color: $tui-red-100u;
  }
  @include m('success') {
    border-color: $tui-green-50;
    background-color: $tui-green-25u;
  }
  @include m('info') {
    border-color: $tui-blue-50;
    background-color: $tui-blue-25u;
  }
  @include m('default') {
    border-color: $tui-grey-50;
    background-color: $tui-grey-25u;
  }
}
</style>

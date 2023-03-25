<template>
    <label class="at-input-checkbox__wrapper">
      <input
        type="checkbox"
        :disabled="disabled"
        :checked="checked"
        @click="clickHandler"
      >
      <span class="checkmark" />
    </label>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number, Object],
      default: ''
    },
    flag: {
      type: String,
      default: 'white'
    }
  })
  
  const emit = defineEmits(['update:modelValue'])
  
  const clickHandler = (e: Event) => {
    const element: HTMLInputElement = e.target as HTMLInputElement
    emit('update:modelValue', element.checked)
  }
  </script>
  
  <style scoped lang="scss" src="./styles.scss"></style>
  
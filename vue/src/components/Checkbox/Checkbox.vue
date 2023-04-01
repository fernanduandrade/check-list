<template>
  <label class="at-input-checkbox__wrapper">
    <input
      type="checkbox"
      :disabled="disabled"
      :checked="modelValue"
      @click="clickHandler"
    >
    <span class="checkmark"/>
  </label>
</template>
  
<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { CheckboxProps, Direction } from '@/common/types'

const props = defineProps<CheckboxProps>()

const emit = defineEmits(['update:modelValue'])

const clickHandler = (e: Event) => {
  const element = e.target as HTMLInputElement
  emit('update:modelValue', element.checked)
}
</script>
  
<style scoped lang="scss">
@import '../../styles/variables';

.at-input-checkbox {
  &__wrapper {
    display: block;
    position: relative;
    padding-left: 20px;
    margin-bottom: 18px;
    font-weight: 400;
    font-size: 14px !important;

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }
  }
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 16px;
  width: 16px;
  background-color: $background-white;
  border: 1px solid v-bind(priority);
  border-radius: 4px;

  &:hover {
    cursor: pointer;
  }
}

.at-input-checkbox__wrapper:hover input ~ .checkmark {
  border: 1px solid rgb(0, 140, 255);
}

.at-input-checkbox__wrapper input:checked ~ .checkmark {
  background-color: v-bind(priority);
  border: none;
}

.at-input-checkbox__wrapper input:disabled ~ .checkmark {
  background-color: $background-white;
  border: 1px solid $grey-light;
}

.checkmark:after {
  content: '';
  position: absolute;
  display: none;
}

.at-input-checkbox__wrapper input:checked ~ .checkmark:after {
  display: block;
}

.at-input-checkbox__wrapper .checkmark:after {
  left: 5.6px;
  top: 2.6px;
  width: 5px;
  height: 8px;
  border: solid $background-white;
  border-width: 0 1px 1px 0px;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
  
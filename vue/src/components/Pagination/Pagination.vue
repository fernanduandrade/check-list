<script lang="ts" setup>
import FontAwesomeIcon from '@/plugins/fa.config';
import { defineProps, computed, ref } from 'vue';

const props = defineProps({
  totalPage: {
    type: Number,
    required: true
  },
  hasPreviousPage: {
    type: Boolean,
    required: true
  },
  hasNextPage: {
    type: Boolean,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  }
})

const showPages = ref<number>(4)

const pages = computed(() => {
  const numShown = Math.min(showPages.value, props.totalPage);
  let first = props.currentPage - Math.floor(numShown / 2);
  first = Math.max(first, 1);
  first = Math.min(first, props.totalPage - numShown + 1);
  return [...Array(numShown)].map((k,i) => i + first);
})

const emit = defineEmits<{
  (event: 'change-page', value: number): void,
  (event: 'update-current-page', value: number): void
}>()

const eventChangePage = (page: number): void => {
  emit('change-page', page)
  emit('update-current-page', page)
}
</script>

<template>
  <div class="main">
    <previous-page v-if="hasPreviousPage" class="page" @click="eventChangePage(currentPage - 1)">
      <font-awesome-icon icon="fa-angle-left" />
    </previous-page>
    <div v-for="(page, index) in pages" :key="index"
      :class="currentPage === page ? 'active-page' : ''"
      class="page" @click="eventChangePage(page)">
      <span class="page-number">{{ page }}</span>
    </div>
    <next-page v-if="hasNextPage" class="page" @click="eventChangePage(currentPage + 1)">
      <font-awesome-icon icon="fa-angle-right" />
    </next-page>
  </div>
</template>

<style scoped lang="scss" src="./scss/styles.scss"></style>
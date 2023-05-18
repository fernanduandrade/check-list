<script lang="ts" setup>
import FontAwesomeIcon from '@/plugins/fa.config';
import { defineProps } from 'vue';

const props = defineProps({
    totalPage: {
        type: Array<number>,
        required: true
    },
    hasPreviousPage: {
        type: Boolean,
        required: true
    },
    hasNextPage: {
        type: Boolean,
        required: true
    }
})

const emit = defineEmits<{
    (event: 'change-page', value: number): void
}>()

const eventChangePage = (page: number) => emit('change-page', page)

</script>

<template>
    <div class="main">
      <span v-if="props.hasPreviousPage" class="page">
        <font-awesome-icon icon="fa-angle-left" />
    </span>
      <div v-for="(page, index) in props.totalPage" :key="index" class="page">
        <span class="page-number" @click="eventChangePage(page)">{{ page }}</span>
      </div>
      <span v-if="props.hasNextPage" class="page">
        <font-awesome-icon icon="fa-angle-right" />
        </span>
    </div>
</template>

<style scoped lang="scss">
.main {
  display: flex;
  max-width: 200px;
  height: 30px;
  margin: 0 50px 10px 0;
}

.page {
  width: 35px;
  height: 35px;
  &:hover {
    background-color: purple;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  color: var(--text-primary-color);
  transition: .2s ease;
  &:hover {
    color: #FFF;
    cursor: pointer;
  }
}

.page-number {
  font-size: 14px;
  
}
</style>
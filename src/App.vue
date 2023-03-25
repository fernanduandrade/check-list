<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import FontAwesomeIcon from './plugins/fa.config';
import Divider from './components/Divider/index.vue'
import Checkbox from './components/Checkbox/index.vue'
const  LoadActionModal = defineAsyncComponent(() => import('@/components/ActionModal/index.vue'))

const show1 = ref(false)
const show2 = ref(false)
</script>

<template>
  <main class="container">
    <header class="check-list__header">
      Check List - TODO
    </header>
    <ActionModal />
    <Divider />
    <section class="check-list__section">
        <div class="check-list__section task">
          <div class="check-list__section task__checkbox">
            <Checkbox />
          </div>

          <div class="check-list__section task__title">
            <span>
              asdsadjisaoidjwqoiejasdsadjisaoidjwqoiejasdsadjis
            </span> 
          </div>
          <div class="check-list__section task__actions">
            <div class="check-list__section task__actions--icon">
              <font-awesome-icon icon="fa-chevron-up" />
            </div>
            <div class="check-list__section task__actions--icon">
              <font-awesome-icon icon="fa-chevron-down"/>
            </div>
            <div class="check-list__section task__actions--icon" @click="show1 = !show1">
              <font-awesome-icon icon="fa-bars" />
            </div>
            <load-action-modal v-show="show1" />
          </div>
        </div>

        <div class="check-list__section task">
          <div class="check-list__section task__checkbox">
            <checkbox />
          </div>
          <div class="check-list__section task__title">
            <span>
              asdsadjisaoidjwqoiejasdsadjisaoidjwqoiejasdsadjis
            </span> 
          </div>
          <div class="check-list__section task__actions">
            <div class="check-list__section task__actions--icon">
              <font-awesome-icon icon="fa-chevron-up" />
            </div>
            <div class="check-list__section task__actions--icon">
              <font-awesome-icon icon="fa-chevron-down"/>
            </div>
            <div class="check-list__section task__actions--icon" @click="show2 = !show2">
              <font-awesome-icon icon="fa-bars" />
            </div>
            <load-action-modal v-show="show2" />
          </div>
        </div>
    </section>
    <divider />
    <footer class="check-list__footer">
      <div class="check-list__footer visibility">
        <i><font-awesome-icon icon="fa-eye" /></i>
        &nbsp Completado 3 de 9
      </div>
      <div class="check-list__footer add-task">
        <i><font-awesome-icon icon="fa-plus" /></i>
        &nbsp Adicionar tarefa
      </div>
    </footer>
  </main>
</template>

<style lang="scss" src="./styles/_base.scss"></style>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import FontAwesomeIcon from './plugins/fa.config';
import Divider from './components/Divider/Divider.vue'
import Checkbox from './components/Checkbox/Checkbox.vue'
const  LoadActionModal = defineAsyncComponent(() => import('@/components/ActionModal/ActionModal.vue'))

type Priority = 'orange' | 'yellow' |'deeppink' | 'black'

interface Todo {
  id: string,
  description?: string,
  completed: boolean,
  title: string,
  priority: Priority,
  actionOpened: boolean
}

const todoList = ref<Todo[]>([])

function generateId(): string {
     return Math.random().toString(36);
}

const addTodo = () => todoList.value.push({
    completed: false,
    id:  generateId(),
    description: '',
    priority: 'black',
    title: '',
    actionOpened: false
  })

const completedTodo = ref(0)
</script>

<template>
  <main class="container">
    <header class="check-list__header">
      Check List - TODO
    </header>
    <Divider />
    <section class="check-list__section">
      <div
        class="check-list__section task"
        v-for="todo in todoList"
        :key="todo.id"
      >
      <div class="check-list__section task__checkbox">
            <Checkbox />
          </div>

          <div class="check-list__section task__title">
            <span>{{ todo.title ? todo.title : 'Title' }}</span> 
          </div>
          <div class="check-list__section task__actions">
            <div class="check-list__section task__actions--icon">
              <font-awesome-icon icon="fa-chevron-up" />
            </div>
            <div class="check-list__section task__actions--icon">
              <font-awesome-icon icon="fa-chevron-down"/>
            </div>
            <div class="check-list__section task__actions--icon" @click="todo.actionOpened = !todo.actionOpened">
              <font-awesome-icon icon="fa-bars" />
            </div>
            <load-action-modal v-show="todo.actionOpened" />
          </div>
      </div>
    </section>
    <divider />
    <footer class="check-list__footer">
      <div class="check-list__footer visibility">
        <i><font-awesome-icon icon="fa-eye" /></i>
        &nbsp Completado {{ completedTodo }} de {{ todoList.length }}
      </div>
      <div class="check-list__footer add-task" @click="addTodo">
        <i><font-awesome-icon icon="fa-plus" /></i>
        &nbsp Adicionar tarefa
      </div>
    </footer>
  </main>
</template>

<style lang="scss" src="./styles/_base.scss"></style>

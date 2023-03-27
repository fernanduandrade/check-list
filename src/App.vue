<script setup lang="ts">
import { defineAsyncComponent, ref, computed } from 'vue'
import FontAwesomeIcon from '@/plugins/fa.config';
import Divider from '@/components/Divider/Divider.vue'
import Checkbox from '@/components/Checkbox/Checkbox.vue'
import { Todo } from '@/utils/types';
const  LoadActionModal = defineAsyncComponent(() => import('@/components/ActionModal/ActionModal.vue'))


const todoList = ref<Todo[]>([])

function generateId(): string {
     return Math.random().toString(36);
}

const hideCompletedTodo = ref(false)

const addTodo = () => todoList.value.push({
    completed: false,
    id:  generateId(),
    description: '',
    priority: 'black',
    title: '',
    actionOpened: false
  })


const completedTodo = computed(() => todoList.value.filter(todo => todo.completed).length)

const closeActionModalEvent = (event: boolean, todo: Todo) => todo.actionOpened = event
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
            <Checkbox
              @click="completedTodo = completedTodo += 1"
              v-model="todo.completed"
            />
          </div>

          <div class="check-list__section task__title">
            <!-- <input @dblclick="" v-model="todo.title"/> -->
            <label for="">{{ todo.title ? todo.title : 'Pular da ponte' }}</label> 
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
            <load-action-modal flag="teste" :todo="todo" v-show="todo.actionOpened" @closeModal="closeActionModalEvent($event, todo)"/>
          </div>
      </div>

    </section>
    <divider />
    <footer class="check-list__footer">
      <div class="check-list__footer visibility" @click="hideCompletedTodo = !hideCompletedTodo">
        <i><font-awesome-icon :icon="hideCompletedTodo ? 'fa-eye-slash' : 'fa-eye'" /></i>
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

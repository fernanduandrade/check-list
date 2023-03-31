<script setup lang="ts">
import { defineAsyncComponent, ref, computed } from 'vue'
import FontAwesomeIcon from '@/plugins/fa.config';
import Divider from '@/components/Divider/Divider.vue'
import Checkbox from '@/components/Checkbox/Checkbox.vue'
import { Priority, Todo } from '@/utils/types';
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
    title: ``,
    actionOpened: false,
    editing: false,
  })


const completedTodo = computed(() => todoList.value.filter(todo => todo.completed).length)

const closeActionModalEvent = (event: boolean, todo: Todo) => todo.actionOpened = event
const changeFlagPriorityEvent = (event: Priority, todo: Todo) => {
  todo.priority = event
}

function moveTodo(array: Todo[], index: number, direction: string) {
  if (direction === 'up') {
    // Move the element up by one position
    if (index > 0) {
      [array[index - 1], array[index]] = [array[index], array[index - 1]];
    }
  } else if (direction === 'down') {
    // Move the element down by one position
    if (index < array.length - 1) {
      [array[index], array[index + 1]] = [array[index + 1], array[index]];
    }
  }
}

function duplicateTodo(todo: Todo) {
  todoList.value.push({...todo, actionOpened: false, id: generateId()})
}

function deleteTodo(todo: Todo) {
  const indexOf = todoList.value.indexOf(todo)
  todoList.value.splice(indexOf, 1)
}


function changeTodoTitle(todo: Todo) {
  todo.editing = true
}

const toggleCompleteTodos = () => {
  hideCompletedTodo.value = !hideCompletedTodo.value
}

const filteredTodos = computed(
  () => !hideCompletedTodo.value
    ? todoList.value
    : todoList.value.filter(todo => !todo.completed))

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
        v-for="(todo, index) in filteredTodos"
        :key="todo.id"
      >
      <div class="check-list__section task__checkbox">
            <Checkbox
              @click="completedTodo = completedTodo += 1"
              v-model="todo.completed"
              :priotity="todo.priority"
            />
          </div>

          <div v-if="todo.editing" class="check-list__section task__input">
            <input
              class="check-list__section task__input--editing"
              v-if="todo.editing"
              @keyup.enter="todo.editing = false"
              type="text"
              v-model="todo.title"
            > 
          </div>
          <div v-else class="check-list__section task__title">
            <label :class="`check-list__section task__title${(!todo.title ? '--empty' : '')}`" @dblclick="changeTodoTitle(todo)" for="">{{ todo.title ? todo.title : `Título` }}</label> 
          </div>

          <div class="check-list__section task__actions">
            <div
              :class="`check-list__section task__actions--icon ${(index === 0 || todoList.length === 1 ? 'disabled': '')}`"
              @click="moveTodo(todoList, index, 'up')"
            >
              <font-awesome-icon icon="fa-chevron-up" />
            </div>
            <div
              :class="`check-list__section task__actions--icon ${(index === todoList.length - 1|| todoList.length === 1 ? 'disabled': '')}`"
              @click="moveTodo(todoList, index, 'down')"
            >
              
              <font-awesome-icon icon="fa-chevron-down"/>
            </div>
            <div class="check-list__section task__actions--icon" @click="todo.actionOpened = !todo.actionOpened">
              <font-awesome-icon icon="fa-bars" />
            </div>
            <load-action-modal
              :todo="todo"
              :lastPosition="index === todoList.length - 1"
              :firstPosition="index === 0"
              :oneElement="todoList.length === 1"
              @mouseleave="todo.actionOpened = false"
              @closeModal="closeActionModalEvent($event, todo)"
              @changeFlagColor="changeFlagPriorityEvent($event as Priority, todo)"
              @movePosition="moveTodo(todoList, index, $event)"
              @duplicate="duplicateTodo(todo)"
              @delete="deleteTodo(todo)"
              v-show="todo.actionOpened"
            />
          </div>
      </div>

    </section>
    <divider />
    <footer class="check-list__footer">
      <div class="check-list__footer visibility" @click="toggleCompleteTodos">
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

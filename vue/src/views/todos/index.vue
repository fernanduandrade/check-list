<script setup lang="ts">
import { defineAsyncComponent, ref, computed } from 'vue'
import FontAwesomeIcon from '@/plugins/fa.config';
import Divider from '@/components/Divider/Divider.vue'
import Checkbox from '@/components/Checkbox/Checkbox.vue'
import ThemeButton from '@/components/ThemeButton/ThemeButton.vue'
import { Priority, Todo } from '@/common/types';
import { moveArrayElementIndex, generateId } from '@/common/logic'
const LoadActionModal = defineAsyncComponent(() => import('@/components/ActionModal/ActionModal.vue'))

const todoList = ref<Todo[]>([])

const hideCompletedTodo = ref(false)

const addTodo = () => todoList.value.push({
  completed: false,
  id: generateId(),
  description: '',
  priority: 'black',
  title: ``,
  actionOpened: false,
  editing: false,
})


const completedTodo = computed(() => todoList.value.filter(todo => todo.completed).length)

const closeActionModalEvent = (event: boolean, todo: Todo) => todo.actionOpened = event
const changeFlagPriorityEvent = (event: Priority, todo: Todo) => todo.priority = event
const duplicateTodo = (todo: Todo) => todoList.value.push({ ...todo, actionOpened: false, id: generateId() })

const deleteTodo = (todo: Todo) => {
  const indexOf = todoList.value.indexOf(todo)
  todoList.value.splice(indexOf, 1)
}

const changeTodoTitle = (todo: Todo) => todo.editing = true

const toggleCompleteTodos = () => hideCompletedTodo.value = !hideCompletedTodo.value

const filteredTodos = computed(
  () => !hideCompletedTodo.value
    ? todoList.value
    : todoList.value.filter(todo => !todo.completed))

</script>

<template>
  <main class="container">
    <header class="check-list__header">
      <h1>Check List - TODO</h1>
      <ThemeButton />
    </header>
    <Divider />
    <section class="check-list__section">
      <div class="check-list__section task" v-for="(todo, index) in filteredTodos" :key="todo.id">
        <div class="check-list__section task__checkbox">
          <Checkbox @click="completedTodo = completedTodo += 1" v-model="todo.completed" :priority="todo.priority" />
        </div>

        <div v-if="todo.editing" class="check-list__section task__input">
          <input class="check-list__section task__input--editing" v-if="todo.editing" @keyup.enter="todo.editing = false"
            type="text" v-model="todo.title">
        </div>
        <div v-else class="check-list__section task__title">
          <label :class="`check-list__section task__title${(!todo.title ? '--empty' : '')}`"
            @dblclick="changeTodoTitle(todo)" for="">{{ todo.title ? todo.title : `Título` }}</label>
        </div>

        <div class="check-list__section task__actions">
          <div
            :class="`check-list__section task__actions--icon ${(index === 0 || todoList.length === 1 ? 'disabled' : '')}`"
            @click="moveArrayElementIndex(todoList, index, 'up')">
            <font-awesome-icon icon="fa-chevron-up" />
          </div>
          <div
            :class="`check-list__section task__actions--icon ${(index === todoList.length - 1 || todoList.length === 1 ? 'disabled' : '')}`"
            @click="moveArrayElementIndex(todoList, index, 'down')">

            <font-awesome-icon icon="fa-chevron-down" />
          </div>
          <div class="check-list__section task__actions--icon" @click="todo.actionOpened = !todo.actionOpened">
            <font-awesome-icon icon="fa-bars" />
          </div>
          <load-action-modal :todo="todo" :lastPosition="index === todoList.length - 1" :firstPosition="index === 0"
            :oneElement="todoList.length === 1" @mouseleave="todo.actionOpened = false"
            @closeModal="closeActionModalEvent($event, todo)"
            @changeFlagPriority="changeFlagPriorityEvent($event as Priority, todo)"
            @movePosition="moveArrayElementIndex(todoList, index, $event)" @duplicate="duplicateTodo(todo)"
            @delete="deleteTodo(todo)" v-show="todo.actionOpened" />
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

<style lang="scss" src="./styles.scss"></style>

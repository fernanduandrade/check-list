<script setup lang="ts">
import { defineAsyncComponent, ref, computed, onMounted } from "vue";
import FontAwesomeIcon from "@/plugins/fa.config";
import Divider from "@/components/Divider/Divider.vue";
import Checkbox from "@/components/Checkbox/Checkbox.vue";
import ThemeButton from "@/components/ThemeButton/ThemeButton.vue";
import { Priority, Todo } from "@/common/types";
import { moveArrayElementIndex, generateId } from "@/common/logic";
const LoadActionModal = defineAsyncComponent(
  () => import("@/components/ActionModal/ActionModal.vue")
);
import Pagination from "@/components/Pagination/Pagination.vue";

const todoList = ref<Todo[]>([]);

const stateTodo = ref<Todo[]>([]);
const currentPage = ref(1)
const hideCompletedTodo = ref(false);

const addTodo = () => {
  stateTodo.value.push({
    completed: false,
    id: generateId(),
    description: "",
    priority: "black",
    title: ``,
    actionOpened: false,
    editing: false,
  });

  setTodos();
  changePage(currentPage.value);
};

const getTodos = (): Todo[] => {
  const todos = localStorage.getItem("userTodos");
  if (todos === null) return [] as Todo[];
  return JSON.parse(todos);
};
 
const setTodos = () =>
  localStorage.setItem("userTodos", JSON.stringify(stateTodo.value));

 
const paginate = <T>(
  arr: Array<T>,
  pageNumber: number = 1,
  pageSize: number = 10
) => {
  const data = arr.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  const totalPages = Math.round(arr.length / pageSize);
  return {
    data,
    pageNumber,
    hasPreviousPage: pageNumber > 1,
    hasNextPage: pageNumber < totalPages,
    totalPages,
  };
};

const totalPages = ref<number>(0);
const hasNextPage = ref<boolean>(false);
const hasPreviousPage = ref<boolean>(false);

onMounted(() => {
  const todos = getTodos();
  stateTodo.value = todos
  const result = paginate(todos, 1);
  todoList.value = result.data;
  totalPages.value = result.totalPages
  hasNextPage.value = result.hasNextPage;
  hasPreviousPage.value = result.hasPreviousPage;
});

function changePage(evt: number) {
  const result = paginate(stateTodo.value, evt);
  todoList.value = result.data;
  totalPages.value = result.totalPages
  hasNextPage.value = result.hasNextPage;
  hasPreviousPage.value = result.hasPreviousPage;
}

const completedTodo = computed(
  () => todoList.value.filter((todo) => todo.completed).length
);

const closeActionModalEvent = (event: boolean, todo: Todo) =>
  (todo.actionOpened = event);

const changeFlagPriorityEvent = (event: Priority, todo: Todo) => {
  todo.priority = event;
  todoList.value = todoList.value.map((todo) => ({
    ...todo,
    actionOpened: false,
  }));
  setTodos();
};
const duplicateTodo = (todo: Todo) => {
  todoList.value.push({ ...todo, actionOpened: false, id: generateId() });
  todoList.value = todoList.value.map((todo) => ({
    ...todo,
    actionOpened: false,
  }));
  setTodos();
};

const deleteTodo = (todo: Todo) => {
  const indexOf = todoList.value.indexOf(todo);
  todoList.value.splice(indexOf, 1);
  setTodos();
};

const changeTodoTitle = (todo: Todo) => (todo.editing = true);

const toggleCompleteTodos = () =>
  (hideCompletedTodo.value = !hideCompletedTodo.value);
const completeTodo = (event: Event) => {
  setTodos();
};
const filteredTodos = computed(() =>
  !hideCompletedTodo.value
    ? todoList.value
    : todoList.value.filter((todo) => !todo.completed)
);

const todoTitleChanged = (todo: Todo) => {
  todo.editing = false;
  setTodos();
};
</script>

<template>
  <main class="container">
    <header class="check-list__header">
      <h1>Minha Tarefas</h1>
      <ThemeButton />
    </header>
    <divider />
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
            @change="completeTodo($event)"
            :priority="todo.priority"
          />
        </div>

        <div v-if="todo.editing" class="check-list__section task__input">
          <input
            class="check-list__section task__input--editing"
            v-if="todo.editing"
            @mouseleave="todoTitleChanged(todo)"
            @keyup.enter="todoTitleChanged(todo)"
            type="text"
            v-model="todo.title"
          />
        </div>
        <div v-else class="check-list__section task__title">
          <label
            :class="`check-list__section task__title${
              !todo.title ? '--empty' : ''
            }`"
            @click="changeTodoTitle(todo)"
            for=""
            >{{ todo.title ? todo.title : `Título` }}</label
          >
        </div>

        <div class="check-list__section task__actions">
          <div
            :class="`check-list__section task__actions--icon ${
              index === 0 || todoList.length === 1 ? 'disabled' : ''
            }`"
            @click="moveArrayElementIndex(todoList, index, 'up')"
          >
            <font-awesome-icon icon="fa-chevron-up" />
          </div>
          <div
            :class="`check-list__section task__actions--icon ${
              index === todoList.length - 1 || todoList.length === 1
                ? 'disabled'
                : ''
            }`"
            @click="moveArrayElementIndex(todoList, index, 'down')"
          >
            <font-awesome-icon icon="fa-chevron-down" />
          </div>
          <div
            class="check-list__section task__actions--icon"
            @click="todo.actionOpened = !todo.actionOpened"
          >
            <font-awesome-icon icon="fa-bars" />
          </div>
          <load-action-modal
            :todo="todo"
            :lastPosition="index === todoList.length - 1"
            :firstPosition="index === 0"
            :oneElement="todoList.length === 1"
            @mouseleave="todo.actionOpened = false"
            @closeModal="closeActionModalEvent($event, todo)"
            @changeFlagPriority="
              changeFlagPriorityEvent($event as Priority, todo)
            "
            @movePosition="moveArrayElementIndex(todoList, index, $event)"
            @duplicate="duplicateTodo(todo)"
            @delete="deleteTodo(todo)"
            v-show="todo.actionOpened"
          />
        </div>
      </div>
    </section>
    <div class="pagination">
      <Pagination
        @change-page="changePage($event)"
        @update-current-page="currentPage = $event"
        v-model:has-next-page="hasNextPage"
        v-model:has-previous-page="hasPreviousPage"
        v-model:total-page="totalPages"
        v-model:current-page="currentPage"
      />
    </div>

    <divider />
    <footer class="check-list__footer">
      <div class="check-list__footer visibility" @click="toggleCompleteTodos">
        <i
          ><font-awesome-icon
            :icon="hideCompletedTodo ? 'fa-eye-slash' : 'fa-eye'"
        /></i>
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

<script setup lang="ts">

import { defineProps, withDefaults } from 'vue'
import FontAwesomeIcon from '@/plugins/fa.config'
import Divider from '@/components/Divider/Divider.vue'
import { Priority, Direction, ActionModalProps } from '@/common/types'

const props = withDefaults(defineProps<ActionModalProps>(), {
    flag: 'black'
}) 

const emit = defineEmits<{
  (event: 'closeModal', value: boolean): void
  (event: 'changeFlagPriority', value: Priority): void
  (event: 'movePosition', value: Direction): void,
  (event: 'duplicate'): void
  (event: 'delete'): void
}>()

const changeFlagPriority = (value: Priority) => emit('changeFlagPriority', value)
const changeTodoPosition = (position: Direction) => emit('movePosition', position)

</script>

<template>
    <main class="modal-wrapper">
        <div class="modal-wrapper__header-1">
            <span :title="todo.title" class="modal-wrapper__header-1 task__title">Task: {{ todo.title }}</span>
            <div class="modal-wrapper__header-1 task__icon-close" @click="$emit('closeModal', false)">
                <font-awesome-icon icon="fa-xmark"/>
            </div>
        </div>
        <Divider />
        <div class="modal-wrapper__header-2">
            <span class="modal-wrapper__header-2 flags__title">Prioridade</span>
            <div class="modal-wrapper__header-2 flags__icons">
                <div class="modal-wrapper__header-2 flags__icons--icon" @click="changeFlagPriority('deeppink')">
                    <font-awesome-icon icon="fa-flag" width="12" height="12" color="deeppink" />
                </div>
                <div class="modal-wrapper__header-2 flags__icons--icon" @click="changeFlagPriority('orange')">
                    <font-awesome-icon icon="fa-flag" width="12" height="12" color="orange"  />
                </div>
                <div class="modal-wrapper__header-2 flags__icons--icon" @click="changeFlagPriority('yellow')">
                    <font-awesome-icon icon="fa-flag" width="12" height="12" color="yellow"  />
                </div>
                <div class="modal-wrapper__header-2 flags__icons--icon" @click="changeFlagPriority('black')">
                    <font-awesome-icon icon="fa-flag" width="12" height="12" color="black"  />
                </div>
            </div>
        </div>  
        <Divider />
        <div class="modal-wrapper__header-3">
            <div
                :class="`modal-wrapper__header-3 action${(firstPosition || oneElement ? '--disabled': '')}`"
                @click="changeTodoPosition('up')"
            >
                <span class="modal-wrapper__header-3 action--option">Mover para cima</span> 
            </div>
            <div
                :class="`modal-wrapper__header-3 action${(lastPosition || oneElement ? '--disabled': '')}`"
                @click="changeTodoPosition('down')"
            >
                <span class="modal-wrapper__header-3 action--option">Mover para baixo</span>    
            </div>
        </div>
        <Divider />
        <div class="modal-wrapper__header-3">
            <div class="modal-wrapper__header-3 action">
                <span class="modal-wrapper__header-3 action--option">Mostrar descrição</span> 
            </div>
            <div class="modal-wrapper__header-3 action" @click="$emit('duplicate')">
                <span class="modal-wrapper__header-3 action--option">Duplicar</span>    
            </div>
        </div>
        <Divider />
        <div class="modal-wrapper__header-3">
            <div class="modal-wrapper__header-3 action" @click="$emit('delete')">
                <span class="modal-wrapper__header-3 action--option delete">Deletar tarefa</span> 
            </div>
        </div>
    </main>
</template>

<style lang="scss" src="./scss/styles.scss"></style>
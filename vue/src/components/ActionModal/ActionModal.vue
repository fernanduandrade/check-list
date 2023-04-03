<script setup lang="ts">

import { defineProps, withDefaults } from 'vue'
import FontAwesomeIcon from '@/plugins/fa.config'
import Divider from '@/components/Divider/Divider.vue'
import { Priority, Direction, Todo } from '@/common/types'

interface ActionModalProps {
    flag: Priority,
    todo: Todo,
    lastPosition: boolean,
    firstPosition: boolean,
    oneElement: boolean
}

const props = withDefaults(defineProps<ActionModalProps>(), { flag: 'black' })

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
    <main class="modal__wrapper">
        <div class="modal__intro">
            <span :title="todo.title" class="modal__intro__title">Task: {{ todo.title }}</span>
            <div class="modal__intro__icon--close" @click="$emit('closeModal', false)">
                <font-awesome-icon icon="fa-xmark" />
            </div>
        </div>
        <Divider />
        <section class="modal__section-flags">
            <span class="modal__section-flags__title">Prioridade</span>
            <div class="modal__section-flags__icons">
                <div class="modal__section-flags__icons--icon" @click="changeFlagPriority('deeppink')">
                    <font-awesome-icon icon="fa-flag" width="12" height="12" color="deeppink" />
                </div>
                <div class="modal__section-flags__icons--icon" @click="changeFlagPriority('orange')">
                    <font-awesome-icon icon="fa-flag" width="12" height="12" color="orange" />
                </div>
                <div class="modal__section-flags__icons--icon" @click="changeFlagPriority('yellow')">
                    <font-awesome-icon icon="fa-flag" width="12" height="12" color="yellow" />
                </div>
                <div class="modal__section-flags__icons--icon" @click="changeFlagPriority('black')">
                    <font-awesome-icon icon="fa-flag" width="12" height="12" color="black" />
                </div>
            </div>
        </section>
        <Divider />
        <section class="modal__section-actions">
            <div class="modal__section-actions action"
                @click="changeTodoPosition('up')">
                <span :class="`modal__section-actions action__option${(firstPosition || oneElement ? '--disabled' : '')}`">Mover para cima</span>
            </div>
            <div class="`modal__section-actions action"
                @click="changeTodoPosition('down')">
                <span :class="`modal__section-actions action__option${(lastPosition || oneElement ? '--disabled' : '')}`">Mover para baixo</span>
            </div>
        </section>
        <Divider />
        <section class="modal__section-actions">
            <div class="modal__section-actions action">
                <span class="modal__section-actions action__option">Mostrar descrição</span>
            </div>
            <div class="modal__section-actions action" @click="$emit('duplicate')">
                <span class="modal__section-actions action__option">Duplicar</span>
            </div>
        </section>
        <Divider />
        <section class="modal__section-actions">
            <div class="modal__section-actions action" @click="$emit('delete')">
                <span class="modal__section-actions action__option--delete">Deletar tarefa</span>
            </div>
        </section>
    </main>
</template>

<style lang="scss" src="./scss/styles.scss"></style>
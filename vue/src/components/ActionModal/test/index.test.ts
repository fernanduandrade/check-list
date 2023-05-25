import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ActionModal from "../ActionModal.vue";
import { Todo } from '../../../common/types'

describe('Casos de teste para componente de modal de ação', () => {
    it('Modal deve ter a opção de mover para cima desabilitada', async () => {
        
        const todo: Todo = {
            actionOpened: false,
            completed: false,
            editing: false,
            priority:"deeppink",
            id: '23122',
            title: 'Mock todo',
            description: ''
        } 
        
        const wrapper = mount(ActionModal, { props: {
            flag: 'yellow',
            todo,
            lastPosition: false,
            firstPosition: true,
            oneElement: true
        }})

        const moveButton = wrapper.find('move-up')

        expect(moveButton).toBeTruthy()

        expect(moveButton.find('.modal__section-actions action__option--disabled')).toBeTruthy()
    })
})
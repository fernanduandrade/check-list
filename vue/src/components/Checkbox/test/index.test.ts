import { mount, VueWrapper} from "@vue/test-utils";
import { expect, it, describe } from "vitest";
import CheckboxVue from "../Checkbox.vue";
import { ComponentPublicInstance } from "vue";

describe('Casos de teste para o component checkbox', () => {
    const wrapper = mount(CheckboxVue, ({ props: { 
        disabled: false,
        modelValue: true,
        priority: 'orange'
     }}))


     it('Componente deve ter renderizar tag label', () => {
        expect(wrapper.find('label').exists())
     })

     it('Componente deve renderizar uma tag input', () => {
        expect(wrapper.find('input').exists())
     })

     it('Component deve ter a prop disabled com state false', () => {
        expect(wrapper.props('disabled')).toBe(false)
     })

     it('Component deve ter a prop modelVale com state true', () => {
        expect(wrapper.props('modelValue')).toBe(true)
     })

     it('Component deve ter a prop priority com state oragen', () => {
        expect(wrapper.props('priority')).toBe('orange')
     })
})
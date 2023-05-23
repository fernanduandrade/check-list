import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Divider from '../Divider.vue'

describe('Divider component',  () => {
    const wrapper = mount(Divider)
    it('deve montar o componente e possuir hr tag', () => {
        expect(wrapper.find('hr').exists()).toBe(true)
    })

    it('deve possuir cem porcento de largura', () => {
        const element = wrapper.find('hr').element
        const computedStyle = window.getComputedStyle(element)
        expect(computedStyle.display).toBe('block');
    })

    it('deve possuir separetor role atributo para acessibilidade', () => {
        const element = wrapper.find('hr').element
        const role = element.getAttribute('role')
        expect(role).toBe('separator');
    })
})
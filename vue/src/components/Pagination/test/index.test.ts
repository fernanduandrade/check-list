import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Pagination from "../Pagination.vue";


describe('Casos de teste para componente Paginação', () => {
    it('Componente não deve ter opção de voltar e avançar por haver somente uma página', () => {
        const wrapper = mount(Pagination, { props: {
            totalPage: 1,
            hasPreviousPage: false,
            hasNextPage: false,
            currentPage: 1
        } })

        expect(wrapper.find('previous-page').exists()).toBe(false)
        expect(wrapper.find('next-page').exists()).toBe(false)
    })

    it('Componente deve ter opção de voltar e avançar por haver somente uma página', () => {
        const wrapper = mount(Pagination, { props: {
            totalPage: 4,
            hasPreviousPage: true,
            hasNextPage: true,
            currentPage: 1
        } })
        expect(wrapper.find('previous-page').exists()).toBe(true)
        expect(wrapper.find('next-page').exists()).toBe(true)
    })

    it('Emit event deve ter o valor dois, após avançar uma página', async () => {
        const wrapper = mount(Pagination, { props: {
            totalPage: 4,
            hasPreviousPage: true,
            hasNextPage: true,
            currentPage: 1
        } })
        
        await wrapper.find('next-page').trigger('click')
        const emittedvalue = wrapper.emitted('change-page')?.[0][0]
      
      expect(emittedvalue).toBe(2);
    })

    it('Emit event deve ter o valor 4, após voltar uma página', async () => {
        const wrapper = mount(Pagination, { props: {
            totalPage: 9,
            hasPreviousPage: true,
            hasNextPage: true,
            currentPage: 5
        } })
        
        await wrapper.find('previous-page').trigger('click')
        const emittedvalue = wrapper.emitted('change-page')?.[0][0]
      
      expect(emittedvalue).toBe(4);
    })

})
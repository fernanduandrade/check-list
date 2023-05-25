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

})
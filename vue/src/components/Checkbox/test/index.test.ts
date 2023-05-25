import { mount} from "@vue/test-utils";
import { expect, it, describe } from "vitest";
import CheckboxVue from "../Checkbox.vue";

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

     it('Component deve ter a prop modelValue com state false após o click', async () => {
      const checkboxWrapper = mount(CheckboxVue, ({ props: { 
         disabled: false,
         modelValue: true,
         priority: 'yellow'
      }}))

      const input = checkboxWrapper.find('input')
      await input.trigger('click')
      await checkboxWrapper.vm.$nextTick()
      expect(checkboxWrapper.emitted('update:modelValue')).toBeTruthy()
   })

   it('Componente deve emitir o event com o valor false', async () => {
      const wrapperCheckbox = mount(CheckboxVue, {
        props: {
         disabled: false,
         modelValue: true,
         priority: 'yellow'
        },
      });
      
      await wrapperCheckbox.find('input[type="checkbox"]').trigger('click');
      const emittedvalue = wrapperCheckbox.emitted('update:modelValue')?.[0][0]
      
      expect(emittedvalue).toBe(false);
    });

    it('Componente não deve emitir o event se a prop disabled for true', async () => {
      const wrapperCheckbox = mount(CheckboxVue, {
        props: {
         disabled: true,
         modelValue: false,
         priority: 'yellow'
        },
      });
      
      await wrapperCheckbox.find('input[type="checkbox"]').trigger('click');
      const emittedvalue = wrapperCheckbox.emitted('update:modelValue')?.[0][0]
      
      expect(emittedvalue).toBe(undefined);
    });
})
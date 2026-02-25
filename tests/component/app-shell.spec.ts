import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import AppHeader from '~/components/app/AppHeader.vue'

describe('AppHeader', () => {
  it('renders primary navigation links', () => {
    const wrapper = mount(AppHeader, {
      global: {
        stubs: {
          NuxtLink: { template: '<a><slot /></a>' }
        }
      }
    })
    expect(wrapper.text()).toContain('Home')
    expect(wrapper.text()).toContain('Cards')
    expect(wrapper.text()).toContain('Ratings')
  })
})

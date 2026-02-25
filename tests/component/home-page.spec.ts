import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import HomePage from '~/pages/index.vue'

describe('home page', () => {
  it('renders hero and latest posts section', () => {
    const wrapper = mount(HomePage, {
      global: {
        stubs: {
          NuxtLink: { template: '<a><slot /></a>' }
        }
      }
    })

    expect(wrapper.text()).toContain('Dune Imperium')
    expect(wrapper.text()).toContain('Latest News')
  })
})

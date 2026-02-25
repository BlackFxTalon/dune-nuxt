import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import FaqPage from '~/pages/faq.vue'

describe('faq page', () => {
  it('renders FAQ heading', () => {
    const wrapper = mount(FaqPage)
    expect(wrapper.text()).toContain('FAQ')
  })
})

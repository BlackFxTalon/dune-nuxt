import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import RichContent from '~/components/content/RichContent.vue'

describe('RichContent', () => {
  it('renders markdown body container', () => {
    const wrapper = mount(RichContent, { props: { body: '## Test' } })
    expect(wrapper.html()).toContain('Test')
  })
})

import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AppLogo from '../AppLogo.vue'

describe('AppLogo', () => {
  it('renders properly', () => {
    const wrapper = mount(AppLogo, { props: { text: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})

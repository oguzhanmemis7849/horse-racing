import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HorseComponent from '@/components/HorseComponent.vue'
import Horse1 from '@/components/svg/Horse1SVG.vue'
import Horse2 from '@/components/svg/Horse2SVG.vue'
import Horse3 from '@/components/svg/Horse3SVG.vue'
import Horse4 from '@/components/svg/Horse4SVG.vue'

describe('HorseComponent', () => {
  it('renders properly with provided props', () => {
    const props = {
      animation: false,
      color: '#FF0000'
    }
    const wrapper = mount(HorseComponent, { props })

    // check horse1 svg
    const horse1 = wrapper.findComponent(Horse1)
    expect(horse1.exists()).toBe(true)
    expect(horse1.props('color')).toBe(props.color)

    // check animation
    expect(wrapper.find('.frame-1').classes()).not.toContain('animate')
    expect(wrapper.findComponent(Horse2).exists()).toBe(false)
    expect(wrapper.findComponent(Horse3).exists()).toBe(false)
    expect(wrapper.findComponent(Horse4).exists()).toBe(false)
  })

  it('renders animation frames when animation is true', async () => {
    const props = {
      animation: true,
      color: '#FF0000'
    }
    const wrapper = mount(HorseComponent, { props })

    // check horse1 svg
    const horse1 = wrapper.findComponent(Horse1)
    expect(horse1.exists()).toBe(true)
    expect(horse1.props('color')).toBe(props.color)

    // check animation
    expect(wrapper.find('.frame-1').classes()).toContain('animate')
    expect(wrapper.findComponent(Horse2).exists()).toBe(true)
    expect(wrapper.findComponent(Horse3).exists()).toBe(true)
    expect(wrapper.findComponent(Horse4).exists()).toBe(true)

    // check Horse2, Horse3, Horse4
    const horse2 = wrapper.findComponent(Horse2)
    const horse3 = wrapper.findComponent(Horse3)
    const horse4 = wrapper.findComponent(Horse4)

    expect(horse2.props('color')).toBe(props.color)
    expect(horse3.props('color')).toBe(props.color)
    expect(horse4.props('color')).toBe(props.color)
  })
})

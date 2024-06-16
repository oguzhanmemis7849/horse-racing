import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TableComponent from '@/components/TableComponent.vue'

describe('TableComponent', () => {
  it('renders properly with provided props', () => {
    const props = {
      list: [{ name: 'Test', condition: 80, colorName: 'Red', color: '#FF0000' }],
      columns: [
        { field: 'name', header: 'Name', sortable: true },
        { field: 'condition', header: 'Condition', sortable: true }
      ],
      title: 'Test Table',
      subTitle: 'Test Subtitle',
      subTitleBackgroundColor: '#FF0000',
      titleBackgroundColor: '#FF0000',
      tableHeaderBackgroundColor: '#FF0000',
      rowSize: 'large' as 'large' | 'small'
    }
    const wrapper = mount(TableComponent, { props })
    expect(wrapper.text()).toContain('Test Table')
    expect(wrapper.text()).toContain('Test')
    expect(wrapper.text()).toContain('80')
  })
})

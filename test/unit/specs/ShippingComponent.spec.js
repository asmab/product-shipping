import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import ShippingComponent from '@/components/ShippingComponent'

describe('Shipping component', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(ShippingComponent)
    })

    it('Shipping component looks as expected', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})

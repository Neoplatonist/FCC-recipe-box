import React from 'react'
import ReactDOM from 'react-dom'
import Main from './index'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import localStorageMock from '../../localStorageMock'

configure({ adapter: new Adapter() });

beforeEach(() => {
  return window.localStorage.clear()
})

describe('Recipe List', () => {
  it('can add recipe via button', () => {
    const wrapper = shallow(<Main />)
    const recipes = [{name: 'test', recipe: 'data' }]

    wrapper.setState({ name: 'test', recipe: 'data' })
    wrapper.find('button[name="submitRecipe"]').simulate('click')

    expect(wrapper.state().recipes).toEqual(recipes)
  })

  it('wont allow blank entries', () => {
    const wrapper = shallow(<Main />)
    const recipes = [{name: 'test', recipe: 'data' }]
    
    // click 1
    wrapper.setState({ name: 'test', recipe: 'data' })
    wrapper.find('button[name="submitRecipe"]').simulate('click')
    //click 2
    wrapper.find('button[name="submitRecipe"]').simulate('click')

    expect(wrapper.state().recipes).toEqual(recipes)
  })

  it('can have multiple recipes', () => {
    const wrapper = shallow(<Main />)
    const recipes = [
      {name: 'test', recipe: 'data'},
      {name: 'data', recipe: 'test'}
    ]

    // click 1
    wrapper.setState({ name: 'test', recipe: 'data' })
    wrapper.find('button[name="submitRecipe"]').simulate('click')
 
    //click 2
    wrapper.setState({ name: 'data', recipe: 'test' })
    wrapper.find('button[name="submitRecipe"]').simulate('click')

    expect(wrapper.state().recipes).toEqual(recipes)
  })
})

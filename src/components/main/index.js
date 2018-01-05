import React, {Component} from 'react'
import Item from './components/item'
import RecipeBox from './components/recipebox'

export default class Main extends Component {
  constructor(props) {
    super(props)

    this._recipeName = this._recipeName.bind(this)
    this._recipeDesc = this._recipeDesc.bind(this)
    this._addRecipe = this._addRecipe.bind(this)
    this._handleClicked = this._handleClicked.bind(this)
    this._handleCancel = this._handleCancel.bind(this)
    
    this.state = {
      edit: false,
      name: '',
      recipe: '',
      recipes: [],
      showRecipe: {
        name: '',
        recipe: ''
      }
    }
  }

  componentWillMount() {
    const storage = localStorage.getItem('recipeList')

    if (storage != null) {
      this.setState({recipes: JSON.parse(storage)})
    }
  }

  componentWillUpdate(nextProps, nextState) {
    // if (nextState.recipes === this.state.recipes) {
      return false
    // }
  }

  _addRecipe() {
    const recipe = {
      name: this.state.name,
      recipe: this.state.recipe
    }

    if (this.state.name === '' || this.state.recipe === '') {
      return false
    }

    let recipes = this.state.recipes
    if (this.state.edit === false) {
      recipes.push(recipe)
    } else {
      recipes.forEach((v, k) => {
        if (k === this.state.index) {
          recipes[k] = recipe
        }
      })
    }

    this.setState({
      edit: false,
      index: null,
      recipes: recipes
    })

    this.setState({name: '', recipe: ''})

    localStorage.setItem('recipeList', JSON.stringify(recipes))
  }

  _listItems() {
    console.log('rendered')
    return this.state.recipes.map((v, k) => {
      return <Item 
                key={'recipe-'+k} 
                index={k}
                item={v} 
                clicked={this._handleClicked}
             />
    })
  }

  _recipeName(e) {
    this.setState({name: e.target.value})
  }

  _recipeDesc(e) {
    this.setState({recipe: e.target.value})
  }

  _handleClicked(e) {
    switch (e.type) {
      case 'show':
        const showRecipe = {
          name: e.item.name,
          recipe: e.item.recipe
        }

        this.setState({showRecipe: showRecipe})
        break

      case 'edit':
        this.setState({
          edit: true,
          index: e.index,
          name: e.item.name,
          recipe: e.item.recipe
        })
        break

      case 'delete':
        let crispy = this.state.recipes

        crispy.forEach((v, k) => {
          if (v.name === e.item.name) {
            crispy.splice(k, 1)
          }
        })

        this.setState({recipes: crispy})
        localStorage.setItem('recipeList', JSON.stringify(crispy))
        break
    
      default:
        break
    }

    // this.setState({showRecipe: e})
  }

  _handleCancel() {
    this.setState({
      edit: false,
      name: '',
      recipe: ''
    })
  }

  render() {
    return(
      <main>
        {/* input until saved/entered afterwards turns into a link */}
        <div className="row titles">
          <div className="col">
            <h3>
              { !this.state.edit ? 'Create Recipe' : 'Edit Recipe' }
              { this.state.edit ? <button onClick={this._handleCancel}>cancel</button> : ''}
            </h3>
          </div>

          <div className="col">
            <h3>Recipe List</h3>
          </div>
        </div>

        <div className="row">
          <div className="col recipe-add">
            <input 
              name="recipeName" 
              type="text" 
              onChange={this._recipeName}
              value={this.state.name}
              maxLength="30"
              required/>

            <textarea 
              name="recipeDesc"
              cols="30" 
              rows="10"
              onChange={this._recipeDesc}
              value={this.state.recipe}
              maxLength="500"
              required>
            </textarea>

            <button name="submitRecipe" onClick={this._addRecipe}>{ !this.state.edit ? 'Add' : 'Update' }</button>
          </div>

          <div className="col recipe-list">
            <ul id="recipe-name">
              {this._listItems()}
            </ul>
          </div>
        </div>

        <div className="row">
          <div className="col recipe-box">
            <h3 className="center">Recipe</h3>

            <RecipeBox item={this.state.showRecipe}/>
          </div>
        </div>
      </main>
    )
  }
}
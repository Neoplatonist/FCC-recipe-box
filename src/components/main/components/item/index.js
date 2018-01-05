import React, {Component} from 'react'

export default class Item extends Component {
  _handleClick(e) {
    const event = {
      index: this.props.index,
      item: this.props.item,
      type: e
    }

    this.props.clicked(event)
  }

  render() {
    return (
      <li className="clear">
        <h4 onClick={this._handleClick.bind(this, 'show')}>
          {this.props.item.name}
        </h4>

        <p>
          <span onClick={this._handleClick.bind(this, 'edit')}>edit</span> | 
          <span onClick={this._handleClick.bind(this, 'delete')}>delete</span>
        </p>
      </li>
    )
  }
}
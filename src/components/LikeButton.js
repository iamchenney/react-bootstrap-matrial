import React, {Component} from 'react'
import {render} from 'react-dom'

export default class LikeButton extends Component {
  constructor (props) {
    super(props)
    this.state = {liked: false}
  }

  defaultProps = {
    initialCount: 0
  }

  handleLike(e) {
    this.setState({liked: !this.state.liked})
  }

  render() {
    const text = this.state.liked? 'like' : 'haven\'t liked'

    return (
      <p onClick={this.handleLike.bind(this)}>
        You {text} this. Click to toggle.
      </p>
    )
  }
}

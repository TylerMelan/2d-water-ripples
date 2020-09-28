import React from 'react';
import ripples from '../sketches/ripples4'
import p5 from 'p5';

class Ripples extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }

  componentDidMount() {
    this.myP5 = new p5(ripples, this.myRef.current)
  }

  render() {
    return (
      <div ref={this.myRef}>

      </div>
    )
  }
}

export default Ripples
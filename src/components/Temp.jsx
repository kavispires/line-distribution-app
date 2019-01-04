import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Test extends Component {
  componentDidMount() {
    // nothing
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Test</h1>
        <textarea readOnly value={this.props.temp.test1} />
        <textarea readOnly value={this.props.temp.test2} />
        <textarea readOnly value={this.props.temp.test3} />
        <textarea readOnly value={JSON.stringify(this.props.temp.test4)} />
        <textarea readOnly value={JSON.stringify(this.props.temp.test5)} />
        <button onClick={() => this.props.testFunction1()}>
          Run Test Function
        </button>
      </div>
    );
  }
}

Test.propTypes = {
  test1: PropTypes.string.isRequired,
  test2: PropTypes.number.isRequired,
  test3: PropTypes.bool.isRequired,
  test4: PropTypes.array.isRequired,
  test5: PropTypes.object.isRequired,
  testFunction1: PropTypes.func.isRequired,
};

Test.defaultProps = {};

export default Test;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Test extends Component {
  componentDidMount() {
    // nothing
  }
  render() {
    console.log(this.props);

    const stringify = json =>
      JSON.stringify(JSON.parse(JSON.stringify(json)), null, 2);

    return (
      <main className="container">
        <h1>Test/Temp</h1>
        <div className="textareas">
          <textarea readOnly value={stringify(this.props.temp.test1)} />
          <textarea readOnly value={stringify(this.props.temp.test2)} />
          <textarea readOnly value={stringify(this.props.temp.test3)} />
          <textarea readOnly value={stringify(this.props.temp.test4)} />
          <textarea readOnly value={stringify(this.props.temp.test5)} />
        </div>
        <div className="buttons">
          <button onClick={() => this.props.testFunction1()}>
            Run Test Function1
          </button>
          <button onClick={() => this.props.testFunction2()}>
            Run Test Function2
          </button>
        </div>
      </main>
    );
  }
}

Test.propTypes = {
  temp: PropTypes.object.isRequired,
  test1: PropTypes.string.isRequired,
  test2: PropTypes.number.isRequired,
  test3: PropTypes.bool.isRequired,
  test4: PropTypes.array.isRequired,
  test5: PropTypes.object.isRequired,
  testFunction1: PropTypes.func.isRequired,
  testFunction2: PropTypes.func.isRequired,
};

Test.defaultProps = {};

export default Test;

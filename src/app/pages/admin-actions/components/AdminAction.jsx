import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import common components
import { LoadingIcon } from '../../../common';
// Import utility functions
import utils from '../../../../utils';

class AdminAction extends Component {
  constructor() {
    super();
    this.state = {
      code: '',
      isDisabled: true,
    };

    this.generateCode = this.generateCode.bind(this);
    this.performAction = this.performAction.bind(this);
    this.verifyCode = this.verifyCode.bind(this);
  }

  componentDidMount() {
    this.generateCode();
  }

  generateCode() {
    const code = utils.generateAdminCode();
    const isDisabled = true;
    this.setState({ code, isDisabled });
  }

  verifyCode(e) {
    const { value } = e.target;
    if (this.state.code === value) {
      this.setState({
        isDisabled: false,
      });
    }
  }

  performAction() {
    if (!this.state.isDisabled) {
      this.props.action();
      this.generateCode();
    }
  }

  render() {
    const { pending, title, children, actionName } = this.props;

    return (
      <div className="actions-item">
        <h3>{title}</h3>
        {children}
        <div className="actions-code">
          {pending ? <LoadingIcon size="tiny" /> : this.state.code}
        </div>
        <input
          type="text"
          className="actions-code-input"
          maxLength="4"
          onChange={this.verifyCode}
        />

        <button
          className="btn"
          disabled={this.state.isDisabled}
          onClick={this.performAction}
        >
          {pending ? <LoadingIcon size="small" /> : actionName}
        </button>
      </div>
    );
  }
}

AdminAction.propTypes = {
  pending: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  action: PropTypes.func.isRequired,
  actionName: PropTypes.string.isRequired,
};

AdminAction.defaultProps = {
  pending: false,
};

export default AdminAction;

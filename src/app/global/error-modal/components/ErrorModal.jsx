import React from 'react';
import PropTypes from 'prop-types';

// Import common components
import { Icon } from '../../../common/index';

const ErrorModal = ({ app, handleCloseErrorModal, handleSendBugReport }) => {
  if (app.error) {
    return (
      <div className="modal-error">
        <main className="modal-error__content">
          <button className="close" onClick={handleCloseErrorModal}>
            ×
          </button>
          <Icon type="error" color="red" size="96" />
          <h1>AN ERROR HAS OCURRED</h1>
          <h3 className="modal-error__error-message">{app.errorMessage}</h3>
          <h4>
            You may close this modal, but the website might not work as
            expected.
          </h4>
          <button className="btn" onClick={handleSendBugReport}>
            Send Bug Report
          </button>
        </main>
      </div>
    );
  }

  return null;
};

ErrorModal.propTypes = {
  app: PropTypes.object.isRequired,
  handleCloseErrorModal: PropTypes.func.isRequired,
  handleSendBugReport: PropTypes.func.isRequired,
};

export default ErrorModal;

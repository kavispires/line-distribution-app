import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import shared components
import { Icon } from '../../common';

class Collapsible extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };

    this.collapse = this.collapse.bind(this);
    this.enforceProperties = this.enforceProperties.bind(this);
    this.expand = this.expand.bind(this);
    this.togglePanel = this.togglePanel.bind(this);
  }

  componentDidMount() {
    this.enforceProperties();
  }

  componentDidUpdate(nextProps) {
    if (
      this.props.synced &&
      (nextProps.expanded !== this.props.expanded ||
        nextProps.collapsed !== this.props.collapsed)
    ) {
      this.enforceProperties();
    }
  }

  enforceProperties() {
    if (this.props.expanded) {
      this.expand();
    }
    if (this.props.collapsed) {
      this.collapse();
    }
  }

  togglePanel() {
    if (!this.props.locked) {
      this.setState({
        expanded: !this.state.expanded,
      });
    }
  }

  expand() {
    this.setState({
      expanded: true,
    });
  }

  collapse() {
    this.setState({
      expanded: false,
    });
  }

  render() {
    const { title, locked } = this.props;

    let iconComponent = null;
    if (locked) {
      iconComponent = <Icon type="lock" color="gray" />;
    } else if (this.state.expanded) {
      iconComponent = <Icon type="chevron-up" color="gray" />;
    } else {
      iconComponent = <Icon type="chevron-down" color="gray" />;
    }

    return (
      <section className="collapsible">
        <button
          className={`collapsible__header ${locked ? 'locked' : ''}`}
          disabled={locked}
          onClick={this.togglePanel}
        >
          <h3 className="collapsible__title">{title}</h3>
          <span className="collapsible__icon">{iconComponent}</span>
        </button>
        <div
          className={`collapsible__content ${
            this.state.expanded ? 'expanded' : 'collapsed'
          }`}
        >
          {this.state.expanded && this.props.children}
        </div>
      </section>
    );
  }
}

Collapsible.propTypes = {
  children: PropTypes.any.isRequired,
  collapsed: PropTypes.bool,
  expanded: PropTypes.bool,
  locked: PropTypes.bool,
  synced: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

Collapsible.defaultProps = {
  collapsed: false,
  expanded: false,
  locked: false,
  synced: false,
};

export default Collapsible;

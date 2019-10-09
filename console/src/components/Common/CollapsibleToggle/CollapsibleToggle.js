import React, { Component } from 'react';

const styles = require('./CollapsibleToggle.scss');

/**
 *  Accepts following props
 *    `title, string || react-element `: Title of the collapsible toggle
 *    `isOpen`(optional, default to false): Whether the body should be shown or not
 *    `toggleHandler (optional)`: Function to call when the toggle is clicked
 *    `testId, string`: Test identifier
 *    `children, react-element`: The content which needs to be toggled
 */

class CollapsibleToggle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.isOpen || false,
      toggleHandler:
        props.toggleHandler || this.defaultToggleHandler.bind(this),
    };
  }

  defaultToggleHandler() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  componentWillReceiveProps({ isOpen, toggleHandler }) {
    if (toggleHandler) {
      this.setState({
        isOpen,
        toggleHandler,
      });
    }
  }

  render() {
    const { title, children, testId, useDefaultTitleStyle } = this.props;

    const { isOpen, toggleHandler } = this.state;

    const getTitle = () => {
      if (useDefaultTitleStyle) {
        return <div className={styles.defaultCollapsibleTitle}>{title}</div>;
      }
      return title;
    };

    const getChildren = () => {
      return <div className={styles.collapsibleContent}>{children}</div>;
    };

    return (
      <div className={styles.collapsibleWrapper}>
        <div
          className={styles.collapsibleToggle}
          data-test={testId}
          onClick={toggleHandler}
        >
          <span className={styles.collapsibleIndicatorWrapper}>
            <i
              className={`fa fa-chevron-right ${
                styles.collapsibleIndicator
              } ${isOpen && styles.collapsibleIndicatorOpen}`}
            />
          </span>

          <span className={styles.titleWrapper}>{getTitle()}</span>
        </div>

        {isOpen && getChildren()}
      </div>
    );
  }
}

export default CollapsibleToggle;

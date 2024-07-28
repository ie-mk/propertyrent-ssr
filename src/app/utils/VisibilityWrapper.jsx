import React from 'react';
import PropTypes from 'prop-types';

const watchers = new Map();

const intersectionObserver =
  typeof window !== 'undefined' &&
  typeof IntersectionObserver === 'function' &&
  typeof IntersectionObserverEntry === 'function' &&
  new window.IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (watchers.has(target) && isIntersecting) {
        const cb = watchers.get(target);
        watchers.delete(target);
        cb();
      }
    });
  });

const whenVisible = (element, cb) => {
  watchers.set(element, cb);
  intersectionObserver.observe(element);
};

const removeWatcher = element => {
  intersectionObserver.unobserve(element);
  watchers.delete(element);
};

class VisibilityWrapper extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
    callback: PropTypes.func,
    wrapper: PropTypes.node.isRequired,
  };

  static defaultProps = {
    wrapper: 'div',
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.reactToVisibility = this.reactToVisibility.bind(this);
    this.lastRef = React.createRef();
  }

  componentDidMount() {
    if (intersectionObserver) {
      whenVisible(this.lastRef.current, this.reactToVisibility);
    } else {
      this.setState({ visible: true });
    }
  }

  componentWillUnmount() {
    if (intersectionObserver) {
      removeWatcher(this.lastRef.current);
    }
  }

  reactToVisibility() {
    removeWatcher(this.lastRef.current);
    this.props.callback();
  }

  render() {
    const { wrapper: Component } = this.props;
    return (
      <Component className="visibility-wrapper" ref={this.lastRef}>
        {this.props.children}
      </Component>
    );
  }
}

export default VisibilityWrapper;

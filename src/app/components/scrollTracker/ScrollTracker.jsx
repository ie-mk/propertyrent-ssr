import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import { layoutActions } from '../../store/actions';

const ScrollTracker = ({ children, dispatch }) => {
  const handleScroll = useCallback(
    debounce(() => {
      dispatch(layoutActions.setScrollFromTop(window.pageYOffset));
    }, 500),
  );

  useEffect(() => {
    window && window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div data-test="scroll-tracker">{children}</div>;
};

export default connect()(ScrollTracker);

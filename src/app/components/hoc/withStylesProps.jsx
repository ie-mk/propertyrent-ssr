import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import hoistNonReactStatics from "hoist-non-react-statics";
import getDisplayName from "../../utils/get-display-name";

// this concept NOT WORKING with JSS
// as it need to epxort styles and insert them
// into a body

export default styles => Component => {
  return props => {
    const stylesWithProps = theme => {
      console.log("----im themeee: ", theme);
      debugger;
      return styles.call(null, theme, props);
    };

    console.log("----props: ", props);
    console.log("----Component: ", Component);
    console.log("----styles: ", styles);

    const WithStylesProps = withStyles(stylesWithProps)(Component);

    WithStylesProps.displayName = `withStylesProps(${getDisplayName(
      Component
    )})`;

    hoistNonReactStatics(WithStylesProps, Component);

    WithStylesProps.WrappedComponent = Component;

    return <WithStylesProps {...props} />;
  };
};

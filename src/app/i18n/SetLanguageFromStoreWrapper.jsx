import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

// could not find information how to set language on page load on the docs
const SetLanguageFromStoreWrapper = ({ children, userLanguage }) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    userLanguage && i18n.changeLanguage(userLanguage);
  }, [userLanguage]);

  return <div data-test="user-language-wrapper">{children}</div>;
};

const mapStateToProps = state => ({
  userLanguage: state.user.userLanguage,
});

export default connect(mapStateToProps)(SetLanguageFromStoreWrapper);

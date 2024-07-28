import React from 'react';
import { connect } from 'react-redux';

const About = ({ store }) => (
  <p>{`This is the about page MMMM with store: ${JSON.stringify(store)}`} </p>
);

About.getInitialProps = async ctx => {
  return { store: ctx.store };
};

export default About;

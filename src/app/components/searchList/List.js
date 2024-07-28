import React from 'react';
import ListItem from './ListItem/ListItem';
import { connect } from 'react-redux';

const List = ({ admin, ads, favourites }) => {
  if (!ads || !Object.keys(ads).length) return null;

  const items = Object.values(ads);
  const ids = Object.keys(ads);
  return items.map((item, idx) => {
    return (
      <ListItem
        key={idx}
        data={item}
        admin={admin}
        id={ids[idx]}
        favourite={favourites[ids[idx]]}
      />
    );
  });
};

const mapStateToProps = state => ({
  favourites: state.user && state.user.favourites,
});
export default connect(mapStateToProps)(List);

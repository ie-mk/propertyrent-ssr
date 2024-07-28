import React, { useState } from 'react';
import { connect } from 'react-redux';
import Styled from '../List.styles';
import Router from 'next/router';
import { adActions, mapActions, userActions } from '../../../store/actions';
import { getNumberOfDays } from '../../../utils/utils';
import { getSelectedDateSelector } from '../../../store/selectors';
import ResponsiveImage from '../../foundation/ResponsiveImage';

const ListItem = ({
  data,
  id,
  activeMapItemId,
  admin,
  dispatch,
  filterValues,
  favourite,
  favourites,
  user,
  selectedDates: { startDate, endDate },
}) => {
  let numberOfDays = getNumberOfDays(startDate, endDate);

  let numberOfPeople =
    filterValues && filterValues.values && filterValues.values.numberOfPeople;

  const amenities = data && data.amenities;

  const amenitieskeys = (amenities && Object.keys(amenities)) || [];

  const [hover, setHover] = useState(false);
  let amenitiesData = amenitieskeys.map((index, i) => {
    if (amenitieskeys.length > 0) {
      return (
        <span key={i}>
          {' '}
          {i > 0 ? <>•</> : null} {amenitieskeys[i]}
        </span>
      );
    }
  });
  const handleRedirect = id => {
    if (!admin) {
      const url = `/ad?id=${id}`;
      Router.push(url, url, { shallow: true });
      dispatch(adActions.setActiveAdId(id));
    }
  };

  const mouseHover = id => {
    dispatch(mapActions.setHoveredListItemId(id));
    setHover(true);
  };
  const mouseLeave = () => {
    dispatch(mapActions.setHoveredListItemId(null));
    setHover(false);
  };

  const images = data && data.images;

  return (
    <Styled.ListItemWrapper
      data-test="results-item"
      highlighted={activeMapItemId === id}
      favourite={favourite}
      hover={hover}
      onClick={() => handleRedirect(id)}
      onMouseEnter={() => mouseHover(id)}
      onMouseLeave={() => mouseLeave()}
    >
      <ResponsiveImage width="50%" src={images && images[0]} />
      <Styled.Content>
        <Styled.FavouritesIcon favourite={favourite}>
          <i
            data-test={`ad-to-favourites${favourite ? '-active' : ''}`}
            className={`fa fa-heart${favourite ? '' : '-o'}`}
            onClick={e => {
              e.stopPropagation();
              dispatch(
                userActions.adToFavourites({
                  [id]: !favourite,
                }),
              );

              if (user && user.uid) {
                dispatch(
                  userActions.updateUserProfile.request({
                    uid: user.uid,
                    favourites,
                  }),
                );
              }
            }}
          />
        </Styled.FavouritesIcon>
        <Styled.Description>
          <Styled.DescriptionRow>{data && data.type}</Styled.DescriptionRow>
          <Styled.DescriptionRow>
            <strong>{data && data.title}</strong>
          </Styled.DescriptionRow>
          <Styled.DescriptionRow>
            {numberOfPeople} Guests • {data && data.bedrooms} Bed rooms •{' '}
            {data && data.bathrooms} bathroom
          </Styled.DescriptionRow>
          <Styled.DescriptionRow>{amenitiesData}</Styled.DescriptionRow>
          <Styled.PricingContainer>
            <Styled.DescriptionRow>
              <strong>£{data && data.price_per_night} / night</strong>
            </Styled.DescriptionRow>
            {!admin ? (
              <Styled.PricingTotal>
                <Styled.DescriptionRow>
                  £{data && data.price_per_night * numberOfDays} total
                </Styled.DescriptionRow>
              </Styled.PricingTotal>
            ) : null}
          </Styled.PricingContainer>

          {admin && (
            <Styled.CustomButton
              onClick={() => {
                const url = `/edit?id=${id}`;
                Router.push(url, url, { shallow: true });
                debugger;
              }}
            >
              EDIT
            </Styled.CustomButton>
          )}
        </Styled.Description>
        {data && data.rating_total_nr ? (
          <Styled.RatingContainer>
            <i className="fa fa-star" aria-hidden="true" />
            <strong>{data && data.rating_average}</strong>(
            {data && data.rating_total_nr})
          </Styled.RatingContainer>
        ) : null}
      </Styled.Content>
    </Styled.ListItemWrapper>
  );
};

const mapStateToProps = state => ({
  activeMapItemId: state.map.activeMapItemId,
  filterValues: state.form && state.form.filter,
  user: state.user.loginProviderData,
  favourites: state.user.favourites,
  selectedDates: getSelectedDateSelector(state),
});

export default connect(mapStateToProps)(ListItem);

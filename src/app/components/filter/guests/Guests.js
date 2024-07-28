import React from 'react';
import Styled from './Guests.styles';
import CircleButton from '../../button/circleButton/CircleButton';
import { change, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

let Guests = props => {
  const {
    dispatch,
    handleSubmit,
    initialValues: { adults, children, infants },
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Styled.GuestDetails>
        <Styled.NumberOfGuests>
          <Styled.TypeOfGuest>
            <div>Adults</div>
          </Styled.TypeOfGuest>
          <div>
            <CircleButton
              disabled={adults === 0 && true}
              clickHandler={() => {
                dispatch(change('filter', 'adults', adults - 1));
              }}
            >
              <i className="fa fa-minus" aria-hidden="true" />
            </CircleButton>
            {adults}
            <CircleButton
              disabled={false}
              clickHandler={() => {
                dispatch(change('filter', 'adults', adults + 1));
              }}
            >
              <i className="fa fa-plus" aria-hidden="true" />
            </CircleButton>
          </div>
        </Styled.NumberOfGuests>
        <Styled.NumberOfGuests>
          <Styled.TypeOfGuest>
            <div>Children</div>
            <div>Ages 2-12</div>
          </Styled.TypeOfGuest>
          <div>
            <CircleButton
              disabled={children === 0 && true}
              clickHandler={() => {
                dispatch(change('filter', 'children', children - 1));
              }}
            >
              <i className="fa fa-minus" aria-hidden="true" />
            </CircleButton>
            {children}
            <CircleButton
              disabled={false}
              clickHandler={() => {
                dispatch(change('filter', 'children', children + 1));
              }}
            >
              <i className="fa fa-plus" aria-hidden="true" />
            </CircleButton>
          </div>
        </Styled.NumberOfGuests>

        <Styled.NumberOfGuests>
          <Styled.TypeOfGuest>
            <div>infants</div>
            <div>Under 2</div>
          </Styled.TypeOfGuest>
          <div>
            <CircleButton
              disabled={infants === 0 && true}
              clickHandler={() => {
                dispatch(change('filter', 'infants', infants - 1));
              }}
            >
              <i className="fa fa-minus" aria-hidden="true" />
            </CircleButton>
            {infants}
            <CircleButton
              disabled={false}
              clickHandler={() => {
                dispatch(change('filter', 'infants', infants + 1));
              }}
            >
              <i className="fa fa-plus" aria-hidden="true" />
            </CircleButton>
          </div>
        </Styled.NumberOfGuests>
      </Styled.GuestDetails>
    </form>
  );
};

const initial = {
  adults: 0,
  children: 0,
  infants: 0,
};

const mapStateToProps = state => {
  const stateValues = state.form.filter && state.form.filter.values;
  return {
    initialValues: stateValues ? { ...initial, ...stateValues } : initial,
  };
};

Guests = reduxForm({
  form: 'filter', // a unique identifier for this form
  enableReinitialize: true,
  destroyOnUnmount: false,
  onSubmit: () => {},
})(Guests);

Guests = connect(mapStateToProps)(Guests);

export default Guests;

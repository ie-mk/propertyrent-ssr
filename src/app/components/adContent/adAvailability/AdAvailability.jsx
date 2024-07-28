import React, { useState } from 'react';
import { ContainerBase, Grid } from '../../foundation/index';
import { paddingMap } from '../../../constants/styles';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import Styled from './AdAvailability.styles';
import { connect } from 'react-redux';
import { reduxForm, change } from 'redux-form';
import VisibilityWrapper from '../../../utils/VisibilityWrapper';
import AdDateRangePicker from '../adDateRangePicker/AdDateRangePicker';
import {
  getDateRangeSelector,
  getNumberOfPeople,
} from '../../../store/selectors';

let AdAvailability = ({ item, dispatch, dateRange, numberOfPeople }) => {
  const [people, setPeople] = useState(numberOfPeople);
  const [showDatePicker, setShowDatePicker] = useState(false);

  if (!item) return null;

  let startDate = dateRange && dateRange.startDate;
  startDate = startDate && moment(startDate);

  let endDate = dateRange && dateRange.endDate;
  endDate = endDate && moment(endDate);

  let max_nr_of_guests = item.max_nr_of_guests;

  const options = [];

  for (let i = 0; i <= max_nr_of_guests; i++) {
    options.push(
      <option key={`max-guests-${i}`} value={i}>
        {i}
      </option>,
    );
  }

  let sDate = moment(startDate).format('DD/MM/YYYY');
  let eDate = moment(endDate).format('DD/MM/YYYY');

  return (
    <ContainerBase>
      <h2>Availability</h2>
      <Grid
        columns="2fr 1fr"
        gridGap={paddingMap.sm}
        mediaColConfig={{ belowTablet: '1fr' }}
      >
        <VisibilityWrapper
          callback={() => {
            setShowDatePicker(true);
          }}
        >
          {showDatePicker && <AdDateRangePicker item={item} />}
        </VisibilityWrapper>
        <div>
          <Styled.PriceRange>
            <Styled.PriceContainer>
              <Styled.TextContainer disabled={true} width="50%">
                Check-in
                <div>{sDate}</div>
              </Styled.TextContainer>

              <Styled.TextContainer>
                Checkout
                <div>{eDate}</div>
              </Styled.TextContainer>
            </Styled.PriceContainer>
          </Styled.PriceRange>

          <Styled.PriceContainer>
            <Styled.TextContainer width="100%">
              Guests
              <Styled.Select
                value={people}
                onChange={e => {
                  setPeople(e.target.value);
                  dispatch(change('filter', 'numberOfPeople', e.target.value));
                }}
              >
                {options}
              </Styled.Select>
            </Styled.TextContainer>
          </Styled.PriceContainer>
        </div>
      </Grid>
    </ContainerBase>
  );
};

const mapStateToProps = state => {
  return {
    dateRange: getDateRangeSelector(state),
    numberOfPeople: getNumberOfPeople(state),
  };
};

AdAvailability = reduxForm({
  form: 'filter', // a unique identifier for this form
  enableReinitialize: true,
  destroyOnUnmount: false,
  onSubmit: () => {},
})(AdAvailability);

AdAvailability = connect(mapStateToProps)(AdAvailability);

export default AdAvailability;

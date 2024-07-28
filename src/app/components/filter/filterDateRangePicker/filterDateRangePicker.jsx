import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { change } from 'redux-form';
import { DayPickerRangeController, isInclusivelyBeforeDay } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import { getSelectedDateSelector } from '../../../store/selectors';

const Wrapper = styled.div`
  position: relative;
`;

const FilterDateRangePicker = ({
  dateRange: { startDate, endDate },
  dispatch,
}) => {
  const [focused, setFocused] = useState('startDate');

  return (
    <Wrapper>
      <DayPickerRangeController
        startDate={startDate || null} // momentPropTypes.momentObj or null,
        // PropTypes.string.isRequired,
        endDate={endDate || null} // momentPropTypes.momentObj or null,
        // momentPropTypes.momentObj or null,
        onDatesChange={({ startDate, endDate }) => {
          dispatch(change('filter', 'dateRange', { startDate, endDate }));
        }} // PropTypes.func.isRequired,
        focusedInput={focused} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={focusedInput => {
          setFocused(focusedInput || 'startDate');
        }}
        numberOfMonths={2}
        isOutsideRange={day => isInclusivelyBeforeDay(day, moment())}
      />
    </Wrapper>
  );
};

const mapStateToProps = state => {
  return {
    dateRange: getSelectedDateSelector(state),
  };
};

export default connect(mapStateToProps)(FilterDateRangePicker);

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

const AdDateRangePicker = ({
  dateRange: { startDate, endDate },
  dispatch,
  item,
}) => {
  const [focused, setFocused] = useState('startDate');
  // let startDate = dateRange && dateRange.startDate;
  // startDate = startDate && moment(startDate);
  //
  // let endDate = dateRange && dateRange.endDate;
  // endDate = endDate && moment(endDate);

  const reservedDates = item.reservedDates;

  const dayBlocked = day => {
    return reservedDates && reservedDates[day.format('YYYY-MM-DD')];
  };

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
        isDayBlocked={day => dayBlocked(day)}
      />
    </Wrapper>
  );
};

const mapStateToProps = state => {
  return {
    dateRange: getSelectedDateSelector(state),
  };
};

export default connect(mapStateToProps)(AdDateRangePicker);

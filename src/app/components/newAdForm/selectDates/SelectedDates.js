import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { change } from 'redux-form';
import { DayPickerRangeController, isInclusivelyBeforeDay } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import Styled from './SelectedDates.styles';
import moment from 'moment';
import { IS_SERVER } from '../../../constants';

const Wrapper = styled.div`
  position: relative;
`;

const SelectedDates = ({ dispatch, formValues }) => {
  const [focused, setFocused] = useState('startDate');
  const [date, setDate] = useState({ startDate: null, endDate: null });
  const [editingReserved, setEditingReserved] = useState(false);

  if (IS_SERVER) return null;

  const dayBlocked = day => {
    if (formValues && formValues.reservedDates) {
      const reservedDates = formValues.reservedDates;

      return reservedDates[day.format('YYYY-MM-DD')];
    }
  };

  const handleSelectedDates = () => {
    const reservedDates = {};
    reservedDates[date.startDate.format('YYYY-MM-DD')] = !editingReserved;
    const currDate = moment(date.startDate).startOf('day');
    const lastDate = moment(date.endDate).startOf('day');

    while (currDate.add(1, 'days').diff(lastDate) < 0) {
      reservedDates[currDate.format('YYYY-MM-DD')] = !editingReserved;
    }

    reservedDates[date.endDate.format('YYYY-MM-DD')] = !editingReserved;

    dispatch(
      change('newAdForm', 'reservedDates', {
        ...(formValues && formValues.reservedDates),
        ...reservedDates,
      }),
    );
    setDate({ startDate: null, endDate: null });
  };

  return (
    <Wrapper>
      <div>
        <DayPickerRangeController
          startDate={date.startDate} // momentPropTypes.momentObj or null,
          // PropTypes.string.isRequired,
          endDate={date.endDate} // momentPropTypes.momentObj or null,
          // momentPropTypes.momentObj or null,
          onDatesChange={({ startDate, endDate }) => {
            setDate({ startDate, endDate });
            //dispatch(change('filter', 'dateRange', { startDate, endDate }));
          }} // PropTypes.func.isRequired,
          focusedInput={focused} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => {
            setFocused(focusedInput || 'startDate');
          }}
          numberOfMonths={3}
          isOutsideRange={day => isInclusivelyBeforeDay(day, moment())}
          isDayBlocked={day => (editingReserved ? false : dayBlocked(day))}
          renderDayContents={
            editingReserved
              ? mom => {
                  return (
                    <span style={{ color: dayBlocked(mom) ? 'red' : '' }}>
                      {mom.date()}
                    </span>
                  );
                }
              : undefined
          }
        />
        <Styled.ButtonContainer>
          <Styled.CustomButton1
            onClick={() => setEditingReserved(!editingReserved)}
          >
            {editingReserved
              ? 'Cancel Editing reserved dates'
              : 'Edit reserved dates'}
          </Styled.CustomButton1>
          {!editingReserved && (
            <Styled.CustomButton onClick={handleSelectedDates}>
              Mark as Reserved
            </Styled.CustomButton>
          )}

          {editingReserved && (
            <Styled.CustomButton onClick={handleSelectedDates}>
              Mark As Free
            </Styled.CustomButton>
          )}
        </Styled.ButtonContainer>
      </div>
    </Wrapper>
  );
};

export default connect()(SelectedDates);

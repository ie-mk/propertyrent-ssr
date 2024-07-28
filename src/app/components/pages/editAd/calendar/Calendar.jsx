import React, { useState } from 'react';
import { IS_SERVER } from '../../../../constants';
import { DayPickerRangeController, isInclusivelyBeforeDay } from 'react-dates';
import 'react-dates/initialize';
import Styled from './Calendar.styles';
import { connect } from 'react-redux';
import moment from 'moment';
import { adActions } from '../../../../store/actions';
import { getEditabledAd } from '../../../../store/selectors';
import ErrorBoundary from '../../../ErrorBoundary';

const AdCalendar = ({ dispatch, ad, adId }) => {
  const [focused, setFocused] = useState('startDate');
  const [date, setDate] = useState({ startDate: null, endDate: null });
  const [editingReserved, setEditingReserved] = useState(false);

  if (!ad) return null;

  if (IS_SERVER) return null;

  const dayBlocked = day => {
    if (ad && ad.reservedDates) {
      const reservedDates = ad.reservedDates;

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
      adActions.updateAd.request({
        adId,
        data: {
          reservedDates: { ...ad.reservedDates, ...reservedDates },
        },
      }),
    );

    // dispatch(
    //   change('newAdForm', 'reservedDates', {
    //     ...(formValues && formValues.reservedDates),
    //     ...reservedDates,
    //   }),
    // );
    setDate({ startDate: null, endDate: null });
  };

  return (
    <Styled.Wrapper>
      <ErrorBoundary>
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
          <Styled.EditReservedButtonsWraper>
            <Styled.CustomButton1
              onClick={() => setEditingReserved(!editingReserved)}
            >
              {editingReserved ? 'Cancel Edit Reserved' : 'Edit Reserved'}
            </Styled.CustomButton1>
            {editingReserved && date.startDate && (
              <Styled.CustomButton
                type="primarySubtle"
                onClick={handleSelectedDates}
              >
                Mark As Free
              </Styled.CustomButton>
            )}
          </Styled.EditReservedButtonsWraper>
          {!editingReserved && (
            <Styled.CustomButton onClick={handleSelectedDates}>
              Mark as Reserved
            </Styled.CustomButton>
          )}
        </Styled.ButtonContainer>
      </ErrorBoundary>
    </Styled.Wrapper>
  );
};

const mapStateToProps = state => ({
  ad: getEditabledAd(state),
});

export default connect(mapStateToProps)(AdCalendar);

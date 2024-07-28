import React, { useState, useEffect, useRef } from 'react';
import Styled from './Filter.styles';
import Modal from './filterModal/FilterModal';
import Guests from './guests/Guests';
import Price from './price/Price';
import { change } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';
import DateRangePickerCustom from './filterDateRangePicker/filterDateRangePicker';

const Filter = props => {
  const { dispatch, filterValues } = props;

  const [guestsFilter, setGuestsFilter] = useState(false);
  const [priceFilter, setPriceFilter] = useState(false);
  const [dateFilter, setDateFilter] = useState(false);

  const element = useRef(null);

  let startDate =
    filterValues &&
    filterValues.values &&
    filterValues.values.dateRange &&
    filterValues.values.dateRange.startDate;

  let endDate =
    filterValues &&
    filterValues.values &&
    filterValues.values.dateRange &&
    filterValues.values.dateRange.endDate;

  startDate = startDate ? moment(startDate).format('DD MMM') : '';
  endDate = endDate ? moment(endDate).format('DD MMM') : '';

  const handleClickOutside = () => {
    setGuestsFilter(false);
    setPriceFilter(false);
    setDateFilter(false);
  };

  const handleGuestFilter = () => {
    if (priceFilter) {
      setPriceFilter(!priceFilter);
    }
    if (dateFilter) {
      setDateFilter(!dateFilter);
    }

    setGuestsFilter(!guestsFilter);
  };

  const handlePriceFilter = () => {
    if (guestsFilter) {
      setGuestsFilter(!guestsFilter);
    }
    if (dateFilter) {
      setDateFilter(!dateFilter);
    }
    setPriceFilter(!priceFilter);
  };

  const handleDateFilter = () => {
    if (guestsFilter) {
      setGuestsFilter(!guestsFilter);
    }
    if (priceFilter) {
      setPriceFilter(!priceFilter);
    }
    setDateFilter(!dateFilter);
  };

  const handleClick = e => {
    if (element.current.contains(e.target)) {
      return;
    }
    handleClickOutside();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick, false);

    return () => {
      document.removeEventListener('mousedown', handleClick, false);
    };
  }, []);

  const resetFormFields = fields =>
    fields.map(field => dispatch(change('filter', field, 0)));

  return (
    <Styled.ButtonGroup ref={element}>
      <Styled.FilterWrapper>
        <Styled.CustomButton
          bordered
          type="facebook"
          onClick={handleDateFilter}
        >
          {`${startDate}  -  ${endDate}`}
        </Styled.CustomButton>
        {dateFilter && (
          <Modal
            clicked={() => {
              resetFormFields(['dateRange.startDate', 'dateRange.endDate']);
            }}
            save={() => {
              setDateFilter(false);
            }}
          >
            <DateRangePickerCustom />
          </Modal>
        )}
      </Styled.FilterWrapper>

      <Styled.FilterWrapper>
        <Styled.CustomButton
          bordered
          type="facebook"
          onClick={handleGuestFilter}
        >
          Guests
        </Styled.CustomButton>
        {guestsFilter && (
          <Modal
            left={-150}
            clicked={() => {
              resetFormFields(['adults', 'children', 'infants']);
            }}
            save={() => {
              setGuestsFilter(false);
            }}
          >
            <Guests />
          </Modal>
        )}
      </Styled.FilterWrapper>
      <Styled.FilterWrapper>
        <Styled.CustomButton
          bordered
          type="facebook"
          onClick={handlePriceFilter}
        >
          Price
        </Styled.CustomButton>
        {priceFilter && (
          <Modal
            left={-250}
            clicked={() => {
              resetFormFields(['minPrice', 'maxPrice']);
            }}
            save={() => {
              setPriceFilter(false);
            }}
          >
            <Price />
          </Modal>
        )}
      </Styled.FilterWrapper>

      <Styled.CustomButton bordered type="facebook">
        More filters
      </Styled.CustomButton>
    </Styled.ButtonGroup>
  );
};

const mapStateToProps = state => ({
  filterValues: state.form && state.form.filter,
});

export default connect(mapStateToProps)(Filter);

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Container } from 'foundation';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import Styled from './Front.styles';
import { reduxForm, Field, change } from 'redux-form';
import Router from 'next/router';
import { required, number } from '../../../utils/validation';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { getSelectedDateSelector } from '../../../store/selectors';

const Front = ({
  filterFormValues,
  dateRange: { startDate, endDate },
  handleSubmit,
  dispatch,
}) => {
  const [focused, setFocused] = useState(null);

  const { t } = useTranslation();

  const handleSearch = () => Router.push('/results');

  const submitFailed = filterFormValues && filterFormValues.submitFailed;
  const errors = filterFormValues && filterFormValues.syncErrors;

  const ValidationError = ({ value }) => (
    <Styled.ValidationError>{value}</Styled.ValidationError>
  );

  return (
    <Styled.ImageBackground>
      <Styled.TransparentWrapper>
        <Container padding="xxxl">
          <Styled.FormWrapper>
            <Styled.H2>{t('Please enter your stay details')}</Styled.H2>
            <form onSubmit={handleSubmit(handleSearch)}>
              <Styled.InputStyles>
                <Field
                  className="search-input"
                  placeholder={t('Town, city')}
                  name="destination"
                  component="input"
                  type="text"
                />
              </Styled.InputStyles>
              <Styled.InputStyles>
                <Styled.DatePickerWrapper>
                  <Field
                    className="hidden"
                    name="dateRange"
                    component="input"
                    type="number"
                    validate={[required]}
                  />
                  <DateRangePicker
                    startDate={startDate} // momentPropTypes.momentObj or null,
                    startDateId="start_date_id" // PropTypes.string.isRequired,
                    endDate={endDate} // momentPropTypes.momentObj or null,
                    endDateId="end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => {
                      dispatch(
                        change('filter', 'dateRange', { startDate, endDate }),
                      );
                    }} // PropTypes.func.isRequired,
                    focusedInput={focused} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => setFocused(focusedInput)} // PropTypes.func.isRequired,
                    customInputIcon={
                      <i className="fa fa-calendar" aria-hidden="true" />
                    }
                  />
                  {submitFailed && errors && errors.dateRange ? (
                    <ValidationError value={'This field is required'} />
                  ) : null}
                </Styled.DatePickerWrapper>
              </Styled.InputStyles>
              <Styled.InputStyles>
                <Field
                  className="search-input"
                  placeholder="How many people"
                  name="numberOfPeople"
                  component="input"
                  type="number"
                  validate={[required, number]}
                />
                {submitFailed && errors && errors.numberOfPeople ? (
                  <ValidationError value={'This field is required'} />
                ) : null}
              </Styled.InputStyles>
              <Styled.InputStyles>
                <button
                  className="search-button"
                  //onClick={handleSearch}
                  type="submit"
                >
                  {t('Search Now')}
                </button>
              </Styled.InputStyles>
            </form>
          </Styled.FormWrapper>
        </Container>
      </Styled.TransparentWrapper>
    </Styled.ImageBackground>
  );
};

const mapStateToProps = state => ({
  filterFormValues: state.form && state.form.filter && state.form.filter.values,
  dateRange: getSelectedDateSelector(state),
});

export default reduxForm({
  form: 'filter', // a unique identifier for this form
  destroyOnUnmount: false,
})(connect(mapStateToProps)(Front));

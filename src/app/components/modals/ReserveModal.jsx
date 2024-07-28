import React from 'react';
import Styled from './ReserveModal.styles';
import Modal from '../modal/Modal';
import moment from 'moment';
import Login from '../pages/login/FireBaseUILoginPage';
import { connect } from 'react-redux';

const ReserveModal = ({
  onClose,
  item,
  numberOfDays,
  user,
  dateRange,
  numberOfPeople,
}) => {
  let startDate = dateRange && dateRange.startDate;
  startDate = startDate && moment(startDate);

  let endDate = dateRange && dateRange.endDate;
  endDate = endDate && moment(endDate);

  let sDate = moment(startDate).format('DD/MM/YYYY');
  let eDate = moment(endDate).format('DD/MM/YYYY');

  const Total = item.price_per_night * numberOfDays + item.service_fee;
  let title;
  if (user.uid) {
    title = 'Booking summary';
  } else {
    title = 'Sign-in';
  }
  return (
    <Modal title={title} onClose={onClose}>
      {user.uid && (
        <Styled.Wrapper>
          <Styled.ContentWrapper>
            <label>
              ${item.price_per_night} * {numberOfDays} nights
            </label>
            <label>${item.price_per_night * numberOfDays}</label>
          </Styled.ContentWrapper>
          <Styled.CleanWrapper>
            <label>Cleaning Fee</label>
            <label>${item.service_fee}</label>
          </Styled.CleanWrapper>

          <Styled.TotalWrapper>
            <Styled.Label>Total</Styled.Label>
            <Styled.Label>${Total}</Styled.Label>
          </Styled.TotalWrapper>
          <Styled.ContentWrapper>
            <label>Refundable Damage Deposit </label>
            <label>$185.48</label>
          </Styled.ContentWrapper>
          <Styled.ContentWrapper>
            <label>Total + deposit </label>
            <label>${Total + 185.48}</label>
          </Styled.ContentWrapper>
          <Styled.ContentWrapper>
            <Styled.Label>Cancellation Policy</Styled.Label>
          </Styled.ContentWrapper>
          <Styled.ContentWrapper>
            <div>100% {item.cancellationChargeFreePeriod}</div>
          </Styled.ContentWrapper>
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
                <div>{numberOfPeople}</div>
              </Styled.TextContainer>
            </Styled.PriceContainer>
          </div>
          <Styled.CustomButton>Continue Booking</Styled.CustomButton>
        </Styled.Wrapper>
      )}
      {!user.uid && <Login />}
    </Modal>
  );
};
const mapStateToProps = state => ({
  user: state.user.loginProviderData,
  dateRange:
    state.form &&
    state.form.filter &&
    state.form.filter.values &&
    state.form.filter.values.dateRange,
  numberOfPeople:
    state.form &&
    state.form.filter &&
    state.form.filter.values &&
    state.form.filter.values.numberOfPeople,
});

export default connect(mapStateToProps)(ReserveModal);

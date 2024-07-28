import * as Yup from 'yup';
import { isValidPhoneNumber } from 'react-phone-number-input';

const profileFormValidationSchema = Yup.object().shape({
  phoneNumber: Yup.mixed().test(
    'phoneNumber',
    'Please enter valid phone number',
    function(phoneNumber) {
      return isValidPhoneNumber(phoneNumber);
    },
  ),
});

export default profileFormValidationSchema;

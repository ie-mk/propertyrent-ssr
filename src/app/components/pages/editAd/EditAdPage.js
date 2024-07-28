import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import EditAdForm from './editAdForm/EditAdForm';
import { adActions } from '../../../store/actions';
import SpinnerLarge from '../../spinner/SpinnerLarge';
import { getEditabledAd } from '../../../store/selectors';

const EditAdPage = ({ ad, dispatch, loading }) => {
  const { query } = useRouter();
  const id = query && query.id;

  useEffect(() => {
    dispatch(adActions.fetchAd.request(id));
    dispatch(adActions.setEditableAdId(id));
  }, []);

  return (
    <>
      {loading ? <SpinnerLarge /> : null}
      <EditAdForm ad={ad} />
    </>
  );
};

const mapStateToProps = state => ({
  ad: getEditabledAd(state),
  loading: state.ads.loading,
});

export default connect(mapStateToProps)(EditAdPage);

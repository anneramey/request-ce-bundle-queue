import { compose } from 'recompose';
import { reduxForm } from 'redux-form';
import { loadable } from 'react-kinetic-core';

import { actions } from '../../redux/modules/profile';

import { Profile } from './Profile';

export const stateMapper = ({ profile }) => ({
  initialValues: profile.data,
  loading: profile.loading,
  apiErrors: profile.errors,
});

export const dispatchMapper = {
  fetchProfile: actions.fetchProfile,
  updateProfile: actions.updateProfile,
};

export const validate = () => ({});

export const onSubmit = (values, dispatch, props) => {
  props.updateProfile(values);
};

export const ProfileContainer = compose(
  reduxForm(
    {
      form: 'profile',
      fields: ['username', 'displayName', 'email'],
      validate,
      onSubmit,
    },
    stateMapper,
    dispatchMapper,
  ),
  loadable({
    onMount: props => props.fetchProfile(),
  }),
)(Profile);

import React from 'react';
import { reduxForm } from 'redux-form';

import { actions } from '../../redux/modules/team';
import { TeamForm, validate } from './TeamForm';

const submitCreateForm = (values, dispatch) => {
  dispatch(actions.createTeam(values));
};

const mapStateToProps = ({ currentTeam }) => ({
  apiErrors: currentTeam.errors,
});

const TeamCreateForm = reduxForm(
  {
    form: 'teamCreateForm',
    fields: ['name', 'description'],
    onSubmit: submitCreateForm,
    validate,
  },
  mapStateToProps,
)(TeamForm);

export const TeamCreate = props => (
  <div>
    <h1>New Team</h1>
    <TeamCreateForm {...props} />
  </div>
);

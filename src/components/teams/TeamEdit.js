import React from 'react';
import { reduxForm } from 'redux-form';

import { actions } from '../../redux/modules/team';
import { TeamForm, validate } from './TeamForm';

const submitEditForm = (values, dispatch, props) => {
  dispatch(actions.updateTeam(props.team.slug, values));
};

const mapStateToProps = ({ currentTeam }) => ({
  initialValues: { ...currentTeam.data },
  apiErrors: currentTeam.errors,
});

const TeamEditForm = reduxForm(
  {
    form: 'teamEditForm',
    fields: ['name', 'description'],
    onSubmit: submitEditForm,
    validate,
  },
  mapStateToProps,
)(TeamForm);

export const TeamEdit = props => (
  <div>
    <h1>Edit Team!</h1>
    <TeamEditForm {...props} initialValues={props.team} />
  </div>
);

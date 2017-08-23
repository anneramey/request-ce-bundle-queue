import React from 'react';
import { Link } from 'react-router-dom';

import { Field } from '../helpers/Field';

export const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  }

  return errors;
};

export const TeamForm = ({ handleSubmit, fields, loading, apiErrors, errors, team }) => (
  <div>
    {apiErrors.map(error => <div className="alert alert-danger">{error}</div>)}
    <form onSubmit={handleSubmit} noValidate style={{ display: loading ? 'none' : 'visible' }}>
      <div>
        <label htmlFor="teamName">Name</label>
        <Field type="text" id="teamName" controls={fields.name} disabled={loading} />
        {fields.name.touched && errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
      </div>

      <div>
        <label htmlFor="teamDescription">Description</label>
        <Field type="text" id="teamDescription" controls={fields.description} disabled={loading} />
      </div>
      <button type="submit" className="btn btn-success">Save</button>
      {
        team ?
          <Link to={`/teams/${team.slug}`}>Show</Link> :
          <Link to={'/teams'}>Show All</Link>
      }
    </form>
  </div>
);

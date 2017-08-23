import React from 'react';
import { Seq, Set } from 'immutable';
import DocumentTitle from 'react-document-title';

const INPUT_PROPS =
  Set(['name', 'onBlur', 'onChange', 'onDragStart', 'onDrop', 'onFocus', 'value']);

// Redux form passes in several props that are not valid for react 'input'
// elements. React has since started to print warnings about these props so the
// helper below is used to filter out props that react will complain about.
const filterProps = props =>
  Seq(props).filter((value, key) => INPUT_PROPS.contains(key)).toJS();

const Field = props =>
  <div>
    <input
      {...filterProps(props.controls)}
      type={props.type}
      value={props.controls.value || ''}
      disabled={props.disabled}
    />
  </div>;

export const Profile = ({ handleSubmit, fields, loading, apiErrors }) =>
  <DocumentTitle title="Profile">
    <div>
      {loading && <p>Loading profile information...</p>}
      {apiErrors.map(error => <p>{error}</p>)}
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="username">Username</label>
          <Field type="text" id="username" controls={fields.username} disabled={loading} />
        </div>
        <div>
          <label htmlFor="displayName">Display Name</label>
          <Field type="text" id="displayName" controls={fields.displayName} disabled={loading} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Field type="email" id="email" controls={fields.email} disabled={loading} />
        </div>
        <button type="submit" disabled={loading}>Submit</button>
      </form>
    </div>
  </DocumentTitle>;

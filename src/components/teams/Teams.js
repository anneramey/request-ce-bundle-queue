import React from 'react';
import classNames from 'classnames';
import { Route, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import { TeamContainer } from './TeamContainer';

import { RequiresSpaceAdmin } from '../helpers/RequiresSpaceAdmin';

const Loader = () => <h2>Loading...</h2>;
const Errors = ({ errors }) => (
  <div>
    {errors.map(error =>
      <div key={error} className="alert alert-danger">{error}</div>,
    )}
  </div>
);

const TeamRow = ({ team }) => (
  <tr>
    <td>{team.name}</td>
    <td>{team.description || 'No description.'}</td>
    <td>{team.memberships.length}</td>
    <td>
      <Link to={`/teams/${team.slug}`}>View</Link>
      {' | '}
      <Link to={`/teams/${team.slug}/edit`}>Edit</Link>
      {' | '}
      <Link to={`/teams/${team.slug}/delete`}>Delete</Link>
    </td>
  </tr>
);

const TeamsTable = ({ teams }) => (
  <table className="table table-striped">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Total Members</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {teams.length > 0 && teams.map(team => <TeamRow key={team.slug} team={team} />)}
    </tbody>
  </table>
);

const TeamsSidebar = ({ teams }) => (
  <ul>
    {teams.map(team =>
      <li key={team.slug}>
        <Link to={`/teams/${team.slug}`}>{team.name}</Link>
      </li>,
    )}
  </ul>
);

export const Teams = ({ loading, errors, teams, profile, match }) =>
  loading === true ? (
    <Loader />
  ) : (
    <RequiresSpaceAdmin profile={profile}>
      <div className="row">
        <div className={classNames({ 'col-xs-12': match.isExact, 'col-xs-4': !match.isExact })}>
          <h3>
            Teams
            <LinkContainer to="/teams/new" className="btn btn-sm btn-default">
              <button >New Team</button>
            </LinkContainer>
          </h3>
          {errors.length > 0 && <Errors errors={errors} />}
          {match.isExact && <TeamsTable teams={teams} />}
          {!match.isExact && <TeamsSidebar teams={teams} />}
        </div>
        <div className="col-xs-8">
          <Route path="/teams/:teamSlug" component={TeamContainer} />
        </div>
      </div>
    </RequiresSpaceAdmin>
  );

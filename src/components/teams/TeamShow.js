import React from 'react';
import { Link } from 'react-router-dom';

export const TeamShow = ({ team }) => (
  <div>
    <h1>Show {team.name}!</h1>

    <p><b>Name:</b> {team.name}</p>
    <p><b>Description:</b></p>
    <p>{team.description || 'No description provided.'}</p>
    <div>
      {/* Actions */}
      <Link to={'/teams'}>All Teams</Link>
      {' | '}
      <Link to={`/teams/${team.slug}/edit`}>Edit</Link>
      {' | '}
      <Link to={`/teams/${team.slug}/delete`}>Delete</Link>
    </div>
  </div>
);

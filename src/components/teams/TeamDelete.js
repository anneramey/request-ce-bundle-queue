import React from 'react';
import { withHandlers } from 'recompose';
import { LinkContainer } from 'react-router-bootstrap';

const enhance = withHandlers({
  onConfirm: ({ deleteTeam, team }) => () => {
    deleteTeam(team.slug);
  },
});

export const TeamDelete = enhance(({ onConfirm }) =>
  <div>
    <h1>Are you sure?</h1>
    <button className="btn btn-danger" onClick={onConfirm}>Yes, delete this team.</button>
    <LinkContainer to="/teams" className="btn btn-link">
      <button >No, back to team list.</button>
    </LinkContainer>
  </div>,
);

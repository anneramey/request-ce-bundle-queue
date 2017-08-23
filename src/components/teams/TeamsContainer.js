import { connect } from 'react-redux';
import { compose } from 'recompose';
import { loadable } from 'react-kinetic-core';

import { actions } from '../../redux/modules/teams';

import { Teams } from './Teams';

export const mapStateToProps = ({ profile, allTeams }) => ({
  teams: allTeams.data,
  loading: allTeams.loading || profile.loading,
  errors: allTeams.errors,
  profile,
});
export const mapDispatchToProps = actions;

export const TeamsContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  loadable({ onMount: props => props.fetchTeams() }),
)(Teams);

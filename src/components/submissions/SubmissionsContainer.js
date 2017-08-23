import { connect } from 'react-redux';
import { compose } from 'recompose';

import { loadable, CoreAPI } from 'react-kinetic-core';

import { actions } from '../../redux/modules/submissions';

import { Submissions } from './Submissions';

export const mapStateToProps = ({ submissions }) => ({
  ...submissions,
});

export const mapDispatchToProps = {
  searchSubmissions: actions.searchSubmissions,
};

export const SubmissionsContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  loadable({
    onMount: ({ searchSubmissions }) => {
      const searcher = new CoreAPI.SubmissionSearch()
        .coreState('Draft')
        .includes(['details', 'values']);
      searchSubmissions(searcher.build());
    },
  }),
)(Submissions);

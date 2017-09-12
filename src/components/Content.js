import React from 'react';
import { compose, lifecycle, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import SVGInline from 'react-svg-inline';
import refreshIcon from 'font-awesome-svg-png/white/svg/refresh.svg';
import filterIcon from '../images/filter.svg';
import sortIcon from '../images/sort.svg';
import { FilterMenuContainer } from './FilterMenu/FilterMenuContainer';
import { QueueListItem } from './QueueListItem';
import { actions as queueActions } from '../redux/modules/queue';
import { actions as filterMenuActions } from '../redux/modules/filterMenu';

const StaticContent = ({ filter, queueItems, openFilterMenu }) =>
  <div className="two-panels">
    <div className="left-panel">
      <div className="controls">
        <h6>
          {filter.name}
          <br />
          <small>by Due Date</small>
        </h6>
        <div className="buttons">
          <button type="button" className="btn btn-link">
            <SVGInline svg={refreshIcon} className="icon" />
          </button>
          <button type="button" className="btn btn-link">
            <SVGInline svg={sortIcon} className="icon" />
          </button>
          <button type="button" className="btn btn-link" onClick={openFilterMenu}>
            <SVGInline svg={filterIcon} className="icon" />
          </button>
        </div>
      </div>
      <div className="submissions">
        <ul className="list-group">
          {
            queueItems.map(queueItem => <QueueListItem key={queueItem.id} queueItem={queueItem} />)
          }
        </ul>
      </div>
    </div>
    <div className="right-panel">
      <p>Preview Assignment</p>
    </div>
  </div>;

const mapStateToProps = state => ({
  filter: state.queue.currentFilter,
  filters: state.app.filters.merge(state.app.myFilters),
  queueItems: state.queue.listItems,
});

const mapDispatchToProps = {
  setCurrentFilter: queueActions.setCurrentFilter,
  openFilterMenu: filterMenuActions.open,
};

const selectFilter = (filters, filter) => filters.find(f => f.slug === filter);

const StaticContentContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    openFilterMenu: props => () => props.openFilterMenu(props.filter),
  }),
  lifecycle({
    componentWillMount() {
      const filter = selectFilter(this.props.filters, this.props.match.params.filter);
      if (filter) {
        this.props.setCurrentFilter(filter);
      }
    },
    componentWillReceiveProps(nextProps) {
      if (this.props.match.params.filter !== nextProps.match.params.filter) {
        const filter = selectFilter(this.props.filters, nextProps.match.params.filter);
        if (filter) {
          this.props.setCurrentFilter(filter);
        }
      }
    },
  }),
)(StaticContent);

export const Content = () =>
  <div className="content">
    <Route path="/" exact render={() => <div>Please select a list</div>} />
    <Route path="/:filter" render={routeProps => <StaticContentContainer {...routeProps} />} />
    <FilterMenuContainer />
  </div>;

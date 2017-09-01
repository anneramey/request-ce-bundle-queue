import React from 'react';
import { compose, lifecycle, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import SVGInline from 'react-svg-inline';
import refreshIcon from 'font-awesome-svg-png/white/svg/refresh.svg';
import solidCircle from 'font-awesome-svg-png/white/svg/circle.svg';
import emptyCircle from 'font-awesome-svg-png/white/svg/circle-o.svg';
import filterIcon from '../images/filter.svg';
import sortIcon from '../images/sort.svg';
import { FilterMenuContainer } from './FilterMenuContainer';
import { actions as queueActions } from '../redux/modules/queue';
import { actions as filterMenuActions } from '../redux/modules/filterMenu';

const StaticContent = ({ filter, openFilterMenu }) =>
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
          <li className="submission list-group-item">
            <p className="status">
              <SVGInline svg={solidCircle} className="icon" />
              Complete
            </p>
            <h1>Send Message To Requester</h1>
            <p className="summary">
              At our current plan, luckyorange.com allows tracking for 3 sites.
              We would have to increase our plan to added
            </p>
            <p className="assignment">Marketing &gt; Matt B</p>
            <ul className="timestamps list-group">
              <li className="list-group-item">Due in 6 hours</li>
              <li className="list-group-item">Updated 7 days ago</li>
              <li className="list-group-item">Created 7 Days ago</li>
            </ul>
          </li>
          <li className="submission list-group-item">
            <p className="status">
              <SVGInline svg={emptyCircle} className="icon" />
              Open
            </p>
            <h1>Work Order (9247AF)</h1>
            <p className="summary">
              Content Change has been requested by James Davies
            </p>
            <p className="assignment">Matt B</p>
            <ul className="timestamps list-group">
              <li className="list-group-item">Due in 6 hours</li>
              <li className="list-group-item">Updated 7 days ago</li>
              <li className="list-group-item">Created 7 Days ago</li>
            </ul>
          </li>
          <li className="submission list-group-item">
            <p className="status">
              <SVGInline svg={emptyCircle} className="icon" />
              Pending (Approved)
            </p>
            <h1>Work Order (9247AF</h1>
            <p className="summary">
              General Marketing Request has been requested by John Sundberg
            </p>
            <p className="assignment">Marketing &gt; Matt B</p>
            <ul className="timestamps list-group">
              <li className="list-group-item">Due in 6 hours</li>
              <li className="list-group-item">Updated 7 days ago</li>
              <li className="list-group-item">Created 7 Days ago</li>
            </ul>
          </li>
          <li className="submission list-group-item">
            <p className="status">
              <SVGInline svg={solidCircle} className="icon" />
              Complete
            </p>
            <h1>Send Message To Requester</h1>
            <p className="summary">
              At our current plan, luckyorange.com allows tracking for 3 sites.
              We would have to increase our plan to added
            </p>
            <p className="assignment">Marketing &gt; Matt B</p>
            <ul className="timestamps list-group">
              <li className="list-group-item">Due in 6 hours</li>
              <li className="list-group-item">Updated 7 days ago</li>
              <li className="list-group-item">Created 7 Days ago</li>
            </ul>
          </li>
          <li className="submission list-group-item">
            <p className="status">
              <SVGInline svg={emptyCircle} className="icon" />
              Open
            </p>
            <h1>Work Order (9247AF)</h1>
            <p className="summary">
              Content Change has been requested by James Davies
            </p>
            <p className="assignment">Matt B</p>
            <ul className="timestamps list-group">
              <li className="list-group-item">Due in 6 hours</li>
              <li className="list-group-item">Updated 7 days ago</li>
              <li className="list-group-item">Created 7 Days ago</li>
            </ul>
          </li>
          <li className="submission list-group-item">
            <p className="status">
              <SVGInline svg={emptyCircle} className="icon" />
              Pending (Approved)
            </p>
            <h1>Work Order (9247AF</h1>
            <p className="summary">
              General Marketing Request has been requested by John Sundberg
            </p>
            <p className="assignment">Marketing &gt; Matt B</p>
            <ul className="timestamps list-group">
              <li className="list-group-item">Due in 6 hours</li>
              <li className="list-group-item">Updated 7 days ago</li>
              <li className="list-group-item">Created 7 Days ago</li>
            </ul>
          </li>
          <li className="submission list-group-item">
            <p className="status">
              <SVGInline svg={solidCircle} className="icon" />
              Complete
            </p>
            <h1>Send Message To Requester</h1>
            <p className="summary">
              At our current plan, luckyorange.com allows tracking for 3 sites.
              We would have to increase our plan to added
            </p>
            <p className="assignment">Marketing &gt; Matt B</p>
            <ul className="timestamps list-group">
              <li className="list-group-item">Due in 6 hours</li>
              <li className="list-group-item">Updated 7 days ago</li>
              <li className="list-group-item">Created 7 Days ago</li>
            </ul>
          </li>
          <li className="submission list-group-item">
            <p className="status">
              <SVGInline svg={emptyCircle} className="icon" />
              Open
            </p>
            <h1>Work Order (9247AF)</h1>
            <p className="summary">
              Content Change has been requested by James Davies
            </p>
            <p className="assignment">Matt B</p>
            <ul className="timestamps list-group">
              <li className="list-group-item">Due in 6 hours</li>
              <li className="list-group-item">Updated 7 days ago</li>
              <li className="list-group-item">Created 7 Days ago</li>
            </ul>
          </li>
          <li className="submission list-group-item">
            <p className="status">
              <SVGInline svg={emptyCircle} className="icon" />
              Pending (Approved)
            </p>
            <h1>Work Order (9247AF</h1>
            <p className="summary">
              General Marketing Request has been requested by John Sundberg
            </p>
            <p className="assignment">Marketing &gt; Matt B</p>
            <ul className="timestamps list-group">
              <li className="list-group-item">Due in 6 hours</li>
              <li className="list-group-item">Updated 7 days ago</li>
              <li className="list-group-item">Created 7 Days ago</li>
            </ul>
          </li>
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
});

const mapDispatchToProps = {
  setCurrentFilter: queueActions.setCurrentFilter,
  openFilterMenu: filterMenuActions.open,
};

const selectFilter = (filters, filter) => filters.find(f => f.slug === filter);

const StaticContentContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    openFilterMenu: props => () => props.openFilterMenu(),
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

export const Content = ({ loading }) =>
  <div>
    {loading && <div>Loading</div>}
    {!loading && <div className="content">
      <Route path="/" exact render={() => <div>Please select a list</div>} />
      <Route path="/:filter" render={routeProps => <StaticContentContainer {...routeProps} />} />
      <FilterMenuContainer />
    </div>}
  </div>;

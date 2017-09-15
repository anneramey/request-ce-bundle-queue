import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import SVGInline from 'react-svg-inline';
import chevronLeftIcon from 'font-awesome-svg-png/black/svg/chevron-left.svg';
import chevronRightIcon from 'font-awesome-svg-png/black/svg/chevron-right.svg';
import thinChevronRightIcon from 'font-awesome-svg-png/black/svg/angle-right.svg';
import circleOpenIcon from 'font-awesome-svg-png/black/svg/circle-o.svg';
// import circleClosedIcon from 'font-awesome-svg-png/black/svg/circle.svg';
import plusIcon from 'font-awesome-svg-png/black/svg/plus.svg';

export const QueueItemDetails = ({ queueItem }) =>
  <div className="queue-item-details two-panels">
    <div className="left-panel">
      <div className="controls">
        <Link to="/list/mine" className="back-link">
          <div>
            <SVGInline svg={chevronLeftIcon} className="icon" />
            Back to Mine
          </div>
        </Link>
      </div>
      <div className="details">
        <p className="status">
          <SVGInline svg={circleOpenIcon} className="icon" />
          {queueItem.values.Status}
        </p>
        <h1>{queueItem.form.name} ({queueItem.handle})</h1>
        <p className="summary">{queueItem.values.Summary}</p>
        <pre>{queueItem.values.Details}</pre>
      </div>
      <div className="assignment">
        <span className="assignment-badge">
          {queueItem.values['Assigned Team Display Name'].charAt(0)}
        </span>
        <div>
          <div className="team">{queueItem.values['Assigned Team Display Name']}</div>
          <div className="individual">{queueItem.values['Assigned Individual Display Name']}</div>
        </div>
        <SVGInline svg={chevronRightIcon} className="icon" />
      </div>
      <button className="btn btn-primary btn-inverse request-button">
        View Original Request
      </button>
      <ul className="list-group timestamps">
        <li className="list-group-item timestamp">
          <span className="label">Due</span>
          <span className="value">in 6 hours</span>
        </li>
        <li className="list-group-item timestamp">
          <span className="label">Updated</span>
          <span className="value">7 days ago</span>
        </li>
        <li className="list-group-item timestamp">
          <span className="label">Created</span>
          <span className="value">7 days ago</span>
        </li>
      </ul>
      <div className="subtasks-section">
        <hr />
        <h2>
          <span>Subtasks</span>
          <button className="btn btn-link">
            <SVGInline svg={plusIcon} className="icon" />
          </button>
        </h2>
        <ul className="list-group subtasks">
          <li className="list-group-item subtask">
            <span className="handle">Work Order (9811AF)</span>
            <span className="summary">Bill out to client with some more text asdf asdf asdf asdfasdf asdf asdf asdf asdf</span>
            <SVGInline svg={thinChevronRightIcon} className="icon" />
          </li>
          <li className="list-group-item subtask">
            <span className="handle">Work Order (9712AF)</span>
            <span className="summary">Remove Google</span>
            <SVGInline svg={thinChevronRightIcon} className="icon" />
          </li>
        </ul>
      </div>
      <div className="discussion-section">
        <hr />
        <h2>
          <span>Discussion</span>
        </h2>
      </div>
    </div>
    <div className="right-panel">
      <button className="btn btn-primary work-grab-button">
        Work / Grab It
      </button>
    </div>
  </div>;

export const mapStateToProps = () => ({
  // Below is a hard-coded submission just to work out this component and its
  // styles without worrying about the redux part yet.
  // eslint-disable-next-line
  queueItem: {"closedAt":null,"closedBy":null,"coreState":"Draft","createdAt":"2017-09-06T20:04:58.871Z","createdBy":"wally@kinops.io","currentPage":"Page One","handle":"8E8E6C","id":"a8e1b875-933e-11e7-8e38-67415c8e8e6c","label":"Pest Control has been requested by Shayne Koestler","origin":{"id":"9b22e4b7-933e-11e7-8e38-d925bd02f791"},"parent":{"id":"9b22e4b7-933e-11e7-8e38-d925bd02f791"},"sessionToken":null,"submittedAt":null,"submittedBy":null,"type":"Automated","updatedAt":"2017-09-10T08:04:55.495Z","updatedBy":"wally@kinops.io","values":{"Assigned Individual":"shayne.koestler@kineticdata.com","Status":"Open","Assigned Individual Display Name":"Shayne Koestler","Summary":"Pest Control has been requested by Shayne Koestler","Due Date":"2017-09-13T20:04:57+00:00","Details":"Requested For: shayne.koestler@kineticdata.com (Shayne Koestler)\nType of Pest: Mouse\nPlease describe the nature of the infestation: There is a mouse in my house.\n","System Input":null,"Originating Id":"9b22e4b7-933e-11e7-8e38-d925bd02f791","Originating System":"Kinetic Core","Originating Url":"https://kinops.io/6607478/submission/9b22e4b7-933e-11e7-8e38-d925bd02f791?review","Assigned Team":"Facilities","Assigned Team Display Name":"Facilities","Deferral Token":"ffdd1f697f38d3d716024cb3e9ef4d7d0c87daf1","Discussion Id":"5342a2dd-183d-41a2-831f-063df9b1c6a8"}, form: { name: "Work Order" }},
});

export const mapDispatchToProps = {};

export const QueueItemDetailsContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
)(QueueItemDetails);

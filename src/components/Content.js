import React from 'react';
import { Route } from 'react-router-dom';
import SVGInline from 'react-svg-inline';
import refreshIcon from 'font-awesome-svg-png/white/svg/refresh.svg';
import solidCircle from 'font-awesome-svg-png/white/svg/circle.svg';
import emptyCircle from 'font-awesome-svg-png/white/svg/circle-o.svg';

const StaticContent = () =>
  <div className="two-panels">
    <div className="left-panel">
      <div className="controls">
        <h6>
          Mine
          <br />
          <small>by Due Date</small>
        </h6>
        <div className="buttons">
          <button type="button" className="btn btn-link">
            <SVGInline svg={refreshIcon} className="icon" cleanup={['height', 'width']} />
          </button>
          <button type="button" className="btn btn-link">
            <SVGInline svg={refreshIcon} className="icon" cleanup={['height', 'width']} />
          </button>
          <button type="button" className="btn btn-link">
            <SVGInline svg={refreshIcon} className="icon" cleanup={['height', 'width']} />
          </button>
        </div>
      </div>
      <div className="submissions">
        <ul className="list-group">
          <li className="submission list-group-item">
            <p className="status">
              <SVGInline svg={solidCircle} className="icon" cleanup={['height', 'width']} />
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
              <SVGInline svg={emptyCircle} className="icon" cleanup={['height', 'width']} />
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
              <SVGInline svg={emptyCircle} className="icon" cleanup={['height', 'width']} />
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
              <SVGInline svg={solidCircle} className="icon" cleanup={['height', 'width']} />
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
              <SVGInline svg={emptyCircle} className="icon" cleanup={['height', 'width']} />
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
              <SVGInline svg={emptyCircle} className="icon" cleanup={['height', 'width']} />
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
              <SVGInline svg={solidCircle} className="icon" cleanup={['height', 'width']} />
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
              <SVGInline svg={emptyCircle} className="icon" cleanup={['height', 'width']} />
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
              <SVGInline svg={emptyCircle} className="icon" cleanup={['height', 'width']} />
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

export const Content = () =>
  <div className="content">
    <Route path="/" exact render={() => <div>Please select a list</div>} />
    <Route path="/mine" render={() => <StaticContent />} />
    <Route path="/teammates" render={() => <StaticContent />} />
  </div>;

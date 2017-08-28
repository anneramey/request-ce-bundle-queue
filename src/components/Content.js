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
            <div className="status">
              <SVGInline svg={solidCircle} className="icon" cleanup={['height', 'width']} />
              Complete
            </div>
            <div className="label">Send Message To Requester</div>
            <div className="summary">
              At our current plan, luckyorange.com allows tracking for 3 sites.
              We would have to increase our plan to added
            </div>
            <div className="assignment">Marketing &gt; Matt B</div>
            <ul className="timestamps list-group">
              <li className="list-group-item">Due in 6 hours</li>
              <li className="list-group-item separator">&bull;</li>
              <li className="list-group-item">Updated 7 days ago</li>
              <li className="list-group-item separator">&bull;</li>
              <li className="list-group-item">Created 7 Days ago</li>
            </ul>
          </li>
          <li className="submission list-group-item">
            <div className="status">
              <SVGInline svg={emptyCircle} className="icon" cleanup={['height', 'width']} />
              Open
            </div>
            <div className="label">Work Order (9247AF)</div>
            <div className="summary">
              Content Change has been requested by James Davies
            </div>
            <div className="assignment">Matt B</div>
            <ul className="timestamps list-group">
              <li className="list-group-item">Due in 6 hours</li>
              <li className="list-group-item separator">&bull;</li>
              <li className="list-group-item">Updated 7 days ago</li>
              <li className="list-group-item separator">&bull;</li>
              <li className="list-group-item">Created 7 Days ago</li>
            </ul>
          </li>
          <li className="submission list-group-item">
            <div className="status">
              <SVGInline svg={emptyCircle} className="icon" cleanup={['height', 'width']} />
              Pending (Approved)
            </div>
            <div className="label">Work Order (9247AF</div>
            <div className="summary">
              General Marketing Request has been requested by John Sundberg
            </div>
            <div className="assignment">Marketing &gt; Matt B</div>
            <ul className="timestamps list-group">
              <li className="list-group-item">Due in 6 hours</li>
              <li className="list-group-item separator">&bull;</li>
              <li className="list-group-item">Updated 7 days ago</li>
              <li className="list-group-item separator">&bull;</li>
              <li className="list-group-item">Created 7 Days ago</li>
            </ul>
          </li>
          <li className="submission list-group-item">
            <div className="status">
              <SVGInline svg={solidCircle} className="icon" cleanup={['height', 'width']} />
              Complete
            </div>
            <div className="label">Send Message To Requester</div>
            <div className="summary">
              At our current plan, luckyorange.com allows tracking for 3 sites.
              We would have to increase our plan to added
            </div>
            <div className="assignment">Marketing &gt; Matt B</div>
            <ul className="timestamps list-group">
              <li className="list-group-item">Due in 6 hours</li>
              <li className="list-group-item separator">&bull;</li>
              <li className="list-group-item">Updated 7 days ago</li>
              <li className="list-group-item separator">&bull;</li>
              <li className="list-group-item">Created 7 Days ago</li>
            </ul>
          </li>
          <li className="submission list-group-item">
            <div className="status">
              <SVGInline svg={emptyCircle} className="icon" cleanup={['height', 'width']} />
              Open
            </div>
            <div className="label">Work Order (9247AF)</div>
            <div className="summary">
              Content Change has been requested by James Davies
            </div>
            <div className="assignment">Matt B</div>
            <ul className="timestamps list-group">
              <li className="list-group-item">Due in 6 hours</li>
              <li className="list-group-item separator">&bull;</li>
              <li className="list-group-item">Updated 7 days ago</li>
              <li className="list-group-item separator">&bull;</li>
              <li className="list-group-item">Created 7 Days ago</li>
            </ul>
          </li>
          <li className="submission list-group-item">
            <div className="status">
              <SVGInline svg={emptyCircle} className="icon" cleanup={['height', 'width']} />
              Pending (Approved)
            </div>
            <div className="label">Work Order (9247AF</div>
            <div className="summary">
              General Marketing Request has been requested by John Sundberg
            </div>
            <div className="assignment">Marketing &gt; Matt B</div>
            <ul className="timestamps list-group">
              <li className="list-group-item">Due in 6 hours</li>
              <li className="list-group-item separator">&bull;</li>
              <li className="list-group-item">Updated 7 days ago</li>
              <li className="list-group-item separator">&bull;</li>
              <li className="list-group-item">Created 7 Days ago</li>
            </ul>
          </li>
          <li className="submission list-group-item">
            <div className="status">
              <SVGInline svg={solidCircle} className="icon" cleanup={['height', 'width']} />
              Complete
            </div>
            <div className="label">Send Message To Requester</div>
            <div className="summary">
              At our current plan, luckyorange.com allows tracking for 3 sites.
              We would have to increase our plan to added
            </div>
            <div className="assignment">Marketing &gt; Matt B</div>
            <ul className="timestamps list-group">
              <li className="list-group-item">Due in 6 hours</li>
              <li className="list-group-item separator">&bull;</li>
              <li className="list-group-item">Updated 7 days ago</li>
              <li className="list-group-item separator">&bull;</li>
              <li className="list-group-item">Created 7 Days ago</li>
            </ul>
          </li>
          <li className="submission list-group-item">
            <div className="status">
              <SVGInline svg={emptyCircle} className="icon" cleanup={['height', 'width']} />
              Open
            </div>
            <div className="label">Work Order (9247AF)</div>
            <div className="summary">
              Content Change has been requested by James Davies
            </div>
            <div className="assignment">Matt B</div>
            <ul className="timestamps list-group">
              <li className="list-group-item">Due in 6 hours</li>
              <li className="list-group-item separator">&bull;</li>
              <li className="list-group-item">Updated 7 days ago</li>
              <li className="list-group-item separator">&bull;</li>
              <li className="list-group-item">Created 7 Days ago</li>
            </ul>
          </li>
          <li className="submission list-group-item">
            <div className="status">
              <SVGInline svg={emptyCircle} className="icon" cleanup={['height', 'width']} />
              Pending (Approved)
            </div>
            <div className="label">Work Order (9247AF</div>
            <div className="summary">
              General Marketing Request has been requested by John Sundberg
            </div>
            <div className="assignment">Marketing &gt; Matt B</div>
            <ul className="timestamps list-group">
              <li className="list-group-item">Due in 6 hours</li>
              <li className="list-group-item separator">&bull;</li>
              <li className="list-group-item">Updated 7 days ago</li>
              <li className="list-group-item separator">&bull;</li>
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

import React from 'react';

const SubmissionRow = ({ submission }) => (
  <div>
    <div className="col-xs-4">
      <dl>
        <dt>Label</dt>
        <dd>{submission.label}</dd>
      </dl>
    </div>
    <div className="col-xs-8">
      <div className="row">
        {
          Object.keys(submission.values).map(key =>
            <div className="col-xs-2" key={key}>
              <strong>{key}</strong>
              <p>{submission.values[key]}</p>
            </div>,
          )
        }
      </div>
    </div>
  </div>
);

export const Submissions = ({ all }) => (
  <div>
    <div className="row">
      {
        all.map(
          submission => <SubmissionRow key={submission.id} submission={submission} />,
        )
      }
    </div>
  </div>
);

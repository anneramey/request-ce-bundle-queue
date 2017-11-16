import React from 'react';
import SVGInline from 'react-svg-inline';
import solidCircle from 'font-awesome-svg-png/white/svg/circle.svg';
import emptyCircle from 'font-awesome-svg-png/white/svg/circle-o.svg';

const CLOSED_STATUSES = ['Cancelled', 'Complete'];

export const StatusParagraph = ({ status }) => (
  <p className="status icon-wrapper">
    <SVGInline
      svg={CLOSED_STATUSES.includes(status) ? solidCircle : emptyCircle}
      className="icon"
    />
    {status}
  </p>
);

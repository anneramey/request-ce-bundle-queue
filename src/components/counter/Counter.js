import React from 'react';
import DocumentTitle from 'react-document-title';

export const Counter = ({ counter, inc, dec, double }) =>
  <DocumentTitle title="Counter">
    <h2>
      <button type="button" className="decButton" onClick={dec}>-</button>
      Counter: {counter}
      <button type="button" className="incButton" onClick={inc}>+</button>
      <button type="button" className="dblButton" onClick={double}>* 2</button>
    </h2>
  </DocumentTitle>;

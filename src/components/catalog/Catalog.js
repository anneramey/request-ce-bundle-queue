import React from 'react';
import DocumentTitle from 'react-document-title';

export const Catalog = props =>
  <DocumentTitle title="Catalog">
    <div>
      {JSON.stringify(props.kapp)}
    </div>
  </DocumentTitle>;

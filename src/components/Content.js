import React from 'react';
import { Route } from 'react-router-dom';

export const Content = () =>
  <div className="content">
    <Route path="/" exact render={() => <div>/</div>} />
    <Route path="/mine" render={() => <div>/mine</div>} />
    <Route path="/teammates" render={() => <div>/teammates</div>} />
  </div>;

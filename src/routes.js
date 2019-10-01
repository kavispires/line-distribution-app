import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

// Global Imports (siblings of any page)
import Footer from './app/global/footer';
import Header from './app/global/header';
import ErrorModal from './app/global/error-modal';

// Pages Imports
import AdminActions from './app/pages/admin-actions';
import Artists from './app/pages/artists';
import Artist from './app/pages/artist';
import Distribute from './app/pages/distribute';
import Home from './app/pages/home';
import Idols from './app/pages/idols';
import Lab from './app/pages/lab';
import LearnMore from './app/pages/learn-more';
import Lyrics from './app/pages/lyrics';
import Manage from './app/pages/manage';
import Songs from './app/pages/songs';
import Sync from './app/pages/sync';
import Temp from './app/pages/temp';
import UIReference from './app/pages/ui-reference';
import User from './app/pages/user';

// Styles Import
import './stylesheets/index.css';

const routes = (
  <Router>
    <div className="app">
      <Header />
      <ErrorModal />
      <Route path="/artists/:artistId/:unitId" component={Artist} />
      <Route exact path="/artists/:artistId" component={Artist} />
      <Route exact path="/artists" component={Artists} />
      <Route path="/distribute" component={Distribute} />
      <Route path="/idols" component={Idols} />
      <Route path="/lab" component={Lab} />
      <Route path="/learn-more" component={LearnMore} />
      <Route path="/lyrics" component={Lyrics} />
      <Route path="/songs" component={Songs} />

      <Route path="/admin/actions" component={AdminActions} />
      <Route path="/admin/manage" component={Manage} />
      <Route path="/admin/sync" component={Sync} />
      <Route path="/admin/ui-reference" component={UIReference} />
      <Route path="/admin/temp" component={Temp} />

      <Route path="/user" component={User} />

      <Route exact path="/" component={Home} />
      <Footer />
    </div>
  </Router>
);

export default routes;

import { Router, Route, hashHistory, IndexRoute} from 'react-router'
import React            from 'react'
import { render }       from 'react-dom'

import App from './App';
import Personal from './js/components/Personal';
import BookShelf from './js/components/BookShelf';
import MyCollection from './js/components/MyCollection';
import Purchased from './js/components/Purchased';
import Course from './js/components/Course';
import Coupon from './js/components/Coupon';

render(
  <Router history={hashHistory}>
      <Route path="/" component={App}>
          <IndexRoute component={Personal}/>
          <Route path="/bookShelf" component={BookShelf}/>
          <Route path="/myCollection" component={MyCollection}/>
          <Route path="/purchased" component={Purchased} />
          <Route path="/course" component={Course} />
          <Route path="/coupon" component={Coupon} />
      </Route>
  </Router>,
  document.getElementById('root')
);

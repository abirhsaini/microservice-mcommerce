import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import  Payments from './components/Payments.jsx';
import bootstrap from 'bootstrap'
import Commander from './components/Commander.jsx';


const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route  path="/commander/:id" component={Commander} />
          <Route path="/products/:id" component={ProductDetails} />
          <Route path="/payment" component={Payments} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;

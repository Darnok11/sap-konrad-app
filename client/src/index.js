// React
import React from 'react';
import ReactDOM from 'react-dom';
// react-router
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
// Components
import App from './components/App';
import AddMovie from './components/AddMovie';
import NotFound from './components/NotFound';
import GetList from './components/GetList';
import Copyrights from './components/Copyrights';
// Apollo + GraphQl
import { InMemoryCache } from 'apollo-boost';
import ApolloCient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import text_en from './resources/text_en';

const cache = new InMemoryCache();
const client = new ApolloCient({
   uri: 'http://localhost:4000/graphql',
   cache
});

const routing = (
   <Router>
      <ApolloProvider client={client}>
      <div>
         <Switch>
            <Route exact path="/" render={() => <App text={text_en}/>}/>;
            <Route exact path="/get-list" component={GetList} />
            <Route exact path="/add-movie" render={() => <AddMovie text={text_en}/>} />
            <Route component={NotFound} />
         </Switch>
         <Copyrights />
      </div>
      </ApolloProvider>
   </Router>
);

ReactDOM.render( routing, document.getElementById('root') );

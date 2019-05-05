/**
 * Use of pagination explenation:
 * In case we have too many items to load, and it would overload our backend, the connection, or the client to load all of the items at once. This is a performance concern.
 */


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

/**
 *  English interface
 */
let text = text_en;


// NOTE: I would use React.Context for text but then on every cmp which use text I need to give Consumer cmp ?!!

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
            <Route exact path="/" render={() => (

               <App text={text}/>

            )} />;
            <Route exact path="/add-movie" render={() => (

               <AddMovie text={text}/>

            )} />
            <Route render={ () => (

               <NotFound text={text} />

            )} />
         </Switch>

         <Copyrights />

      </div>
      </ApolloProvider>
   </Router>
);

ReactDOM.render( routing, document.getElementById('root') );

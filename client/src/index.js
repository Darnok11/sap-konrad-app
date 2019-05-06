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
import { text_en, ports } from './resources/data';

/**
 *  English interface
 */
let text = text_en;


// TODO: I could use React.Context or cache
const cache = new InMemoryCache();
const client = new ApolloCient({
   uri: ports.graphql,
   cache
});


const routing = (
   <Router>
      <ApolloProvider client={client}>
      <div className="App">
         <Switch>
            <Route exact path="/" render={() => (

               <App text={text}/>

            )} />;
            <Route exact path="/add-movie" render={() => (

               <AddMovie text={text}/>

            )} />
            <Route exact path="/get-list" render={() => (

               <GetList text={text}/>

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

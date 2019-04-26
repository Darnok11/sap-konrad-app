/**
 * created with create-react-app
 * @param {[React, ReactDOM]} - react dependencies
 * @param {[App, AddMovie, NotFound]} - react components
 * @param {ApolloCient} - to connect to graphiql
 * @param {ApolloProvider} - to implement graphql queries
 * @param {InMemoryCache} - need cache to update data storage after mutation.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import AddMovie from './components/AddMovie';
import NotFound from './components/NotFound';
import { InMemoryCache } from 'apollo-boost';
import ApolloCient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import { gql } from 'apollo-boost';
/** local data */

// load english interface
import { text_en } from './resources/text_en';


/** ract-router */
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

// redux
// import { Provider } from 'react-redux'; //make redux store avaible to every component that have been passed as argument to connect() fn. It 'provides' the store into the <App /> . Can't use any component that have been included in connect and is not a child of <Provider />. Moreover Provider must have single store given as props:
// import store from './redux/store';
//
const cache = new InMemoryCache();
const client = new ApolloCient({
   uri: 'http://localhost:4000/graphql',
   cache
});

const on_page = 3;


const countQuery = gql`{ count }`;


/** Switch component helps us to render the components only when path matches otherwise it fallbacks to the not found component. */
const routing = (
   <Router>
      <ApolloProvider client={client}>
      <div>
         <Switch>
            <Route exact path="/" render={ (props) =>
                  <Query query={countQuery}>
                     {({ data, loading, error }) => {
                        if (loading) {
                           return <p>{text_en.loading}</p>;
                        }
                        if (error) {
                           return <p>{error.message}</p>;
                        }
                        return (<App {...props} count={data.count} text={text_en} on_page={on_page} />);
                     }}
                  </Query>
             } />;
            <Route path="/addmovie" render={ () => <AddMovie text={text_en}  /> } />
            <Route render={ () => <NotFound text={text_en} /> } />
         </Switch>
      </div>
      </ApolloProvider>
   </Router>
);
// here never alow to pass undefined values to app
const root = document.getElementById('root');

ReactDOM.render( routing, root );

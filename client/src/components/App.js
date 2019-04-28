import React from 'react';
// Components
import Header from './Header';
import Movies from './Movies';
import Footer from './Footer';
import Copyrights from './Copyrights';
import { Query } from 'react-apollo';
import {COUNT_QUERY} from '../graphql/queries';
import '../css/app.css';


class App extends React.Component {

   render() {
      const { text, count } = this.props;
      // NOTE: text and count should be in cache!
      return (
         <div className="sap-app">
            <Header text={text} />

            <Query query={COUNT_QUERY}>
               {(data, loading, error) => {
                  if (loading) {
                     return <p>{text.loading}</p>
                  }
                  if (error) {
                     return <p>{error.message}</p>
                  }
                  if (!data.count) { // if 0
                     return <p>{text.no_movies}</p>
                  }
                  return <Movies text={text} count={data.count} />
               } }
            </Query>

            <Footer text={text} count={count} />

            <Copyrights />
         </div>
      );
   }
}

export default App;

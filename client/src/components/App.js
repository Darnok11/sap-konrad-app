import React from 'react';
// Components
import Header from './Header';
import Movies from './Movies';
import Footer from './Footer';
import Copyrights from './Copyrights';
// import useFetch from '../js/useFetch';
import { Query, withApollo } from 'react-apollo';

import {COUNT_QUERY} from '../graphql/queries';
import '../css/app.css';

class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         movies_on_page: 3, //number of movies to load on page (the size of request)
      }
   }

   render() {
      const { text } = this.props;
      // TODO: text and count should be in cache!
      return (
         <div className="sap-app">
            <Header text={text} />

            <Query query={COUNT_QUERY}>
               {({loading, error, data}) => {
                  if (loading) {
                     return <p>{text.loading}</p>
                  }
                  if (error) {
                     return <p>{data.error.message}</p>
                  }
                  if (!data.count) {
                     return <p>{text.no_movies}</p>;
                  }

                  const pages = Math.ceil(data.count / this.state.movies_on_page);

                  return <Movies
                     movies_on_page={this.state.movies_on_page}
                     count={data.count}
                     text={text}
                     pages={pages}
                     />

               }}
            </Query>
         </div>
      );
   }
}


// <Movies count={data.count} text={text} />
export default withApollo(App);

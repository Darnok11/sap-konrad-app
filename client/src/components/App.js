import React from 'react';
import Header from './Header';
import Movies from './Movies';
import { Query } from 'react-apollo';
import { COUNT_QUERY } from '../graphql/queries';
import '../css/App.css';



class App extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         per_page: 3, //number of movies to load on page (the size of request)
      }
   }

   render() {
      const { text } = this.props;

      return (
         <div className="App-wrapper">

            <Header text={text} />

            <Query query={COUNT_QUERY}>
               {({data: { count } = {}, loading, error}) => {

                  if (loading) {
                     return <p>{text.loading}</p>
                  }
                  if (error) {
                     return <p>{error.message}</p>
                  }
                  if (!count) {
                     return <p>{text.no_movies}</p>;
                  }

                  const pages = Math.ceil(count / this.state.per_page);

                  return <Movies
                     per_page={this.state.per_page}
                     count={count}
                     text={text}
                     pages={pages}
                     />
               }}
            </Query>
         </div>
      );
   }
}


export default App;

import React from 'react';
import { Link } from 'react-router-dom';
import '../css/header.css';

class Header extends React.Component {
   constructor(props) {
      super(props);

      this.handleClick = this.handleClick.bind(this);
   }


   handleClick(e) {
      e.preventDefault();

      let myRequest = new Request('http://localhost:4002/list');

      fetch(myRequest, {
         method: 'GET',
         credentials: 'omit',
         mode: 'cors',
         cache: 'default'
      })
      .then(function(response) {
        if (!response.ok) {
          throw new Error('HTTP error, status = ' + response.status);
        }

        return response.blob();
      })
      .then(function(blob) {

         var url  = window.URL.createObjectURL(blob);
           window.location.assign(url);
      });

   }


   render() {
      const { text } = this.props;
      return (
         <div className="sap-header-buttons" >
            <Link to="/add-movie"><button>{text.add_movie}</button></Link>

            <span role="img" aria-label="Movie Camera">🎥</span>

            <button onClick={this.handleClick}>{text.get_list}</button>
         </div>
      );
   }
}

export default Header;

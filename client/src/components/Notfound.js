import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../css/Notfound.css";

class NotFound  extends Component {
   render() {
      return (
         <div className="App">
            <div className="App-header-buttons" >
               <button ><Link to="/">{this.props.text.go_back}</Link> </button>
            </div>
            <div className="sap-movie-notfound">
               <p>{this.props.text.not_found}</p>
            </div>
            <div className="App-footer-buttons">
               <Copyright />
            </div>
         </div>
      );
   }
}

const Copyright = function() {
   const date = new Date();

   return (<div className="App-copyright" id="copyright"> &#xA9; Konrad <span role="img" aria-label="Mushroom">🍄</span> {date.getFullYear()}</div>);
}


export default NotFound;

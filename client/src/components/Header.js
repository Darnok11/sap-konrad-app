import React from 'react';
import { Link } from 'react-router-dom';
import '../css/header.css';

class Header extends React.Component {
   render() {
      return (
         <div className="sap-header-buttons" >
            <Link to="/add-movie"><button>{text.add_movie}</button></Link>

            <span role="img" aria-label="Movie Camera">🎥</span>

            <Link to="/get-list"><button>{text.get_list}</button></Link>
         </div>
      );
   }
}

export default Header;

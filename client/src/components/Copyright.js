import React from 'react';


const Copyright = function() {
   const date = new Date();

   return (<div className="App-copyright" id="copyright"> &#xA9; Konrad <span role="img" aria-label="Mushroom">🍄</span> {date.getFullYear()}</div>);
};


export default Copyright;

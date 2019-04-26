function checkName( name ) {
   return (50 > name.length && name.length > 3 && /^[a-zA-Z\s]+$/.test(name) );
}

function checkActors( actors ) {
   /** I assume same rules for actors names like in title */
   if (!(actors + "").length) { return false  }

   for (let i = 0; i < actors.length; i++) {
      if (!checkName(actors[i])) {
         return false;
      }
   }

   return true;
}

function checkRating( rating ) {
   /** rating must be:
    * - bigger than 0
    * - smaller than 5
    */
    return ((rating + "").length && typeof rating === "number" && 0 < rating && rating < 5);
}


function checkState(input) {
   // TODO: I should check if has property name first
   return (
      checkName(input.title + "") &&
      checkName(input.director + "") &&
      checkRating(+input.rating) &&
      checkActors(input.actors)
   );
}

export { checkState, checkName, checkActors, checkRating };

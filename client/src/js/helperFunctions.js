/**
 * Check ISO 8601 date format (not extended) YYYY-MM-DDThh:mm:ss±hh:mm
 * @type {RegExp}
 */
const REGEXP_DATE = /^\d\d\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[0-5][0-9]):(0[0-9]|[0-5][0-9]).(\d\d\d)/;



/**
 * Check if letters and spaces only
 * @type {RegExp}
 */
const REGEXP_STRING = /^[a-zA-Z\s]+$/;



/**
 * If spaces and letters only and from 3 to 50 characters
 * @param  {String} title movie title taken from database
 * @return {Boolean}       true if ok
 */
function checkTitle( title ) {
   return (typeof title === 'string' && 50 > title.length && title.length > 3 && REGEXP_STRING.test(title) );
}



/**
 * Check YYYY-MM-DDThh:mm:ss±hh:mm fromat of createdAt variable
 * @param  {String} createdAt taken from database
 * @param  {RegExp} REGEXP_DATE check format
 * @return {Boolean}       true if ok.
 */
function checkDate( createdAt ) {
   return (typeof createdAt === 'string' &&  REGEXP_DATE.test(createdAt));
}



/**
 * If rating is bigger than 0 and smaller than 5
 * @param  {Number} rating movie rating taken from database
 * @return {Boolean}        return true if ok
 */
function checkRating( rating ) {
   return (typeof rating === 'number' && 5 > rating && rating > 0);
}



/**
 * Check title rating and createdAt with external functions
 * @param  {Object} input title, rating and createdAt (default values if undefined)
 * @return {Boolean}       true if all are ok
 */
function checkAll( input ) {
   const title = input.title || "";
   const rating = input.rating || 0;
   
   return (checkTitle(title) && checkRating(rating));
}


export { checkTitle, checkDate, checkRating, checkAll };

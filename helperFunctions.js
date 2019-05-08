// not used


/**
 * generate projection object for mongoose
 * @param  {Object} fieldASTs
 * @return {Project}
 */
function getProjection (fieldASTs) {
  return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
    projections[selection.name.value] = true;
    return projections;
  }, {});
}


/**
 * [generateSubstringOfISODate description]
 * @return {String} [description]
 */
function generateSubstringOfISODate() {
   let date = new Date().toISOString();
   return date.substring(0, date.length - 1);
}


/**
 * [generateId description]
 * @param  {Number} [bytes=10] [description]
 * @return {String}            Random id
 */
function generateId(bytes = 10) {
   return require('crypto').randomBytes(bytes).toString('hex');
}


/**
 * Need for object sorting
 * @param  {[type]} key           [description]
 * @param  {String} [order='asc'] [description]
 * @return {[type]}               [description]
 */
function compareValues(key, order='asc') {
  return function(a, b) {
    if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = (typeof a[key] === 'string') ?
      a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string') ?
      b[key].toUpperCase() : b[key];


    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order == 'desc') ? (comparison * -1) : comparison
    );
  };
}

function sortObjectByKey(obj, key) {
   // assume ascending
   return obj.sort(compareValues(key));
}

function sortObjectByKeyDescendingOrder(obj, key) {
   return obj.sort(compareValues(key, 'desc'));
}


/**
 * [findObjectByValue description]
 * @param  {[type]} obj   [description]
 * @param  {[type]} prop  [description]
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
function findObjectByValue(obj, prop, value) {
   // if found return object if not empty string
   let res = obj.find((o) => o[prop] === value);
   if (res) {
      return res;
   } else {
      throw new Error('there is no such object with value' + value);
   }
}


module.exports = {
   generateSubstringOfISODate,
   generateId,
   compareValues,
   sortObjectByKey,
   sortObjectByKeyDescendingOrder,
   findObjectByValue
};

/**
 * This error handler helps to DRY the code in the resource files by replacing the need to type out a try{}/catch{} or a .then()/.catch() block within each of the async functions.
 * 
 * Instead, the asyncErrorBoundary takes the async function in as it's first parameter, "delegate," and runs it as normal.  
 */

 function asyncErrorBoundary(delegate, defaultStatus) {
    return (req, res, next) => {
      Promise.resolve()
        .then(() => delegate(req, res, next))
        .catch((error = {}) => {
          const { status = defaultStatus, message = error } = error;
          next({ status, message });
        });
    };
  }
  
  module.exports = asyncErrorBoundary;
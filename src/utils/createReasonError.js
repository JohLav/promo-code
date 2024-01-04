module.exports = { createReasonError };

/**
 * Function to create a reason error object with a specified name and message
 *
 * @param nameError
 * @param messageError
 * @returns {{nameError, messageError, isOR: boolean}}
 */
function createReasonError(nameError, messageError) {
  // Return an object representing the reason error with specified name, message, and isOR flag set to false
  return {
    isOR: false,
    nameError: nameError,
    messageError: messageError,
  };
}

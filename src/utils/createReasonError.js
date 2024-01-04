module.exports = { createReasonError };

/**
 *
 * @param nameError
 * @param messageError
 * @returns {{nameError, messageError, isOR: boolean}}
 */
function createReasonError(nameError, messageError) {
  return {
    isOR: false,
    nameError: nameError,
    messageError: messageError,
  };
}

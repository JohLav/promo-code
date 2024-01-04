module.exports = { createReasonError };

function createReasonError(nameError, messageError) {
  return {
    isOR: false,
    nameError: nameError,
    messageError: messageError,
  };
}

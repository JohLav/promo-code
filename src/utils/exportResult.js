module.exports = { exportResult };

/**
 *
 * @param reason
 * @param promoCode
 * @returns {{promocode_name}}
 */
function exportResult(reason, promoCode) {
  // Initialise output variable
  let result = {
    promocode_name: promoCode.name,
  };

  // If accepted
  if (reason.isOK) {
    result.status = "accepted";
    result.advantage = promoCode.advantage;
  }
  // If denied
  else {
    const objDeniedReason = {};
    objDeniedReason[reason.nameError] = reason.messageError;
    result.status = "denied";
    result.reasons = objDeniedReason;
  }

  return result;
}

module.exports = { exportResult };

/**
 * Function to export the result of a redeemInfo check, including status, reasons, and advantages.
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

  // If redeemInfo is accepted
  if (reason.isOK) {
    result.status = "accepted";
    result.advantage = promoCode.advantage;
  }
  // If redeemInfo is denied
  else {
    // Create an object to store the specific reason for denial
    const objDeniedReason = {};
    objDeniedReason[reason.nameError] = reason.messageError;

    // Update the result object with denial status and reasons
    result.status = "denied";
    result.reasons = objDeniedReason;
  }

  // Return the final result object
  return result;
}

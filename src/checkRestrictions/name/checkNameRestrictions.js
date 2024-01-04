const { createReasonError } = require("../../utils/createReasonError");
module.exports = { checkNameRestrictions };

function checkNameRestrictions(redeemName, restrictionName) {
  // Initialise output variable
  let reason = { isOK: true };

  // If the name is not equal, specify it
  if (redeemName.promocode_name !== restrictionName.name) {
    createReasonError("name", "isIncorrect");
  }

  return reason;
}

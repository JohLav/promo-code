const { createReasonError } = require("../../utils/createReasonError");
module.exports = { checkAgeRestrictions };

function checkAgeRestrictions(redeemAge, restrictionAge) {
  // Initialise output variable
  let reason = { isOK: true };

  if (restrictionAge.gt) {
    if (redeemAge < restrictionAge.gt) {
      return createReasonError("age", "isNotGT");
    }
  }
  if (restrictionAge.lt) {
    if (redeemAge > restrictionAge.lt) {
      return createReasonError("age", "isNotLT");
    }
  }
  if (restrictionAge.eq) {
    if (redeemAge !== restrictionAge.eq) {
      return createReasonError("age", "isNotEq");
    }
  }

  return reason;
}

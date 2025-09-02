const crypto = require("crypto");

const generateShortId = () => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "BK";

  const randomValues = new Uint32Array(4); // Only need 4 more characters since prefix is 2
  crypto.randomFillSync(randomValues); // Use randomFillSync instead

  for (let i = 0; i < 4; i++) {
    result += chars[randomValues[i] % chars.length];
  }
  return result; // Example: "BK3A7X"
};

module.exports = { generateShortId };

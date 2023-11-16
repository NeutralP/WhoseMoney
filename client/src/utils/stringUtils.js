function isLowerCase(string) {
  return /^[a-z]+$/.test(string);
}

function isUpperCase(string) {
  return /^[A-Z]+$/.test(string);
}

// Uppercase the first letter in a string if its a letter
const uppercaseStr = (str) => {
  // str.length === 1 && str.match(/[a-z]/i)
  if (str.charAt(0).toUpperCase() != str.charAt(0).toLowerCase()) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str;
};

export default { isLowerCase, isUpperCase, uppercaseStr };

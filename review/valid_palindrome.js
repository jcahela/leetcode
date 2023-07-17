var isPalindrome = function(s) { // "A man, a plan, a canal: Panama"
  let left = 0;
  let right = s.length - 1;
  let isSpecialCharacter = /[\W\s_]/g;

  while (left < right) {
      const leftChar = s[left];
      const rightChar = s[right];
      if (isSpecialCharacter.test(leftChar)) {
          left += 1;
          continue;
      }

      if (isSpecialCharacter.test(rightChar)) {
          right -= 1;
          continue;
      }

      if (leftChar.toLowerCase() !== rightChar.toLowerCase()) {
          console.log(isSpecialCharacter.test(leftChar));
          return false;
      }

      left++;
      right--;
  }

  return true;
}

console.log(isPalindrome("A man, a plan, a canal: Panama"));

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

/**************** Attempt 2 *********************/

/**
 * @param {string} s
 * @return {boolean}

Description: 

A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.

Example 1:

Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
Example 2:

Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.
Example 3:

Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.

-----------------------------------------------

Thoughts:

I could use regex to determine if a specific letter in the string is alphanumeric /[a-zA-Z0-9]/
I could then use two pointers, left starting at the beginning of the string, and right starting at the end of the string
Then, first check if the letter at the left pointer is alphanumeric - if it isn't, increment the left pointer
Next, check if the letter at the right pointer is alphanumeric - if it isn't, decrement the right pointer
Once both pointers point at an alphanumeric, I compare the two lowercased
    If they aren't the same character lowercased, then I return false
At the end, return true

Pseudocode:
/*
1. Instantiate a variable isAlphaNumeric with regex /[a-zA-Z0-9]/
2. Instantiate a left pointer at 0
3. Instantiate a right pointer s.length - 1
4. While left is less than right
    1. If the character at the left pointer is not alphanumeric, increment left pointer
    2. Else if the character at the right pointer is not alphanumeric, increment right pointer
    3. Else compare if the two are the same character when lowercased
        1. If no, return false
        2. Increment left and decrement right
5. Return true
*/
/*
Time complexity: O(n) - Where n is the length of the input string s since we only iterate through it once with the two pointers
Space complexity: O(1) - Since we only use pointers and regex and they are all O(1) in space

*/

var isPalindrome = function(s) {
    const isAlphanumeric = /[a-zA-Z0-9]/;
    let l = 0;
    let r = s.length - 1;
  
    while (l < r) {
        if (!isAlphanumeric.test(s[l])) {
            l += 1;
        } else if (!isAlphanumeric.test(s[r])) {
            r -= 1;
        } else {
            if (s[l].toLowerCase() !== s[r].toLowerCase()) {
                return false;
            }
            l += 1;
            r -= 1;
        }
    }
  
    return true;
  }
  
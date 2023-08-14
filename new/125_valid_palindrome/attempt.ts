/*

I could start two pointers at both ends, and compare the letters at the pointers

I need to find a way to skip non alphanumeric characters so I'm always comparing two alphanumeric characters

I can use regex:

const regex = /[a-zA-Z0-9]/g

Pseudocode:
1. Instantiate a left pointer at 0
2. Instantiate a right pointer at s.length - 1
3. Create a regex var at /[a-zA-Z0-9]/
4. While left is < right
    1. Instantiate a leftIsAN at regex.test(s[left]);
    2. Instantiate a rightIsAN at regex.test(s[right]);
    3. if !leftIsAN
        1. increment left
    4. Else if !rightIsAN
        2. decrement right
    5. Else (both are alphanumeric since the above statements weren't entered, so you've found two comparable alphanumeric characters)
        1. if lowercased leftIsAN doesn't equal lowercased rightIsAN
            1. Return false
        2. increment left AND decrement right
5. Return true

Time complexity: O(s) - Where s is the length of the input string s, since we only iterate through it once with two pointers
Space complexity: O(1) - Since I only use pointers

*/

//     l r
// "race a car"

function isPalindrome(s: string): boolean {
  let left = 0;
  let right = s.length - 1;
  const regex = new RegExp('[a-zA-Z0-9]');

  while (left < right) {
      const leftIsAN = regex.test(s[left]);
      const rightIsAN = regex.test(s[right]);

      if (!leftIsAN) {
          left += 1;
      } else if (!rightIsAN) {
          right -= 1;
      } else {
          console.log(s[left], s[right]);
          if (s[left].toLowerCase() !== s[right].toLowerCase()) {
              return false;
          }
          left += 1;
          right -= 1;
      }
  }

  return true;
};

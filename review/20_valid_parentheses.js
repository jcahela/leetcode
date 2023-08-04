/**
 * @param {string} s
 * @return {boolean}

()[]{}

{([])}

If I use a stack to hold all open parentheses, then match each closed parentheses with their open counterparts from the top of the stack, I would be able to determine that each parenthesis pair is closed correctly and in the right order

[]

Then, if the stack is empty at the end of running through all parentheses, I know all the pairs occurred. If any open parentheses remain, or if I encounter a closed parentheses that doesn't have its open counterpart at the top of the stack, then there are invalid pairs.

Pseudocode:

1. Instantiate a stack array
2. Instantiate an object that holds the closed parentheses as keys, and their open counterparts as values
3. Iterate over the input string s
    1. If the stack is empty AND you encounter a character that exists as a key in the map:
        2. It's closed and has no open counterpart, so return false
    3. else (stack is not empty)
        1. If the current character doesn't exist in the map as a key, it's open, so push it to the stack
        2. If the current character does exist in the map as a key, it's closed, so check if its value in the map is the same as the top char in the stack
            3. If they match, pop the top char off
            4. If they don't match, return false
4. Return !stack.length (if the stack is empty at this point, all pairs were found. If it has any open parentheses left, that means no closed counterparts were found)

Time complexity: O(n) - since we're only iterating over the input s once
Space complexity: O(n) - since we use a stack that can hold s number of items if s includes all open parentheses


*/

var isValid = function(s) {
  const stack = [];
  const parenMap = {
      '}': '{',
      ']': '[',
      ')': '('
  }

  for (char of s) {
      if (!stack.length && parenMap[char]) {
          return false;
      } else {
          if (!parenMap[char]) {
              stack.push(char);
          } else {
              if (parenMap[char] === stack[stack.length - 1]) {
                  stack.pop()
              } else {
                  return false;
              }
          }
      }
  }

  return !stack.length;
};

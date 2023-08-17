Time to Complete: 30m

Method: Using a backtrack function and calling it recursively, I can generate all possible permutations of valid parentheses based on the max number of pairs (input n), and use specific decisions within the recursive backtrack function in order to decide when to add an open or close parentheses. Since the max number of pairs is n, and open parentheses must come before its closed counterpart, at any given moment while generating a valid parentheses string of n pairs, I will have to know that the open parentheses don't exceed the max (if it doesn't exceed the max, I can add another open parenthesis), and I will also have to know that the current number of close parentheses in the string being built is less than the current open parentheses in the string being built, since I can only add a close parenthesis if there is an un-closed open parenthesis available in the string. Calling backtrack after checking each of the above 2 conditions causes recursion to consider these two conditions at each possible step of building a valid parenthesis string of pairs n. With my base case being the string being built is of length n * 2 (which means it has the correct amount of pairs, n pairs), I can then push that answer onto an answer array outside the backtrack function, and return up the recursive call stack, to check other permutations. At the end of the recursive call, I will have built all possible valid parentheses strings and pushed them onto the answer array.

Pseudocode: 
/*
1. Instantiate an answer array
2. Create a backtrack function with the arguments (answerString, openCount, closeCount)
  1. As the base case, check if the answerString is of length n * 2, and if it is, add it to the answer array and return. I should still have reference to n and the answer array since I'll be calling the recursive function within the generateParenthesis function
  2. For the first condition in the recursive call, check if the openCount is less than n.
    1. If it is, I can add an open parentheses safely without worry of it invalidating the string, since open parentheses come before closed ones in a valid parentheses string.
    2. Then, call the backtrack solution with the updated string and openCount
  3. For the second condition, check if the closeCount is less than the openCount, at this point in each recursive call, I'd have a string that either has max number of open parentheses, or open parentheses that are greater than the closed one, since I add open parentheses first.
    1. If it is, add a closed parentheses, then call the function again with the updated string and count
3. Once the backtrack function is defined, call it with the appropriate arguments: starts as an empty answer string, open count is 0, close count is 0
4. Return the answer array
*/

Code:
```js
var generateParenthesis = function(n) {
  const ans = [];

  function backtrack(answerString, openCount, closeCount) {
    if (answerString.length === n * 2) {
      ans.push(answerString);
      return;
    }
    if (openCount < n) backtrack(answerString + '(', openCount + 1, closeCount);
    if (closeCount < openCount) backtrack(answerString + ')', openCount, closeCount + 1);
  }

  backtrack("", 0, 0);
  return ans;
};
```

Time Complexity: O(2^2n) => O((2^2)^n) => O(4^n)
Explanation: Since I am calling the backtrack function at every decision point in the recursive call, and since there are 2 decisions to be made in the recursive call, I can at worst call the backtrack function 2 times every time I recursively call the backtrack function.This turns the recursive time complexity from O(2^n) to O(2^2n), since n (the number of times I call backtrack) is at worst 2 for each recursive call.

Space Complexity: O(n)
Explanation: Where n is the input max number of pairs. Since the max number of pairs is n, and the function makes at max n recursive calls, the recursive call stack at its worst time is n big.

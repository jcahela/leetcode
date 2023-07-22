/**

Time to Complete: 45m

Method: Using a sliding window, you can create two hashmaps to verify equivalency, to verify that within the window there is at least every letter in t and more than or equal the amount of those letters. To do this, we have two hashmaps that will only keep track of the letters in t for the tMap, and another hashmap that will only keep track of the letters it needs and how much of those letters it currently has in the window. For example:

s = "ADOBECODEBANC"
t = "ABC"

Originally, the sWindowCount will look like this: {'a': 0, 'b': 0, 'c': 0}, the tCount will look like this: {'a': 1, 'b': 1, 'c': 1}. The number of correct letter counts will be the number of keys in t, in this case 3. And the number of matching letters we have in sWindowCount will be 0. Since 3 !== 0, this isn't a valid window. Then, as you increment the window, it includes the first letter. If the first letter is in the sWindowCount map, add to its count, else keep incrementing. In the example above, the first letter IS in the sWindowCount map, so increment its count by 1. Then check if the letter you just incremented is the same as that letter in t. If it's the same, that means you went from it being not a match, to that letter becoming a match, so increment the haves count by 1. Then, check if the number of number of haves is equal to the number of needs (3), if that's true, then the window counts as a valid answer. Save the left and right indices in a variable outside the loop if its difference is less than the current difference of indices assigned to the variable (or if the variable is an empty string, which is how it gets initialized). 

You keep going like this until the number of matches you have is the same as the number of matches you need, and once that condition is met, you get a valid result. Once you get a valid result, you store it if it's better than your current result, then you increment the left pointer until you get to a point where you don't have enough matches. As you increment the left pointer, pop out the letters that you're leaving behind, and check if the current window is still valid. If it is, store it if it's better than your current result, else keep going. Continue incrementing the right pointer until the window is invalid again. Then, repeat. Increment right pointer, add to the windowCounts, check if number of haves is now equal to number of needs, if it is you found a valid string, replace the current stored string if this one is shorter than it, increment l until the condition isn't met, each time checking if the current valid substring is less than the stored one, etc.

/*
Pseudocode: 
Setup:
1. Instantiate a left pointer at 0
2. Instantiate a right pointer at 0
3. Instantiate a tMap that'll hold t's counts
4. Instantiate a windowCount map that'll hold the current window's counts of valid letters
5. Iterate over t, and fill the map with its letter counts
6. Iterate over the keys in tMap, and store it as keys in the windowCount map at 0 for each value
7. Instantiate a currentMatches variable at 0
8. Instantiate a matches needed at Object.keys[tMap].length
9. Instantiate a validIndices variable as undefined

Window shifting time:
10. While the right pointer is less than the length of s
  1. Is the current letter at r in the windowCount map? If yes:
    1. increment the count of that letter by 1
    2. If the count of that letter in the windowCount map is now the same as the count of that letter in the tMap: add 1 to the currentMatches variable
    3. If the currentMatches variable is now equal to the matchesNeeded variable:
      1. You've found a valid substring. First, check if the current validIndices variable is truthy AND that validIncies[1] - validIndices[0] > r - l:
        1. If it is truthy and the difference between the current valid indices is greater than the current difference, the current valid window is a smaller substring. Replace the current validIndices with l and r in a 2-index array [l, r].
      2. Now that you've found a valid substring, we start incrementing the left pointer. While currentMatches === matchesNeeded:
        1. Check if the current validIndices variable is truthy AND that validIncies[1] - validIndices[0] > r - l: If yes the current window is valid and better
          1. Replace currentIndices with [l, r]
        2. Does the current letter at l exist in the windowCount map? If yes
          1. Subtract 1 from the count at that letter in windowCount
          2. Check if that letter's count in windowMap is < that letter's count in tMap: If yes you just lost a match
            1. Subtract 1 from currentMatches
        3. Increment the left pointer
      (Note: we can combine steps 1 and 2 above by starting with the while loop, and checking for the condition of current validIndices variable is truthy AND that validIncies[1] - validIndices[0] > r - l as the first step of the while loop)
      3. At this point, you no longer have a valid substring, so you can continue incrementing r until you get a valid substring again
  2. At this point the currentMatches variable shouldn't equal matchesNeeded, so increment the right pointer

11. Slice the string s at the current validIndices and return that string: return s.slice(validIndices[0], validIndices[1] + 1) (+1 since slice is exclusive)
*/

/*

Time Complexity: O(n)
Explanation: Since we only use left and right pointers to iterate through the map, and since we only use O(1) operations to update the count maps and compare the matches we need vs the matches we have, the overall time complexity will be O(n)

Space Complexity: O(t)
Explanation: Since we only use 2 hashmaps that'll hold t number of keys, and the rest pointers, the most space we'll need is O(2t), which simplifies to O(t).

*/


var minWindow = function(s, t) {
  let l = 0;
  let r = 0;
  const tCount = {}; // {a: 1, b: 1, c: 1}
  const windowCount = {}; // {a: 1, b: 1, c: 1}

  for (char of t) {
      tCount[char] ? tCount[char] += 1 : tCount[char] = 1;
  }
  for (uniqueChar of Object.keys(tCount)) {
      windowCount[uniqueChar] = 0;
  }

  let currentMatches = 0; // 3
  let matchesNeeded = Object.keys(tCount).length; // 3
  let validIndex; // undefined

  while (r < s.length) {
      const currentRLetter = s[r]; // C
      if (tCount[currentRLetter]) {

          windowCount[currentRLetter] += 1;
          if (windowCount[currentRLetter] === tCount[currentRLetter]) {
              currentMatches += 1;
          }

          while (currentMatches === matchesNeeded) {
              if (!validIndex) {
                  validIndex = [l, r];
              }

              if (validIndex && (validIndex[1] - validIndex[0]) > (r - l)) {
                  validIndex = [l, r];
              }

              const currentLLetter = s[l];
              if (tCount[currentLLetter]) {
                  windowCount[currentLLetter] -= 1;
                  if (windowCount[currentLLetter] < tCount[currentLLetter]) {
                      currentMatches -= 1;
                  }
              }

              l += 1;
          }

      }

      r += 1;
  }

  let minimumWindowSubstring = "";

  if (validIndex) {
      minimumWindowSubstring = s.slice(validIndex[0], validIndex[1] + 1);
  }

  return minimumWindowSubstring;
};

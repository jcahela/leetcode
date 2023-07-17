/**

Time to Complete: 30m

Method: With any given window, we need to know 2 things. 1) The most frequent letter that occurs in that window (this is the letter we want to swap to for the other letters to see if we can make a valid repeating substring) and 2) The length of the window minus the number of that most frequent letter in order to get the number of swaps we need for the whole window to be a valid repeating substring. This difference can be compared to the input k. This method will be applied to the sliding window technique to find any valid windows where, with k number of swaps, we can make a valid repeating substring, and count the length of that window before moving onto the next window. When moving on, we increment the left pointer until you get back to a valid check of windowLength - mostFrequentLetter <= k. In order to find a most frequent character, you can use a hashmap to get a count of each character, then get the letter with the highest value/count from that hashmap.

Pseudocode: 

/*
1. Instantiate a left pointer that starts at 0
2. Instantiate a hashmap that holds the count of each letter in the string
3. Instantiate a result variable that starts at 0
4. Iterate over the string with a right pointer that starts at 0
  1. For each iteration, add the current letter to the hashmap:
    If it exists in the hashmap, increment by 1
    If it doesn't exist in the hashmap, set it as a key in the hashmap equal to 1
  2. Subtract the length of the window (right - left + 1) by the most frequent letter in the hashmap (Math.max(Object.values(hashmap))) and check if that value is greater than k. If it is, we know the window is invalid
    1. Subtract the current letter at the left pointer from the count map at that letter's position
    2. Increment the left pointer
  3. Set the result variable to be the length of the window (right - left + 1)
5. Return the result variable
*/
/*
Code: 

Time Complexity: O(26*n)
Explanation: Where n is the length of the input string since we only increment through it once, but at each iteration we check the max value in the hashmap to find the most frequent letter, and since the hashmap will only be filled with uppercase alphabetical characters, its max number of keys is 26.

Space Complexity: O(26)
Explanation: Since 26 is the max number of capital letters we could put in the hashmap (if the input string includes all letters in the alphabet), the largest the hashmap can get is a length of 26 letters, each with varying values that represent their counts. So the overall space complexity is the hashmap of space 26 plus the various pointers and result variable used, which simplifies to O(1).

*/

var characterReplacement = function(s, k) {
  let l = 0;
  let counts = {};
  let res = 0;
  for (let r = 0; r < s.length; r += 1) {
      if (counts[s[r]]) {
          counts[s[r]] += 1;
      } else {
          counts[s[r]] = 1;
      }

      if (((r - l + 1) - Math.max(...Object.values(counts))) > k) { // fixes an invalid window
          counts[s[l]] -= 1;
          l += 1;
      }

      res = Math.max(res, r - l + 1);
  }
  return res;
};

/*

Since I need to find a substring, which is a string within the input s that is an unbroken string of non-repeating characters (not a subsequence which is any of the letters in s that are not repeating, regardless of whether they're next to each other), I can use a sliding window approach

currentMax = 3

Current Window Hashmap:
{
    'a': 0,
    'b': 1,
    'c': 0
}

                 r
               l
 0 1 2 3 4 5 6 7
"a b c a b c b b"

while r is < s.length:

Add the current letter at r to the hashmap:
    if it exists, add 1 to it, if it doesn't exist, set the letter as the key with its value as 1
While the current letter at r is 2, you've got an invalid window
    So decrement the letter at l and increment l
At this point you should have a valid window, so set currentMax to Math.max((r - l + 1), currentMax)
Increment r

Pseudocode:
1. Instantiate a max value at 0
2. Instantiate an l pointer at 0
3. Instantiate an r pointer at 0
4. Instantiate a letters hashmap at {}
5. While r < s.length
    1. If the current letter at r exists in the hashmap, add 1 to it, else set it equal to 1
    2. While the current letter at r is 2 (you've got an invalid window)
        1. Decrement the letter at l
        2. Increment l
    3. Set max to Math.max((r - l + 1), max)
    4. Increment r
6. Return max

Time complexity: O(s) - Where s is the length of the input string. Since I'm only iterating through s once to find the longest substring
Space complexity: O(t) - Where t is the length of the longest substring without repeating characters, since I'm storing that many keys in the hashmap at most

*/

function lengthOfLongestSubstring(s: string): number {
  let max = 0;
  let l = 0;
  let r = 0;

  let letters = {};

  while (r < s.length) {
      letters[s[r]] ? letters[s[r]] += 1 : letters[s[r]] = 1;
      while (letters[s[r]] === 2) {
          letters[s[l]] -= 1;
          l += 1;
      }
      max = Math.max((r - l + 1), max);
      r += 1;
  }

  return max;
};

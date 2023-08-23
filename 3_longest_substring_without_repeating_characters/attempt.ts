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

/************** Attempt #2 fast, easy, kinda clean code ****************/

/*

Use a sliding window and hashmap to hold the letters in the current window
whenever you're at a letter that's in the hashmap already, it's not valid anymore, so remove the letter from the left pointer then increment left, and continue until the letter that was just incremented is back to 1

Pseudocode:
1. Instantiate a left pointer at 0
2. Instantiate a right pointer at 0
3. Instantiate a max var at 0
4. Instantiate a letterMap at {}
5. While r < s.length
    1. Check if the letter at right exists in the map
        1. If so, increment the count at that letter in the map
        2. Then, while the count at that letter in the map is > 1
            1. Decrement the letter at l
            2. If the count of the letter at l is now 0, delete that letter from the map
            2. Increment l
    2. At this point, you should have a valid window, so set max to be Math.max(r - l + 1);
    3. Increment r
6. Return the max var

Time complexity: O(n) - Since we're only traversing forward through s once with the sliding window
Space complexity: O(m) - Where m is the number of unique characters in s, since we store a letter count of each letter in s

*/
/*
{
    'b': 1,
    'c': 1
}
*/
//              r
//            l
//  0 1 2 3 4 5 6 7
// "a b c a b c b b"

function lengthOfLongestSubstring(s: string): number {
    let l = 0;
    let r = 0;
    let max = 0; // 3
    const counts = {};

    while (r < s.length) {
        if (counts[s[r]]) {
            counts[s[r]] += 1;

            while (counts[s[r]] > 1) {
                counts[s[l]] -= 1;
                if (counts[s[l]] === 0) delete counts[s[l]];
                l += 1;
            }
        } else {
            counts[s[r]] = 1;
        }

        max = Math.max(max, (r - l + 1));
        r += 1;
    }

    return max;
};

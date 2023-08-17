/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}

It seems that order matters. In the below example, s2 contains a permutation of s1 because it contains the letters "ba" directly next to each other.

s1 = "ab", s2 = "eidbaooo"

But when s2 contains "b" and "a" separated by a letter that's not in s1, it's false:

s1 = "ab", s2 = "eidboaoo"

In order to maintain that s2 contains a permutation of s1, I'd need to have a valid window of that permutation. Maybe I could incorporate a set to determine if the current letter I'm looking at is in s1, but that doesn't account for duplicate letters in s1. Maybe if I use a count for each letter, I could subtract from that count whenever I'm in a given window checking for a permutation

s1 = "abab", s2 = "eidbaaboo"

"baab" in s2 is a permutation of "abab" in s1, so that should be true

Map: {
    "a": 0,
    "b": 0
}

 l 
 0 1 2 3 4 5 6 7 8
"e i d b a a b o o"


Map: {
    "a": 0,
    "b": 0
}

                   l
 0 1 2 3 4 5 6 7 8 9 10 11 12 13
"b i d b a b b d o a  b  b  a"

1. Instantiate a left and right pointer at 0
2. Create a count map of s1
3. While left is less than the length of s2:
    1. Is the letter at the left pointer in the count map? If yes: 
        1. it's the start of a possible valid permutation window
            Once in a valid permutation window, we need to know if every letter in the permutation window is in the s1 string, and in the right amounts. If at any point you either see 1) a character not in s1, or 2) too many characters that are in s1, then it becomes an invalid window, and I need to increment l until it's a valid window again or set l to be after the invalid character. In the case of 1) a character not in s1, I need to set left pointer to be the index AFTER that invalid character. In the case of 2) too many characters that are in s1, I need to add back the letter count of the current letter at l, then increment l until the count map is valid (no negative numbers) 
        2. Subtract the current letter at r (should be the same letter at l at first) from the count map
        3. while r - l + 1 is less than the length of s1 AND l < r (l hasn't overlapped r)
            1. increment r
            2. check if the letter at r is in the count map. If yes:
                1. Subtract it from the count map
                2. Check if the countmap contains any negatives (that means we've got too many in valid characters in the current window). If yes:
                    1. While the count map contains negatives: add the current letter at l back to the count map, and increment l
            3. If no:
                1. Set l to be the 1 after the current r index (r + 1) (this will break out of the current while loop)
                2. Reset the count map, and check again
            4. If r - l + 1 === the length of s1: (this means we've passed the above negative check and are still in a window that is exactly the length of s1, so we've found a valid window since we didn't need to increment l)
                1. Return true
    2. If no: increment the left pointer
4. Return false

Time complexity: O(s1*s2) - since we increment through s2 and check the counts of characters of s1 in a count map at each iteration once inside a potential valid window. If the whole of s2 is a series of valid windows, then we'd iterate through the whole thing and run s1 length operations at each iteration.

Space complexity: O(s1) - since we create a count map from the s1 string

 */

// s1 = "a" s2 = "ab"

//  l r
//  1 2 
// "a b"
var checkInclusion = function(s1, s2) {
  let l = 0;
  let r = 0;
  const countMap = {}; // { 'a': 1 }

  for (char of s1) {
      countMap[char] ? countMap[char] += 1 : countMap[char] = 1;
  }

  let s1Counts = countMap; // { 'a': 0 }

  while (l <= s2.length - s1.length) {
      if (s1Counts[s2[l]]) {
          r = l;
          s1Counts[s2[r]] -= 1;
          while (l < r && r - l <= s1.length) {
              r += 1;
              if (s1Counts[s2[r]]) {
                  s1Counts[s2[r]] -= 1;
                  while (Object.values(s1Counts).some(num => num < 0)) {
                      s1Counts[s2[l]] += 1;
                      l += 1;
                  }
              } else {
                  l = r + 1;
                  s1Counts = countMap;
              }
              if (r - l + 1 === s1.length && Object.values(s1Counts).every(num => num === 0)) {
                  return true;
              }
          }
      } else {
          l += 1;
      }
  }

  return false;
};

// Failed: Test 63: Test case s1 = "a" s2 = "ab"


/* SECOND ATTEMPT */

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}

            l
0 1 2 3 4 5 6 7 8
e i d b a o o o

 */
var checkInclusion = function(s1, s2) {
  let l = 0;
  let r = s1.length - 1;

  // 1. create a letter count map of s1
  const s1Count = {};

  for (char of s1) {
      s1Count[char] ? s1Count[char] += 1 : s1Count[char] = 1;
  }

  while (l < (s2.length - s1.length + 1)) { // 8 - 2 + 1 = 7
      // 2. Iterate over from l to r, create a count map
      const windowCount = {};
      for (i = l; i <= r; i += 1) {
          windowCount[s2[i]] ? windowCount[s2[i]] += 1 : windowCount[s2[i]] = 1;
      }

      // 3 Compare s1Count and windowCount
      // {'a': 1, 'b': 1}
      // {'e': 1, 'i': 1}
      let allLettersMatch = true;
      const windowLetters = Object.keys(windowCount); // ['e', 'i']
      for (letter of windowLetters) {
          if (!s1Count[letter] || s1Count[letter] !== windowCount[letter]) { // if the letter doesn't exist in s1, or if the amount of the letter doesn't match the amount in s1, it isn't a permutation, increment l and r, and break out of the loop
              l += 1;
              r += 1;
              allLettersMatch = false;
              break;
          }
      }
      // if allLettersMatch is still true, that means you went through all letters in windowLetters, and they 1) existed in the s1Count map, and 2) existed in the same amount in the s1Count map and the windowCount map
      if (allLettersMatch) {
          return true;
      }
  }
  // if you finish the above while loop without returning true, you never found a window with exact matching letters, so return false
  return false;
};

// Succeeded, but is slow:
// Runtime = 2891 ms, beats 19.39% of users
// Memory = 117.61 mb, beats 5.07% of users

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

/**************************** Attempt 2 ********************************** */

/*

If I use a fixed sliding window of s1 length, I can check if the current window is a permutation of s1

How would I check if the current window is a permutation of s1?

Have a hashmap of s1:

s1 {
    'a': 1,
    'b': 1
}

Then create a hashmap of the current window outside the while loop

window {
    'e': 1,
    'i': 1
}

Then check if windowMap has the same letters as s1 map, and the same amount of those letters

    if at any point the letters don't match, or the letters do match but the counts of the letters don't match:
        I shift the window by 1
        Then add/subtract as needed from the window map
        Then recompare the new windowMap. Does it have the same letters as s1 map, and the same amount of those letters?

Pseudocode:
1. Instantiate an s1Counts at {}
2. Iterate through s1 and fill the s1Counts hashmap with letters and counts in s1
3. Instantiate a left pointer at 0
4. Instantiate a right pointer at s1.length - 1 (if s1 is 2, I want the window to have 2 letters, so from 0 to index 1, which would be 2 - 1 = 1 as the index)
5. Instantiate a windowCounts at {}
6. Iterate through the window and fill the windowCounts hashmap with letters and counts in the current window
7. While (r < s2.length)
    // First check if the current window has the same letters and the same amount of those letters as s1 map
    1. Instantiate a isPermutation at true
    2. Iterate through the keys of the windowCounts object
        1. if at any point, the current letter is not in s1Counts, or the letter IS in s1Counts but a different frequency than the same letter in windowCounts:
            1. set isPermutation to false
            2. Then, break from this loop
    3. If at this point, isPermutation is still true, it's a permutation of s1, so return true
    4. Else (isPermutation was switched to false in above step 7.2.1.1)
        1. Increment r, add new letter at r to windowCounts if exists
        2. Remove letter at l from windowCounts, increment l
8. Return false (at this point, every window was found to be not a permutation)

Time complexity: O(s1 + s2) - Since I need to iterate through s1 to create an s1Count map, and iterate through s2 to find all possible windows to be permutations

Space complexity: O(s1) - Where s1 is the number of unique letters in s1, since windowCount would have the same number of letters as s1, and can at most have s1 number of unique letters as keys, I'm storing a size of s1 twice, so it simplifies to s1 

*/

function checkInclusion(s1: string, s2: string): boolean {
    let s1Counts = {};
    for (const letter of s1) {
        s1Counts[letter] ? s1Counts[letter] += 1 : s1Counts[letter] = 1;
    }
    let l = 0;
    let r = s1.length - 1;

    let windowCounts = {};

    for (let i = l; i <= r; i += 1) {
        windowCounts[s2[i]] ? windowCounts[s2[i]] += 1 : windowCounts[s2[i]] = 1;
    }

    while (r < s2.length) {
        let isPermutation = true;
        for (const windowLetter of Object.keys(windowCounts)) {
            if (!s1Counts[windowLetter] || s1Counts[windowLetter] !== windowCounts[windowLetter]) {
                isPermutation = false;
                break;
            }
        }
        if (isPermutation) {
            return true;
        } else {
            r += 1;
            windowCounts[s2[r]] ? windowCounts[s2[r]] += 1 : windowCounts[s2[r]] = 1;
            windowCounts[s2[l]] -= 1;
            if (windowCounts[s2[l]] === 0) {
                delete windowCounts[s2[l]];
            }
            l += 1;
        }
    }

    return false;
};

/****************** Attempt #3 - Using alphabet array with charCodeAt *********************/

/*

I need two alphabet arrays for s1 and s2 to count how many letter counts each have

I need to have a matches that could at most be 26, if there are 26 matches, then s2 window is a permutation of s1

each iteration of a window, check if matches is 26, if it is, return true

increment right, add 1 to the count for the letter at right in s2 counts
    if the letter at right in s2 counts is now equal the letter at right in s1 counts, you've gained a match, add 1 to matches
    if the letter at right in s2 counts is now greater than the letter at right in s1 counts, you've lost a match, subtract 1 from matches

subtract 1 from the count for the letter at left in s2 counts, increment left
    if the letter at left in s2 counts is now 1 less than the letter at left in s1 counts, you've lost a match, subtract 1 from matches
    if the letter at left in s2 counts is now equal to the letter at left in s1 counts, you've gained a match, add 1 to matches

[1,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
[1,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

matches = 26

"a d d"

     l   r
"e d d d a o o o"

Pseudocode:
1. Instantiate an s1Counts array that has 26 slots with 0 in each slot
2. Instantiate an s2Counts array that has 26 slots with 0 in each slot
3. Iterate through s1
    1. At each index, add the letter at s1's charCodeAt(0) - 'a'.charCodeAt(0) to get the index to increment, then add that to s1 count
    2. At the same time, add the letter at s2's charCodeAt(0) - 'a'.charCodeAt(0) to get the index to increment, then add that to s2 count
4. Instantiate a matches var at 0
5. Iterate through s1Counts
    1. if the current index in s1Counts === the current index in s2Counts, increment matches
6. Instantiate a left pointer at 0
7. Instantiate a right pointer at s1.length - 1
8. While r < s2.length
    1. Check if matches is 26, if so return true
    2. Increment right pointer
    3. Add 1 to the count for the letter at right in s2Counts
    4. If the letter at right in s2Counts is equal the letter at right in s1Counts:
        1. You've gained a match, increment matches
    5. If the letter at right in s2Counts is now greater than the letter at right in s1Counts:
        1. You've lost a match, decrement matches
    6. Subtract 1 from the count for the letter at left in s2Counts
    7. If the letter at left in s2Counts is now less than the letter at left in s1Counts:
        1. You've lost a match, decrement matches
    8. If the letter at left in s2Counts is now equal the letter at left in s1Counts:
        1. You've gained a match, increment matches
    9. Increment left pointer
9. Return matches === 26

Time complexity: O(n) - where n is the length of s2. Since we calculate matches before the loop, and only use O(1) operations to increment and decrement letters at their indices within the s1Counts and s2Counts arrays, the overall time complexity is O(n)

Space complexity: O(52) - Since we store 2 26 item arrays to use for counts

*/

function checkInclusion(s1: string, s2: string): boolean {
    if (s2.length < s1.length) return false;
    const s1Counts = Array.from({ length: 26 }, () => 0);
    const s2Counts = Array.from({ length: 26 }, () => 0);
    for (let i = 0; i < s1.length; i += 1) {
        s1Counts[s1[i].charCodeAt(0) - 'a'.charCodeAt(0)] += 1;
        s2Counts[s2[i].charCodeAt(0) - 'a'.charCodeAt(0)] += 1;
    }

    let matches = 0;
    for (let i = 0; i < s1Counts.length; i += 1) {
        if (s1Counts[i] === s2Counts[i]) matches += 1;
    }

    let l = 0;
    let r = s1.length - 1;

    while (r < s2.length - 1) {
        if (matches === 26) return true;
        r += 1;
        const rightIndex = s2[r].charCodeAt(0) - 'a'.charCodeAt(0);
        s2Counts[rightIndex] += 1;
        
        if (s2Counts[rightIndex] === s1Counts[rightIndex]) {
            matches += 1;
        }
        if (s2Counts[rightIndex] === (s1Counts[rightIndex]) + 1) {
            matches -= 1;
        }

        const leftIndex = s2[l].charCodeAt(0) - 'a'.charCodeAt(0);

        s2Counts[leftIndex] -= 1;

        if (s2Counts[leftIndex] === s1Counts[leftIndex]) {
            matches += 1;
        }
        if (s2Counts[leftIndex] === (s1Counts[leftIndex]) - 1) {
            matches -= 1;
        }

        l += 1;
    }
    return matches === 26;
};

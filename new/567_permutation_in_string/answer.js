/*


Time to Complete: 30m

Method: Sliding window technique. Since we know the length of s1, we know we need to check that length in a set of windows in s2. For example, if s1 is length 2, we first check the first 2 letters in s2. If they don't match the letters in s1 exactly within that window, we increment the window by 1, so now we're checking letters 2 and 3 in s2. Then check again, and if it doesn't match exactly, check letters 3 and 4, etc. until you get to the last window. The speed of this algorithm can change depending on how efficient the method is for comparing the letters in s1 with the letters in the current window.

Slow method: First, create an s1Count map that has the count of each letter in s1. Then, at each window, create a currentWindowCount map of the current window. Iterate over the keys of the letterCount map, and check in the s1Count map whether 1) the letter exists, and 2) the letter is the same count in the s1Count map vs the currentWindowCount map. If at any point all the letters in the current window match the letters in the s1Count map, then return true. This is slow because it requires you to 1) create a map of the current window, so iterating over the window to create a count of each letter, and 2) iterate again over each unique letter in the current window to compare it to the letters in the s1Count. If all letters are unique, then for each window, you're iterating over it twice, so for an s2 of length n, you're creating a certain amount of windows based on how long s1 is, and iterating through those overlapping windows twice. Not efficient.

Fast method: To compare s1 and s2, you'll have a map (or array) that exists outside the loop for s1 and for the window. These maps/arrays will have the entire alphabet, and a count at each key/index that represents the counts for both. You know s1 and the window are permutations if the number of matching letters is 26 (the length of the alphabet). And you can determine how many matches there are by using ASCII codes: 'a' would be index 0, or key 0, 'b' would be index 1, or key 1, etc. First, create an array that is 26 in length, then iterate over s1 and s2. For s1.length amount of iterations, use currentLetter.charCodeAt() - 'a'.charCodeAt() to get the corresponding index, and add 1 to the count at that index for the current letter. Do this in s1Array for all the letters in s1, and s2Array for s1.length letters in s2 (to get the first window). Then, instantiate a matches variable, and add up a match whenever there's two of the same letter with the same count in the s1Array and s2Array. Iterate through the windows and add/subtract the number of matches based on changes in the letters in the window: if the new window gained a letter that doesn't match the letter/count in s1Array, subtract from the matches count, and if the new window lost a letter that resulted in a mismatch letter/count, then subtract from the matches count. Do the same if it gained a match, and at each iteration of a window, check if the current window has 26 matches with the s1Array, and if so, you've found the permutation.

Pseudocode: 
/*
1. Set a base case for if length of s1 > length of s2, return false because a permutation of s1 in s2 would be impossible
2. Create two arrays filled with 26 0's, one named s1Count and another named s2Count
3. Iterate over s1, and at each iteration:
  1. Find the ASCII index of the current letter at that index in s1 (s1[i].charCodeAt() - 'a'.charCodeAt())
  2. Set the index at s1Count for that letter to += 1: s1Count[ASCIIIndex] += 1
  3. Find the ASCII index of the current letter at that index in s2 (s2[i].charCodeAt() - 'a'.charCodeAt())
  4. Set the index at s2Count for that letter to += 1: s2Count[ASCIIIndex] += 1
4. Instantiate a matches variable at 0
5. Iterate through the s1Count array
  1. For each iteration, check if the count at that index matches between s1Count and s2Count
    1. If yes: add 1 to the matches counter
6. Instantiate a left pointer at index 0
7. Instantiate a right pointer at index l + s1.length (the letter after the current end of the first window)
8. While the right pointer is less than the length of s2:
  1. If matches variable is 26, return true (the previous window is a permutation of s1)
  2. Find the ASCII index of the current letter at r (s2[r].charCodeAt() - 'a'.charCodeAt())
  3. Add a count to that letter in s2Array: s2Array[rASCIIIndex] += 1
  4. If the letter at s2 at that ASCII index is the same count as that same letter at s1 at that ASCII Index, we've created a match from the previous window:
    1. Add 1 to the matches counter
  5. Else if the letter at s2 is now 1 more than that same letter at s1, we added too much and lost a match:
    1. Subtract 1 from the matches counter
  (Note: if you add 1 to that letter in s2Array and the count in s2 is still below the count in s1, you don't gain or lose a match, the letter was unmatched before, and remains unmatched now, so you don't need to do anything)
  6. Find the ASCII index of the current letter at l (s2[l].charCodeAt() - 'a'.charCodeAt())
  7. Subtract a count to that letter in s2Array: s2Array[lASCIIIndex] -= 1
  8. If the letter at s2 at that left ASCII index is now less than the count at s1 at that same ASCII index, we've lost a match:
    1. Subtract 1 from the matches counter
  9. If the letter at s2 at that left ASCII index is now the same as the count at s1 at that same ASCII index, we created a match:
    1. Add 1 to the matches counter
  10 Finally, increment the left pointer and right pointer
9. At the end of step 8's while loop, we need to check if matches is now 26 (that means the final window shift resulted in 26 matches, which means the final window was the permutation)
  1. Therefore, return matches === 26 as the final logical return
*/
  /*

Time Complexity: O(n)
Explanation: Since we're only iterating over the s2 string once using a sliding window, and at each iteration we use constant time to adjust the counts in the s1 and s2 count arrays, the overall time complexity simplifies to O(n).

Space Complexity: O(1)
Explanation: Since we use a constant count array to hold the counts of s1 and the window being checked, the space complexity is O(26) for each letter being tracked, which simplifies to O(1)

*/

var checkInclusion = function(s1, s2) {
  if (s1.length > s2.length) return false;
  const s1Counts = new Array(26).fill(0);
  const s2Counts = new Array(26).fill(0);
  
  for (let i = 0; i < s1.length; i += 1) {
      const s1ASCIIIndex = s1[i].charCodeAt() - 'a'.charCodeAt();
      s1Counts[s1ASCIIIndex] += 1;
      const s2ASCIIIndex = s2[i].charCodeAt() - 'a'.charCodeAt();
      s2Counts[s2ASCIIIndex] += 1;
  }
  
  let matches = 0;

  for (let i = 0; i < s1Counts.length; i += 1) {
      if (s1Counts[i] === s2Counts[i]) matches += 1;
  }

  let l = 0;
  let r = l + s1.length;
  
  while (r < s2.length) {
      if (matches === 26) {
          return true;
      }

      let index = s2[r].charCodeAt() - 'a'.charCodeAt();
      s2Counts[index] += 1;
      if (s1Counts[index] === s2Counts[index]) {
          matches += 1;
      }
      if (s1Counts[index] + 1 === s2Counts[index]) {
          matches -= 1;
      }

      index = s2[l].charCodeAt() - 'a'.charCodeAt();
      s2Counts[index] -= 1;
      if (s1Counts[index] === s2Counts[index]) {
          matches += 1;
      }
      if (s1Counts[index] - 1 === s2Counts[index]) {
          matches -= 1;
      }

      l += 1;
      r += 1;
  }

  return matches === 26;
};

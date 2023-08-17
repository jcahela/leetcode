Time to Complete: 30m

Method: Sliding window technique. Since we know the length of s1, we know we need to check that length in a set of windows in s2. For example, if s1 is length 2, we first check the first 2 letters in s2. If they don't match the letters in s1 exactly within that window, we increment the window by 1, so now we're checking letters 2 and 3 in s2. Then check again, and if it doesn't match exactly, check letters 3 and 4, etc. until you get to the last window. The speed of this algorithm can change depending on how efficient the method is for comparing the letters in s1 with the letters in the current window. To compare s1 and the window at constant time, you initially calculate the number of matches between the numbers of each letter in s1 vs the window. By keeping track of every letter in the alphabet and the number of matches the first window starts with, you can then add and subtract from the matches as appropriate as you shift the window. If the matches ever equal 26, that means the letters match between the two alphabet arrays, and you can return true.

Pseudocode: 
/*
1. Set a base case for if length of s1 > length of s2, return false because a permutation of s1 in s2 would be impossible
2. Create two arrays filled with 26 0's, one named s1Count and another named s2Count
3. Iterate over s1, and at each iteration:
  1. Find the ASCII index of the current letter at that index in s1 (s1[i].charCodeAt(0) - 'a'.charCodeAt(0))
  2. Set the index at s1Count for that letter to += 1: s1Count[ASCIIIndex] += 1
  3. Find the ASCII index of the current letter at that index in s2 (s2[i].charCodeAt(0) - 'a'.charCodeAt(0))
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
  8. If the letter at s2 at that left ASCII index is now exactly 1 less than the count at s1 at that same ASCII index, we've lost a match:
    1. Subtract 1 from the matches counter
  9. If the letter at s2 at that left ASCII index is now the same as the count at s1 at that same ASCII index, we created a match:
    1. Add 1 to the matches counter
  10. Finally, increment the left pointer and right pointer
9. At the end of step 8's while loop, we need to check if matches is now 26 (that means the final window shift resulted in 26 matches, which means the final window was the permutation)
  1. Therefore, return matches === 26 as the final logical return
*/

Code:
```js
function checkInclusion(s1: string, s2: string): boolean {
    if (s1.length > s2.length) return false;

    const s1Count = Array.from({ length: 26 }, () => 0);
    const s2Count = Array.from({ length: 26 }, () => 0);

    for (let i = 0; i < s1.length; i += 1) {
        let index = s1[i].charCodeAt(0) - 'a'.charCodeAt(0);
        s1Count[index] += 1;
        index = s2[i].charCodeAt(0) - 'a'.charCodeAt(0);
        s2Count[index] += 1;
    }

    let matches = 0;

    for (let i = 0; i < s1Count.length; i += 1) {
        if (s1Count[i] === s2Count[i]) {
            matches += 1;
        }
    }

    let l = 0;
    let r = s1.length;

    while (r < s2.length) {
        if (matches === 26) {
            return true;
        }

        const rIndex = s2[r].charCodeAt(0) - 'a'.charCodeAt(0);

        s2Count[rIndex] += 1;

        if (s2Count[rIndex] === s1Count[rIndex]) {
            matches += 1;
        }

        if (s2Count[rIndex] - s1Count[rIndex] === 1) {
            matches -= 1;
        }

        const lIndex = s2[l].charCodeAt(0) - 'a'.charCodeAt(0);

        s2Count[lIndex] -= 1;

        if (s2Count[lIndex] === s1Count[lIndex]) {
            matches += 1;
        }

        if (s1Count[lIndex] - s2Count[lIndex] === 1) {
            matches -= 1;
        }

        r += 1;
        l += 1;
    }

    return matches === 26;
};
```


Time Complexity: O(n)
Explanation: Since we're only iterating over the s2 string once using a sliding window, and at each iteration we use constant time to adjust the counts in the s1 and s2 count arrays, the overall time complexity simplifies to O(n).

Space Complexity: O(1)
Explanation: Since we use a constant count array to hold the counts of s1 and the window being checked, the space complexity is O(26) for each letter being tracked, which simplifies to O(1)

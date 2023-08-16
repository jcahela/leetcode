Time to Complete: 30m

Method: Sliding window with a hashmap keeping careful watch whenever the current letter exceeds a count of 1, to start sliding the window at that point. Since I need to find a substring, which is a string within the input s that is an unbroken string of non-repeating characters (not a subsequence which is any of the letters in s that are not repeating, regardless of whether they're next to each other), I can use a sliding window approach

Pseudocode:
/*
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
*/

Code:

```js
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
```


Time Complexity: O(s)
Explanation: Where s is the length of the input string. Since I'm only iterating through s once to find the longest substring

Space Complexity: O(t)
Explanation: Where t is the length of the longest substring without repeating characters, since I'm storing that many keys in the hashmap at most

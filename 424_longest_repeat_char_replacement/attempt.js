/**
 * @param {string} s
 * @param {number} k
 * @return {number}

s = "ABBABBA", k = 2

longestSubstring = 0

l === r ? longestSubstring = 2
l !== r ? k -= 1; longestSubstring = 2

increment r

l === r ? longestSubstring += 1
l !== r ? k -= 1; longestSubstring = 3

increment r

l  r
ABBABBA

also: keep track of the first different letter - that'll be where the next window starts once the current window runs out of k's to use

1. Instantiate a left pointer at 0
2. Instantiate a right pointer at 1
3. Instantiate a longestSubstring at 1
4. While the left pointer is less than the length of the string
    1. Instantiate a currentLongestSubstring at 1
    2. Instantiate a swap variable at k (save k for when we need to reset this swap variable at each new window)
    3. Instantiate a nextWindowIndex variable at s.length  
    (if there's only 1 window as in the string is all same-letters, then we only need to check one window. Once that window is done being checked, we want to set left pointer to this variable, which will set it to the end of the string and exit the loop)
    4. Instantiate a nextWindowIndexFound = false
    5. While the right pointer is less than the length of the string
        1. Is the letter at right the same as the letter at left?
            1. Add 1 to currentLongestSubstring
            2. Increment the right pointer
        2. Is the letter at the right different than the letter at the left?
            1. Is the nextWindowIndexFound variable false?
                1. Set nextWindowIndex to the right pointer
                2. Set nextWindowIndexFound to true
            2. Is the swap variable > 0?
                1. Subtract 1 from the swap variable
                2. Add 1 to currentLongestSubstring
                3. Increment right pointer
            3. Is the swap variable 0? No more swaps to use, reset everything, start at the new window start index
                1. Is the currentLongestSubstring variable greater than the longestSubstring variable?
                    1. Set longestSubstring to be equal currentLongestSubstring
                3. Set the left pointer to be equal the nextWindowIndex variable
                4. Set the right pointer to be left + 1
5. Return longestSubstring

Idea: at some point I could include a check to see if the longestSubstring variable is greater than the string.length - current index, then break from the loop. (if the longestSubstring variable is already longer than the number of letters from the current left index to the end, that means we've already found the longestSubstring since it'd be impossible to find a longer one). Where would I add this check?

 */
// longestSubstring = 4

//      l r
//  0 1 2 3 4 5 6
// "A A B A B B A"
// k = 1

// currentLongestSubstring = 1;
// swap = 1
// nextWindowIndex = 7
// nextWindowIndexFound = false
var characterReplacement = function(s, k) {
    let l = 0;
    let r = 1;
    let longestSubstring = 1;
    while (l < s.length) {
        let currentLongestSubstring = 1;
        let swap = k;
        let nextWindowIndex = s.length;
        let nextWindowIndexFound = false;
        while (r < s.length) {
            if (s[r] === s[l]) {
                currentLongestSubstring += 1;
                r += 1;
            } else {
                if (!nextWindowIndexFound) {
                    nextWindowIndex = r;
                    nextWindowIndexFound = true;
                }
                if (swap === 0) {
                    break;
                } else {
                    swap -= 1;
                    currentLongestSubstring += 1;
                    r += 1;
                }
            }
        }
        if (currentLongestSubstring > longestSubstring) {
            longestSubstring = currentLongestSubstring
        }
        l = nextWindowIndex;
        r = l + 1;
    }
    return longestSubstring;
};

// Result: Failed on examples where you had to take into account past characters on later windows: "ABBB"

/************************ 2nd attempt SOLVED with sliding window, maybe not optimal in time **************************/
/*

I can use a sliding window

At the start of the sliding window:

k = 2

5 is the most (convert C and A to B)

         r
   l
 0 1 2 3 4 5 6
"A B C A B B A"

{
    'A': 1,
    'B': 2,
    'C': 1,
}

If I keep track of the most frequent letter in the current window

First A is the most frequent letter in the current window

When I increment r, A and B are just as frequent as each other, so maybe I keep A as the most frequent

WHen I increment r, A B and C are just as frequent as each other, so maybe I keep A as the most frequent

(2 - 0 + 1) - 2 = 1 (width of window minus the number of most frequent letters)
if (width of window - most frequent letters) <= k, I can count this as a valid window

(4 - 0 + 1) - 2 = 3 > k(2) so this is an invalid window
    - increment l, subtract the letter from the count map
    - recalculate most frequent letter by looping through the map
    - check if window width - most frequent letter <= k



k = 2

               r
       l
 0 1 2 3 4 5 6
"A B C A B B A"

let mostFrequent = 'B';
let mostFrequentCount = 2;

const counts = {
    'A': 2,
    'B': 2,
    'C': 0
}

let longestSubstring = 5;

while (r < s.length) {
    counts[s[r]] ? counts[s[r]] += 1 : counts[s[r]] = 1;

    // replace mostFrequent and mostFrequentCount if whatever letter I just added is now greater
    if (counts[s[r]] > mostFrequentCount) {
        mostFrequent = s[r];
        mostFrequentCount = counts[s[r]];
    }

    let windowWidth = r - l + 1; // 5 - 1 + 1 = 5

    if (windowWidth - mostFrequentCount <= k) { // 5 - 3 = 2 <= k(2) TRUE
        longestSubstring = Math.max(longestSubstring, windowWidth);
    } else {
        // This is an invalid window

        // while (windowWidth - mostFrequentCount > k) {
            // Decrement the count of the letter at L
            counts[s[l]] -= 1;
            l += 1;

            windowWidth = r - 1 + 1;

            // recalculate the most frequent count and letter:
            for (const letter of Object.keys(counts)) {
                mostFrequent = null;
                mostFrequentCount = 0;
                if (counts[letter] > mostFrequentCount) {
                    mostFrequent = letter;
                    mostFrequentCount = counts[letter];
                }
            }
        }
    }

    r += 1;
}

return longestSubstring;

Time complexity: O(n) - Since it only loops through the unique letters of an invalid window once finding an invalid window. After that, it loops normally

Space complexity: O(u) - Where u is the number of unique letters in the string s, since I'm storing that many keys

*/

function characterReplacement(s: string, k: number): number {
    let mostFrequent;
    let mostFrequentCount = 0;

    const counts = {}

    let l = 0;
    let r = 0;

    let longestSubstring = 0;

    while (r < s.length) {
        counts[s[r]] ? counts[s[r]] += 1 : counts[s[r]] = 1;
        if (counts[s[r]] > mostFrequentCount) {
            mostFrequent = s[r];
            mostFrequentCount = counts[s[r]];
        }

        let windowWidth = r - l + 1;

        if (windowWidth - mostFrequentCount <= k) {
            longestSubstring = Math.max(longestSubstring, windowWidth);
        } else {
            counts[s[l]] -= 1;
            l += 1;

            windowWidth = r - l + 1;
            for (const letter of Object.keys(counts)) {
                mostFrequent = null;
                mostFrequentCount = 0;
                if (counts[letter] > mostFrequentCount) {
                    mostFrequent = letter;
                    mostFrequentCount = counts[letter];
                }
            }
        }

        r += 1;
    }

    return longestSubstring;
};

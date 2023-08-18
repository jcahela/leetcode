Time to Complete: 45m

Method: Sliding window, with a map of counts for t input, and a map of counts for the window. You can create two hashmaps to verify equivalency, to verify that within the window there is at least every letter in t and more than or equal the amount of those letters. To do this, we have two hashmaps that will only keep track of the letters in t for the tMap, and another hashmap that will only keep track of the letters it needs and how much of those letters it currently has in the window.


Pseudocode: 
/*
// Create tCounts map and sCounts map
1. Check if length of t is greater than length of s. If so, return ""
2. Instantiate a tCounts hashmap at {}
3. Instantiate a sCounts hashmap at {}
4. Iterate over t 
    1. Add current letter at t to tCounts or increment the letter in tCounts
    2. Add the current letter at t to sCounts as 0
6. Iterative over t
    1. Add the current letter at S (not t) to sCounts if it exists
At this point you should have a tCounts and sCounts, with the same keys, and same or different count values.
// Calculate starting matches
7. Instantiate a matches var at 0
9. Instantiate a matchesNeeded var at Object.keys(tCounts).length
8. Iterate over the keys of tCounts
    1. if the current letter in sCounts is the >= that letter in tCounts, that means we've got that letter covered in the window, so add 1 to matches
// Set up window pointers and minimum left and rights to store previous minimum windows
9. Instantiate an l pointer at 0
10. Instantiate an r pointer at t.length - 1
11. Instantiate a minL pointer as undefined
12. Instantiate a minR pointer as undefined
// Slide the window
13. while right pointer is less than s.length
    1. Check if matches === matchesNeeded
        1. If so, the current window is a valid minimum window
        2. Check if (minL is undefined && minR is undefined) || if the difference between r and l is less than the difference between minR and minL
            1. If either above is true, set minL to be l, and minR to be r
        3. If the letter at l exists in sCounts
            1. Decrement the letter at l in sCounts
            2. Check if the letter at l in sCounts is now less than the letter at l in tCounts
                1. If so, you've lost a match, so subtract 1 from matches
        4. increment l
    2. else
        1. increment r
        2. If the letter at r exists in sCounts
            1. Increment the letter at r in sCounts
            2. Check if the letter at r in sCounts is now equal to the letter at r in tCounts
                1. If so, you've gained a match, so add 1 to matches
14. If minL is undefined && minR is undefined
    1. Return ""
15. Else
    1. Return s.slice(minL, minR + 1) (second argument is exclusive)
*/

Code:
```js
function minWindow(s: string, t: string): string {
    if (t.length > s.length) return "";

    const tCounts = {};
    const sCounts = {};

    for (const letter of t) {
        tCounts[letter] ? tCounts[letter] += 1 : tCounts[letter] = 1;
        sCounts[letter] = 0;
    }

    for (let i = 0; i < t.length; i += 1) {
        if (s[i] in sCounts) {
            sCounts[s[i]] += 1;
        }
    }

    let matches = 0;
    const matchesNeeded = Object.keys(tCounts).length;

    for (const tLetter of Object.keys(tCounts)) {
        if (sCounts[tLetter] >= tCounts[tLetter]) {
            matches += 1;
        }
    }

    let l = 0;
    let r = t.length - 1;

    let minL;
    let minR;

    console.log(sCounts);
    console.log(tCounts);

    while (r < s.length) {
        if (matches === matchesNeeded) {
            if ((minL === undefined && minR === undefined) || ((r - l) < (minR - minL))) {
                minL = l;
                minR = r;
            }

            if (s[l] in sCounts) {
                sCounts[s[l]] -= 1;
                if (sCounts[s[l]] === tCounts[s[l]] - 1) {
                    matches -= 1;
                }
            }

            l += 1;
        } else {
            r += 1;
            
            if (s[r] in sCounts) {
                sCounts[s[r]] += 1;

                if (sCounts[s[r]] === tCounts[s[r]]) {
                    matches += 1;
                }
            }
        }
    }

    if (minL === undefined && minR === undefined) {
        return "";
    } else {
        return s.slice(minL, minR + 1);
    }
};
```
Time Complexity: O(n)
Explanation: Since we only use left and right pointers to iterate through the map, and since we only use O(1) operations to update the count maps and compare the matches we need vs the matches we have, the overall time complexity will be O(n)

Space Complexity: O(t)
Explanation: Since we only use 2 hashmaps that'll hold t number of keys, and the rest pointers, the most space we'll need is O(2t), which simplifies to O(t).

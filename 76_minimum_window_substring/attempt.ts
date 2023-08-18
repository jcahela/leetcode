/**
 * @param {string} s
 * @param {string} t
 * @return {string}



s = "ADOBECODEBANC", t = "ABC"

 l   r
 0 1 2 3 4 5 6 7 8 9 10 11 12
"A D O B E C O D E B  A  N  C"

current minimum indices = 0,5 = "BANC"

possibleMin = 0,5 = "ADOBEC" = found a minimum answer, replace ""

possibleMin = 3,10 = "BECODEBA" = longer than current minimum, throw out

possibleMin = 4,10 = "ECODEBA" = longer than current minimum, throw out

possibleMin = 5,10 = "CODEBA" = same length as current minimum, throw out

possibleMin = 9,12 = "BANC" = smaller length as current minimum, replace"ADOBEC"

sCount = {b: 1, o: 1, a: 1, n: 1, c: 1}

tCount = { a: 1, b: 1, c: 1 }

How to check for equivalency between the current window in s, and all the letters in t:

Option 1: I could iterate over the tCount map's letter keys, getting all the letters, then checking that it exists in both the sCount map and tCount map in the same quantities. Time complexity: O(t)

Option 2: I could use a matches variable. The max number of matches would change though, because s could hold any number of letters that don't match t, but still include all the letters and in the same quantities in t, and still qualify as a valid minimum window substring. Matches could vary and still be correct, so this wouldn't work

Go with Option 1 for now

Pseudocode:

tMap = {a: 1, b: 1, c: 1}
sMap {t: 0, o: 0, a: 1, d: 0, e: 0, b: 1, n: 1, c: 1}

                     l        r                            
 0 1 2 3 4 5 6 7 8 9 10 11 12
"T D O T E D A D E B  A  N  C"
current minimum indices = 6,12 = "BANC"

1. If s is smaller in length than t, return "" (impossible to find t inside of s)
1. Instantiate a minimumWindowSubstring as an empty string ""
2. Instantiate an l pointer at 0
3. Instantiate an r pointer at l + t.length - 1 (first window checked)
4. Instantiate a map that holds all of t and its letter counts: tMap {'a': 1, 'b': 1, 'c': 1}
5. Instantiate a map that holds all of the current window and its letter counts: sMap {'a': 1, 'd': 1, o: 1}
6. While right pointer is less than length of the s string:
    1. while the letter at l is not in the tMap
        1. Subtract the count in from the letter at L in sMap by 1 if it exists in sMap
        2. increment l
    2. Add the letter at l to the sMap (it should be on a letter that is in the tMap)
    2. while the difference between r and l is less than the length of t
            1. if r is less than l, set r to be l + 1
            2. if r is greater than l, increment r
            2. add the new r letter to the sMap
    3. Check for equivalency:
        1. Iterate over the tCount map's letter keys, getting all the letters, then check that each exists in both the sCount map and tCount map in the same quantities
        1. If they are equivalent, check if it can replace minimumWindowSubstring (if the currentMinimumWindow is empty or is a length greater than the current difference between left and right indices, it's replaceable)
            1. If it can, replace it
                1. Check if the substring equals the length of t, if so it's the most minimum it could be-nimum, so return that substring
            2. If it can't, don't do anything. It's a garbage valid minimum substring.
            3. Whether it can or can't replace the current minimum substring:
                1. subtract the current count for the letter at l by 1
                2. increment l
        2. If they aren't equivalent
            1. Increment r
            2. Add the new letter at r to the sMap count for that letter, or if it already exists, increment its count by 1
7. Return the minimumWindowSubstring

Time complexity: O(s*t) - since we iterate over the s string, and at each valid window, we to a t operation to check for equivalency
Space complexity: O(s + t) - since we use an sMap and tMap that holds the letters in each


// s ADO
// t ABC

 */
var minWindow = function(s, t) {
  if (s.length < t.length) return "";
  let minimumWindowSubstring = "";
  let l = 0;
  let r = l + t.length - 1; // 2
  let tMap = {};
  let sMap = {};

  for (let i = l; i <= r; i += 1) {
      tMap[t[i]] ? tMap[t[i]] += 1 : tMap[t[i]] = 1;
      sMap[s[i]] ? sMap[s[i]] += 1 : sMap[s[i]] = 1;
  }

  while (r < s.length) {

      // Should make l be on a letter that is in tMap, and have a valid sMap count
      while (!tMap[s[l]]) {
          sMap[s[l]] -= 1;
          l += 1;
      }
      sMap[s[l]] ? sMap[s[l]] += 1 : sMap[s[l]] = 1;

      // Should make r be t.length away from l, and have a valid sMap count
      while (r - l + 1 < t.length) {
          if (r < l) {
              r = l + 1;
          } else {
              r += 1;
          }
          sMap[s[r]] ? sMap[s[r]] += 1 : sMap[s[r]] = 1;
      }

      // Check for equivalency
      const tLetters = Object.keys(tMap);
      let isEquivalent = true;
      console.log(tLetters);
      for (let i = 0; i < tLetters.length; i += 1) {
          const currentLetter = tLetters[i];
          console.log(sMap, tMap);
          if (!sMap[currentLetter] || (sMap[currentLetter] !== tMap[currentLetter])) {
              isEquivalent = false;
          }
      }

      if (isEquivalent) {
          console.log('arrived')
          if (minimumWindowSubstring === "" || minimumWindowSubstring.length < (r - l + 1)) {
              minimumWindowSubstring = s.slice(l, r + 1);
          }
          if (minimumWindowSubstring.length === t.length) {
              return minimumWindowSubstring;
          }
          sMap[s[l]] -= 1;
          l += 1;
      } else {
          r += 1;
          sMap[s[r]] ? sMap[s[r]] += 1 : sMap[s[r]] = 1;
      }
  }
  console.log(l, r)
  return minimumWindowSubstring;
};

// Did not run, problem with window algorithm

/********************* Attempt 2 - Success, optimal time and space *************************/

/*

If I have a sliding window in s that starts at the length of t, I could have:

t = "ABC"
window = "ADO"

I could have a count of letters for both

tCount = 
[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

windowCount = 
[1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0]

I could then count how many of the 26 alphabet characters in both arrays match

4 don't match (B, C, D, and O), so there are 22 matches
matches = 22

When would I get to a valid window? When the window contains the letters in T, so it doesn't matter if the window contains letters not in T, only that the window contains all letters in T. How would that change the tCount and windowCount counts arrays?

only store the letters in T in both counts
{
    'A': 1,
    'B': 1,
    'C': 1
}

{
    'A': 1,
    'B': 0,
    'C': 0
}

And matches starts at 1

A valid window would be t.length matches, so above if matches is 3 then it's a valid window

Once I find a valid window, I would check if its width is smaller than the currently saved window
    - if it is, replace the currently saved window with the current window

Then, after I have a valid window and did the above, I'd decrement the letter at L from the windowCounts array if it exists in that hashmap
    - If it does exist, I'd check if the count of that letter in windowCounts is now 1 less than the count of that letter in tCounts, if so I lost a match, so decrement matches, then increment l pointer

I also need to check r, increment r, then check if the letter at the new r exists in tCount, if it does, compare:
    if the count of that letter at new r in tCounts is now equal to that letter in windowCounts, I
gained a match, so increment matches

'AAC'
'AABLLLLL'

tCounts = {
    'A': 2,
    'C': 1
}

sCounts = {
    'A': 2,
    'B': 1,
    'C': 0
}

1 match
matches needed to be valid? 2 (A and C in sCounts need to be greater than or equal to their counts in tCounts) So I need a matchesNeeded variable that stays at the count of the keys in tCounts

Pseudocode:
// Create tCounts map and sCounts map
1. Check if length of t is greater than length of s. If so, return ""
2. Instantiate a tCounts hashmap at {}
3. Instantiate a sCounts hashmap at {}
4. Iterate over t 
    1. Add current letter at t to tCounts
5. Iterate over tCounts hashmap keys
    1. Add each unique letter key to sCounts at value 0 for each
6. Iterative over t
    1. Add the current letter at s to sCounts if it exists
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

function minWindow(s: string, t: string): string {
    if (t.length > s.length) return "";

    const tCounts = {};
    const sCounts = {};

    for (const letter of t) {
        tCounts[letter] ? tCounts[letter] += 1 : tCounts[letter] = 1;
    }

    for (let uniqueLetter of Object.keys(tCounts)) {
        sCounts[uniqueLetter] = 0;
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
            ///(minL is undefined && minR is undefined) || if the difference between r and l is less than the difference between minR and minL
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

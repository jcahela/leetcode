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

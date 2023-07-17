/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}

Description: Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

Example 1:

Input: s = "anagram", t = "nagaram"
Output: true
Example 2:

Input: s = "rat", t = "car"
Output: false

---------------------------------------


Two words are anagrams if they have the same letters and same amount of those letters

I could use a hashmap to get a letter count of one word, then compare the second word to that hashmap

ex. s = "anagram"

sMap = {
    'a': 3,
    'n': 1,
    'g': 1,
    'r': 1,
    'm': 1
}

t = "nagaram"

sMap minus the letters in nagaram:

{
    'a': 0,
    'n': 0,
    'g': 0,
    'r': 0,
    'm': 0    
}

At the end, if I check the values of the map and add them together, they're an anagram if they add up to 0. If they're less than 0 or more than 0, it's not an anagram

Pseudocode:

1. Check the length of s and t, if they're different, then they're automatically not an anagram
2. Instantiate an sMap variable as an empty map
3. Iterate over the s string
    1. If the current letter exists in the sMap, add the value at that key by 1
    2. else, set the current letter as a key in the sMap, and set its value to 1
4. Iterate over the t string
    1. If the current letter doesn't exist in the sMap, return false
    2. Else, subtract the value at that letter key by 1
5. Instantiate a comparer variable to 0
6. Iterate over the values of the sMap, and add each value to the comparer variable
7. Return comparer variable === 0

Time complexity: O(n) - Where n is the length of s or t. Since we're checking the .length of each s and t, which is O(1) time, we know by the time we're doing the hashmap method that s and t are the same length (otherwise they'd return false if they were different lengths at pseudo-step 1). After step 1, we run O(n) to create the sMap, then we run O(n) to subtract the letter counts using the t string of length n, then we iterate over the values of the sMap, which at worst case is also O(n) if there are no repeated letters in s. Altogether, that's O(3n) which simplifies to O(n).

Space complexity: O(n) - Where n is the length of s or t. Since we're creating a hashmap of letters and count from the s string. The rest of the space used are pointers.

 */


// s = ratc
// t = cara
var isAnagram = function(s, t) {
    if (s.length !== t.length) return false;
    const sMap = {};
    
    /*
    {
        'r': 0,
        'a': -1,
        't': 1,
        'c': 0
    }
    */

    for (sChar of s) {
        if (sMap[sChar]) {
            sMap[sChar] += 1;
        } else {
            sMap[sChar] = 1;
        }
    }

    for (tChar of t) {
        if (!sMap[tChar]) return false;
        sMap[tChar] -= 1;
    }

    for (num of Object.values(sMap)) {
        if (num !== 0) return false;
    }

    return true;
};

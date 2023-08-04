/*

In order to find out which words belong to the same anagram, I will need to convert them all into keys that match each other if:
    1. The two words have the same letters
    2. The two words have the same amount of those letters

I could use an ASCII alphabet array that holds the counts of each letter at each iteration
    - This would be a time complexity of O(s + 26), which is faster than, say, sorting each string and using that as the key, since that's O(nlogn)

Using the ASCII alphabet array, I could create a key from a string in strs:
    word: "abc"
    ASCII alphabet array: [1,1,1,0,0,0,0....]
    iterate over alphabet array, then set its count and its letter to a key variable:
    '1a1b1c'
    I'd get the letter by adding the current index to the ASCII value of a: 0 + 'a'.charCodeAt(), then running String.fromCharCode(result) to get the letter

Pseudocode:
1. Instantiate a hashmap that'll hold the keys (anagrams) with their values being arrays that'll hold each string that fits into that anagram
2. Iterate over the strs array:
    1. At each iteration, instantiate an alphabet array at size 26 that starts as all 0s
    2. Iterate over the current string
        1. At each letter, add 1 to its corresponding index in the alphabet array: alphArr[letter.charCodeAt() + 'a'.charCodeAt()] += 1
    3. Instantiate a key variable as an empty string
    4. Iterate over the alphabet array
        1. At each index, if it's more than 0, add to the key variable the following: keyVar += `${alphArr[i]}${String.fromCharCode(i + 'a'.charCodeAt())}`: ex. `1e`
    5. Add the current word to the key's array: hashmap[key].push(currentWord)
3. Return the values of the hashmap (Object.values(hashmap));

Time complexity: O(n * s) - where n is the length of the strs array, and s is the average length of each string, since I need to iterate over the strings to get the key

Space complexity: O(n) - since every word in strs could be its own anagram, the max size of the hashmap being used is O(n)

*/

function groupAnagrams(strs: string[]): string[][] {
  const anagramMap = {};
  for (let i = 0; i < strs.length; i += 1) {
      const alphabetCounts = Array.from({length: 26}, () => 0);
      const str = strs[i];

      for (let j = 0; j < str.length; j += 1) {
          const letter = str[j];
          alphabetCounts[letter.charCodeAt(0) - 'a'.charCodeAt(0)] += 1;
      }
      let key = '';
      for (let k = 0; k < alphabetCounts.length; k += 1) {
          const count = alphabetCounts[k];
          if (count > 0) {
              key += `${count}${String.fromCharCode('a'.charCodeAt(0) + k)}`;
          }
          
      }
      anagramMap[key] ? anagramMap[key].push(str) : anagramMap[key] = [str];
  }
  return Object.values(anagramMap);
};

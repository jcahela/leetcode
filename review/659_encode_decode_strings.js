// Input: ["lint","code","love","you"]

/**

Design an algorithm to encode a list of strings to a string. The encoded string is then sent over the network and is decoded back to the original list of strings.

Please implement encode and decode

I need to be able to encode numbers and special characters, so my encode needs to have a method for that
If I use a delimiter to separate words, then a number to determine the length of the following string, I could account for lengths of string that include numbers and the delimiter itself

ex. ["l4nt", "c#de"] -> #4l4nt#4c#de

      l    r    
#4l4nt#4c#de -> ["l4nt", "c#de"]

Encode pseudocode:

1. Instantiate a mutable output string
2. Iterate over the strs array
  1. For each string, concatenate the delimiter # and the length of the string strs[i].length to the end of the output string
3. Return the output string

Decode pseudocode:

1. Instantiate a left and right pointer at 0 and 1 respectively
2. Instantiate an output array
3. While the left pointer is less than the length of the strs string
  1. Instantiate an empty string that'll hold the current string
  2. The left pointer will be at index 0, which will be the first delimiter
  3. The right pointer will be at index 1, which will be the first string's length
  4. Iterate from 1 after the right pointer (the first character in the string) to the number denoted by the right pointer (convert to a number)
    1. At each iteration here, add the current character to the string
  5. Add the string to the output array
  6. Set the left pointer to be 1 more than the right pointer
  7. Set the right pointer to be 1 more than the left pointer
4. Return the output array

 * 
 * @param {string[]} strs 
 * @return {string}
 */

function encode(strs) {
  let output = '';
  for (let i = 0; i < strs.length; i += 1) {
    output += `#${strs[i].length}${strs[i]}`;
  }
  return output
}

console.log(encode(["l4nt", "c#de"]))

/**
 * 
 * @param {string} str 
 * @return {string[]}
 */

// ['l4nt', 'c#de']
// 'c#de'
// 4
//            ilr
// #4l4nt#4c#de

function decode(str) {
  let l = 0;
  let r = 1;
  const output = [];
  
  while (l < str.length) {
    let currentStr = '';
    const strLength = parseInt(str[r], 10);

    let i = r + 1;
    while (i < r + strLength + 1) {
      currentStr += str[i];
      i += 1;
    }
    output.push(currentStr);
    l = i;
    r = l + 1;
  }
  return output;
}

console.log(decode('#4l4nt#4c#de'));

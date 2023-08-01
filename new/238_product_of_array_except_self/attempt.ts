/**
 * @param {number[]} nums
 * @return {number[]}

Since I must write it in O(n) time without using division, I could use a prefix and suffix variable to generate the prefix at index i (all numbers before i multiplied together) and a suffix at index i (all numbers after i multiplied together), then multiply prefix and suffix to get the product of all elements in nums except the one at i.

Pseudocode:

1. Instantiate a prefix variable at 1
2. Instantiate an output array of length nums.length, with 1 as its original value at each index
3. Iterate through nums
    1. set the value at that index in the output array to be the prefix 
    2. multiply the current number in nums by the prefix

    Prefix: 24
    Output: [1,1,2,6]
    Nums:   [1,2,3,4]

4. Instantiate a suffix variable at 1
5. Iterate through nums backwards
    1. Multiply the number at that index in the output by the suffix
    2. Multiply the suffix by the current number at nums

    Suffix: 24
    Output: [24,12,8,6]
    Nums:   [1,2,3,4]

6. Return the output array

Time complexity: O(n) - since I iterate through the nums array twice without nesting, it simplifies to O(n)
Space complexity: O(1) since I only use pointers, O(n) if you count the output array

*/

var productExceptSelf = function(nums){
    let output = Array.from({ length: nums.length }, () => 1);
    let prefix = 1;

    for (let i = 0; i < nums.length; i += 1) {
        output[i] = prefix;
        prefix *= nums[i];
    }

    let suffix = 1;
    for (let i = nums.length - 1; i >= 0; i -= 1) {
        output[i] *= suffix;
        suffix *= nums[i];
    }

    return output;
}

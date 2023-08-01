Time to Complete: 30m

Method: Prefix and suffix multiplication products. The prefix product of a number at index i is every number before that index multiplied together. The suffix product of a number at index i is every number after that index multiplied together. The prefix product * the suffix product gets you the product of every number in the array except the number at i, which is what you want for each index. So the method for solving this without using division is calculating the prefix and suffix products at each index and multiplying them together to get the answer.

Pseudocode:
/*
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
*/

Code:
```ts
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
```

Time Complexity: O(n)
Explanation: Where n is the length of the nums array. Since I only have to loop through it twice, once forward, once backward, it calculates to O(2n), which simplifies to O(n).

Space Complexity: O(1)
Explanation: Since the output array doesn't count towards space complexity, I'm only using prefix and suffix pointers which are O(1), so the space complexity is O(1). If we counted the output array as space used, the space complexity would be O(n).

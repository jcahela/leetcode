/**
 * @param {number[]} nums
 * @return {boolean}

1. Instantiate a set
2. Iterate over the nums array
    3.1. At each iteration, check if the set has the current number
        3.1.1. If true, return true
        3.1.2. If false, add the current number to the set
3. Return false

Time complexity: O(n)
Space complexity: O(n)

*/

var containsDuplicate = function(nums) {
    const duplicateSet = new Set(nums);
    return duplicateSet.size !== nums.length;
};

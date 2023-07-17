/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}

Description: Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

 

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]
Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]

---------------------------------------------

Thoughts:

I could use a hashmap to hold the nums and their indices in the nums array
Then, iterate over the nums array and check if the difference between the target and current number exists in the hashmap
if it does, then the current number and that number are the two sums that equal the target

{
    2: 3,
    7: 1,
    11: 2,
    15: 4
}

target = 4

 i
 0  1   2   3   4
[2, 7, 11,  2, 15]

[0, 3]


Edge case: What if the target is 4, and there are multiple 2s in the nums array? How would I make sure I don't repeat the same 2's index and get the wrong answer?

Edge case solution: Since I'm using the numbers as the keys, when I iterate over the nums array, I overwrite any repeated numbers with the indices of the duplicates

Then, since I'm starting from index 0 when I check the array, I'm not using the same number's index to compare the current duplicate number. If two duplicates equal the target, I would get the current index of the first occurence and the last occurence of that duplicate, getting a correct answer. Since the input would have exactly one solution, there wouldn't be more than one duplicate on a target that those duplicates sum up to, and I'd get the exact answer.

Pseudocode:
1. Instantiate a map that holds the nums and their indices as an empty map
2. Iterate over the nums array:
    1. At each index, set the current number as a key in the map, and its index as the value
3. Iterate over the nums array:
    1. At each number, check if the target - current number exists in the hashmap
        1. If it exists, return the current index and the value at the found value in the hashmap as an array
        2. If it doesn't exist, continue
4. Since each input has exactly one answer, don't need to return anything at the end

Time complexity: O(n) - where n is the length of the nums array. Since we only loop through the nums array twice, it equals O(n)
Space complexity: O(n) - where n is the length of the nums array. If the nums array has no duplicates, the hashmap of its nums:indices would be n large in space

*/
var twoSum = function(nums, target) {
    const map = {};

    for (let i = 0; i < nums.length; i += 1) {
        map[nums[i]] = i;
    }

    for (let i = 0; i < nums.length; i += 1) {
        if ((map[target - nums[i]]) && (map[target - nums[i]] !== i)) return [i, map[target - nums[i]]];
    }
};

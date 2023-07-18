/**
 * @param {number[]} nums
 * @return {number[][]}

Description:

Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

 

Example 1:

Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation: 
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.
Example 2:

Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.
Example 3:

Input: nums = [0,0,0]
Output: [[0,0,0]]
Explanation: The only possible triplet sums up to 0.
 

Constraints:

3 <= nums.length <= 3000
-105 <= nums[i] <= 105

--------------------------------

Thoughts:

I could use a sorted two sum approach while also iterating over the nums array. Since it's sorted, I'd only need to move forward to check for matching triplets that add up to 0, since each iteration would check for possible combinations at that index and later indices. First I'd sort the nums array, then iterate over the nums array. At each iteration, set the left pointer to be 1 more than the current index i, and the right pointer to be at the end of the nums array. Then, I'd check while l < r, check if the nums at left and right add to 0, if it's less than 0, increment left pointer (to get a larger addend). Since I can't have duplicate triplets, after I find a valid triplet, when incrementing I'd continue until I reach a number that's different than the current left pointer number (or while left was still less than right). I could then just decrement right once, because if I land on a duplicate right, I know left is already at a different number, so it wouldn't be a duplicate triplet if that new triplet is found to be valid.

[-1,0,1,2,-1,-4]

  i   l                         r
[-4, -4, -1, -1, 0, 0, 1, 1, 2, 2]

[[-1,-1,2], [-1,0,1]]

-4 + -1 + 2 = -3 (too small), increment left pointer

-4 + 0 + 2 = -2 (too small), increment left pointer

-4 + 1 + 2 = -1 (too small), increment left pointer

-1 + -1 + 2 = 0 (just right), add to answer array

-1 + 0 + 2 = 1 (too big), decrement right pointer

-1 + 0 + 1 = 0 (just right), add to answer array

Notice that the solution set must not contain duplicate triplets.

I would increment through the nums input until I'm 2 away from the last number (gives enough room for the left and right pointers ahead of the i pointer) (i < nums.length - 2)

Pseudocode:

1. Instantiate a result array, that'll hold the triplets in an array at each index
1.5. Sort the nums input
2. Iterate over the nums array (until i < nums.length - 2, to give enough space for left and right pointers to point at an actual number, and not be off the end of the array)
    1. At each iteration, instantiate a left pointer at i + 1
    2. Then, instantiate a right pointer at nums.length - 1
    3. While l < r
        1. Check if the number at i + number at l + number at r < 0
            1. If < 0, increment l
        2. Check if the number at i + number at l + number at r > 0
            1. If > 0, decrement r
        3. Else (these numberes added equal 0)
            1. Push the current triplet of numbers as an array to the answer array
            2. Increment l
            3. While (l < r && number at l is the same as number at l - 1), increment l. This guarantees the next triplet we check will not be a duplicate of the one we just put into the answer array
3. Return the answer array

Time complexity: O(n log n) - logn since we're sorting the nums array, and n since we're iterating over the nums array once, and at each iteration, using pointers to iterate over the rest of the array, which decreases at each iteration.

Space complexity: O(1) - since we're only using pointers and the answer array for space

*/

var threeSum = function(nums) {
    const result = [];
    const sortedNums = nums.sort((a,b) => a - b);
    let i = 0;
    console.log(sortedNums);
    while (i < sortedNums.length - 2) {
        let l = i + 1;
        let r = sortedNums.length - 1;

        while (l < r) {
            if (sortedNums[i] + sortedNums[l] + sortedNums[r] < 0) {
                l += 1;
            } else if (sortedNums[i] + sortedNums[l] + sortedNums[r] > 0) {
                r -= 1;
            } else {
                result.push([sortedNums[i], sortedNums[l], sortedNums[r]])
                l += 1;
                while (l < r && sortedNums[l] === sortedNums[l - 1]) { // by adding l < r as the first condition, I stop incrementing l once l is the same as r, if the remaining numbers are duplicates. This will then break out of the outer loop
                    l += 1;
                }
            }
        }

        i += 1;
        while (i < sortedNums.length - 2 && sortedNums[i] === sortedNums[i - 1]) {
            i += 1;
        }
    }

    return result;

};

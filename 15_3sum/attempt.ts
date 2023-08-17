/*

Brute force would be a triple nested loop that adds each combination of 3, which would be O(n^3)

If I first sort the nums array, I could iterate through the array, then use 2 pointers that start after the current iteration start point, and use the pointers to find if any combination of 3 results in the sum

[[-4,1,3],[-4,2,2]]
              i l r
[-4,-1,-1,0,1,2,2,3]

-2
-1
0
1
0

Pseudocode:
1. Sort nums lowest to highest, store in a sortedNums var
2. Create an output array that's empty
3. Instantiate an i var at 0
4. While i is less than sortedNums.length - 2
    1. At each iteration, set the left pointer to be i + 1
    2. Set the right pointer to be the end of sortedNums: sortedNums.length - 1
    3. While left < right
        1. If the current i + left + right is too small
            1. increment left
            // this should avoid calculating the same incorrect triplet multiple times if duplicates exist
            2. while the new left is the same as the old left
                1. continue incrementing left
        2. Else if the current i + left + right is too large
            1. decrement right
            // this should avoid calculating the same incorrect triplet multiple times if duplicates exist
            2. while the new right is the same as the old right
                1. continue incrementing right
        3. Else:
            1. You've found a 3sum combo, add the current number at i, left, and right in an array to the output array
            2. Increment left
            // this should avoid duplicate triplets in output
            3. While the new left is the same as the old left
                1. Continue incrementing left
    4. increment i
    // this should avoid duplicate triplets in output
    5. while the new i is the same as the old i
        1. continue incrementing i
5. Return output

Time complexity: O(n^2) - Since I'm iterating through nums, and each iteration, iterating through the rest of nums
Space complexity: O(1) - Since I'm only using pointers

*/

function threeSum(nums: number[]): number[][] {
    const sortedNums = nums.sort((a,b) => a - b);
    const output = [];
    let i = 0;
    
    while (i < sortedNums.length - 2) {
        let left = i + 1;
        let right = sortedNums.length - 1;

        while (left < right) {
            if (sortedNums[i] + sortedNums[left] + sortedNums[right] < 0) {
                left += 1;
                while (sortedNums[left] === sortedNums[left - 1]) {
                    left += 1;
                }
            } else if (sortedNums[i] + sortedNums[left] + sortedNums[right] > 0) {
                right -= 1;
                while (sortedNums[right] === sortedNums[right + 1]) {
                    right -= 1;
                }
            } else {
                output.push([sortedNums[i], sortedNums[left], sortedNums[right]]);
                left += 1;
                while (sortedNums[left] === sortedNums[left - 1]) {
                    left += 1;
                }
            }
        }

        i += 1;
        while (sortedNums[i] === sortedNums[i - 1]) {
            i += 1;
        }
    }

    return output;
};

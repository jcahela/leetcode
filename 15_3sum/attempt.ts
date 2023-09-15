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

/*************** Attempt #2 *****************/

/*

I could incorporate the two pointer 2 sum method, and iterate through a sorted nums while at each iteration, using the two pointer 2 sum method

This would run in O(n^2) time since I'm iterating through the nums array once, then the rest of the array once at each iteration, but would be an order of magnitude faster than O(n^3), which would be the brute force solution of checking each combination for a triplet that = 0

Pseudocode:
1. Instantiate a sorted var at nums.sort((a,b) => a - b)
2. Instantiate an output arr at []
3. Instantiate an i var at 0
4. While i < sorted.length - 2 (stop at 2 before the end, so l and r have space to be checked)
    1. Instantiate an l pointer at i + 1
    2. Instantiate an r pointer at sorted.length - 1
    3. While l < r
        1. Instantiate a sum var at sorted[i] + sorted[l] + sorted[r]
        2. If sum < 0, the sum is too small, so increment l
        3. Else if sum > 0, the sum is too large, so decrement r
        4. Else, sum is 0
            1. Push the num at i, the num at l, and the num at r as a triplet array into the output array
            2. Increment l
            3. While the new num at l is the same as the previous num at l
                1. Increment l (this avoids duplicate triplets when moving to a new l)
            4. Decrement r (do I need to decrement r? As long as I ensure l is different, it wouldn't be a triplet)
    4. Increment i
    5. While the new num at i is the same as the previous num at i
        1. Increment i (this avoids duplicate triplets when moving to a new i)
5. Return the output arr

Time complexity: O(n^2)
Space complexity: O(1 if we don't count the output var)

*/

function threeSum(nums: number[]): number[][] {
    const sorted = nums.sort((a,b) => a - b);
    const output = [];
    let i = 0;

    while (i < sorted.length - 2) {
        let l = i + 1;
        let r = sorted.length - 1;

        while (l < r) {
            const sum = sorted[i] + sorted[l] + sorted[r];

            if (sum < 0) {
                l += 1;
            } else if (sum > 0) {
                r -= 1;
            } else {
                output.push([sorted[i], sorted[l], sorted[r]]);
                l += 1;
                while (sorted[l] === sorted[l - 1]) {
                    l += 1;
                }
            }
        }

        i += 1;

        while (sorted[i] === sorted[i - 1]) {
            i += 1;
        }
    }

    return output;
};

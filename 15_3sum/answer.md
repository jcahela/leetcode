Time to Complete: 30m

Method: Knowing the method for 2Sum II - Input Array Is Sorted, we can use that strategy to our advantage. By sorting the input array, we can use the 2Sum II left and right pointer method to find the 2nd and 3rd addends, with the 1st addend being the current number in an outer loop. First, I loop through the nums array, and set the current number as the 1st addend. Then, I check if the current number plus the left and right numbers equal to 0, and push to an answer array if true. Then, I increment left and decrement right to keep checking.

Important caveats to prevent duplicate triplets: 
1) If the current number at i is the same as its left neighbor, and the left neighbor was part of a triplet solution, we'd end up with the same left and right numbers that equal 0, and push the same triplet to the answer array, ending up with a duplicate. So we need to keep incrementing i if we find that the current number is ever the same as its left neighbor.
2) If we find a triplet that goes into the answer array, we need to keep checking the other numbers in the remainder of the array with the left and right pointers to find any other 2 addends that, when added to the current number, equal 0. However, if there are duplicates for left and right, we'd end up with duplicate triplets. To prevent this, when you find a correct triplet but still need to check the rest of the array between left and right, increment left until you get to a new left number (while nums[left] === nums[left - 1]).

Pseudocode:
/*
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
            // this should avoid duplicate triplets in output when continuing the search after finding a correct triplet
            3. While the new left is the same as the old left
                1. Continue incrementing left
    4. increment i
    // this should avoid duplicate triplets in output when going to a new iteration at i
    5. while the new i is the same as the old i
        1. continue incrementing i
5. Return output
*/

Code:

```js
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
```


Time Complexity: O(n^2)
Explanation: Since I'm iterating through nums, and each iteration, iterating through the rest of nums

Space Complexity: O(1)
Explanation: Since I'm only using pointers

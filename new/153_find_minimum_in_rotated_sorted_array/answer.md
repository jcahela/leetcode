Time to Complete: 30m

Method: Using binary search, and figuring out at each iteration which side to shift the pointers to next (left or right). Start a normal binary search, and calculate the index to the left of the current mid pointer (if the mid pointer is at 0 index, the number to its left is nums.length - 1, else the number to its left is m - 1). Next, check if the number to the left of mid is greater than the number at mid. If so, mid is the minimum. If not, shift the pointers. The pointers get shifted depending on if the number at mid is <= the number at right. If so, that means 1) every number to the right of mid is greater, and 2) since mid is not the minimum, the minimum must be to the left. So, shift r to be m - 1. If mid's number is not <= right's number, that means mid's number is greater than the number at right. That means the cycle back to the minimum occurs to the right of mid, so shift l to be m + 1.

Pseudocode:
/*
1. Add an edge case check if nums is of length 1. If so, return the only number in nums.
2. Instantiate a left pointer at 0
3. Instantiate a right pointer at nums.length - 1
4. While left is <= right
  1. Calculate the mid pointer to be l + r / 2 rounded up
  2. Calculate the index to the left of the mid pointer (if m is 0, the index to its left is nums.length - 1, else it's m - 1).
  3. If the number to the left of the mid number is greater than the mid number
    1. That means the mid number is the minimum, so return nums[m]
  4. At this point, mid wasn't the minimum, so shift the pointers. If the mid number is <= the right number
    1. The cycle occurs to the left of mid, so set r = m - 1
  5. Else (mid number is > right number)
    1. The cycle occurs to the right of mid, so set l = m + 1
*/

Code:

```js
function findMin(nums: number[]): number {
    if (nums.length === 1) return nums[0];

    let l = 0;
    let r = nums.length - 1;

    while (l <= r) {
        const m = Math.ceil((l + r) / 2);

        const leftOfM = m === 0 ? nums.length - 1 : m - 1;

        if (nums[leftOfM] > nums[m]) {
            return nums[m];
        }

        if (nums[m] <= nums[r]) {
            r = m - 1;
        } else {
            l = m + 1;
        }
    }
};
```


Time Complexity: O(log n)
Explanation: Since I'm halving the array I'm searching for each iteration

Space: O(1)
Explanation: Since I'm only using pointers

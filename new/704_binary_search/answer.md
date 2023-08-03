Time to Complete: 15m

Method: Binary search using three pointers - a left pointer, a right pointer, and a mid pointer. Starting with the left and right pointers at the ends of the sorted array, I calculate the midway point rounded up. Then, using a while loop, while the left pointer is less than or equal to the right pointer, I check if the number at the mid point is less than, greater than, or equal to the target. If less than, I move the left pointer to be 1 more than the midpoint. If greater than, I move the right pointer to be 1 less than the midpoint. This ensures that, at the end, I can check every number as left approaches right. If I don't use +1 or -1 from the midpoint, I can miss a number between the two pointers, or end up in an infinite loop.

Pseudocode:
/*
1. Instantiate a left pointer at 0
2. Instantiate a right pointer at nums.length - 1
3. While left <= right (we want to allow left to be equal to right at the final check, in case they land at the same index, and that's the only index we haven't checked)
    1. const mid = the number at left + the number at right, rounded up
    2. const midNum = nums[mid]
    3. Is the target less than the midNum?
        1. Set the right pointer to be mid - 1 (since we already checked mid, the new array to be searched is every index before mid)
    4. Is the target more than the midNum?
        1. Set the left pointer to be mid + 1 (since we already checked mid, the new array to be searched is every index after mid)
    5. Is the target the midNum?
        1. return the mid pointer
4. Return -1 (target wasn't found)
*/

Code:

```js
function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
      const mid = Math.ceil((left + right) / 2);
      const midNum = nums[mid];

      if (target < midNum) {
          right = mid - 1;
      } else if (target > midNum) {
          left = mid + 1;
      } else {
          return mid;
      }
  }

  return -1;
};

```


Time Complexity: O(log n)
Explanation: Where n is the length of the nums array. Since each iteration halves the array, it results in a logarithmic relationship between the number of operations and the length of n, so log n.

Space Complexity: O(1)
Explanation: Since I'm only using pointers

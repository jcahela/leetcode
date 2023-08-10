Time to Complete: 30m

Method: Using binary search, and dividing up the array conceptually into a left sorted portion, and right sorted portion, we can determine which direction to search (left or right) at each iteration. If the left num is less than or equal to the mid num, that means the left side is sorted. So I can check if the target is between left and mid. If so, I go left, if not go right. Else (left num is strictly greater than the mid num), that means the right side is sorted. So I can check if the target is between mid and right. If so, I go right, if not, go left.

Pseudocode:
/*
1. Instantiate a left pointer at 0
2. Instantiate a right pointer at nums.length - 1
3. While left <= right
    1. Calculate mid at Math.ceil((left + right) / 2);
    2. Check if the target is the number at mid
        1. If it is, return mid index
    3-4. Do the same checks for number at left and number at right, why not
    5. Check if the number at left is <= the number at mid:
        1. That means the left side is sorted, so check if the target is between the number at left and the number at mid
            1. If it is, then go left
            2. Else, go right
    6. Else (number at left is greater than the number at mid):
        1. That means the right side is sorted, so check if the target is between the number at mid and the number at right
            1. If it is, then go right
            2. Else, go left
4. Return -1
*/

Code:

```js
function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
      const mid = Math.ceil((left + right) / 2);

      const leftNum = nums[left];
      const midNum = nums[mid];
      const rightNum = nums[right];

      if (leftNum === target) return left;
      if (midNum === target) return mid;
      if (rightNum === target) return right;

      if (leftNum <= midNum) {
          if (leftNum < target && target < midNum) {
              right = mid - 1;
          } else {
              left = mid + 1;
          }
      } else {
          if (midNum < target && target < rightNum) {
              left = mid + 1;
          } else {
              right = mid - 1;
          }
      }
  }

  return -1;
};
```


Time Complexity: O(log n)
Explanation: Since I'm halving the array I have to search every iteration

Space: O(1)
Explanation: Since I'm using pointers only

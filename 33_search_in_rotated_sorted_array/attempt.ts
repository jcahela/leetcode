/*

I need to figure out which direction to go in each way

depending on the target, the target could be greater than or equal to the middle number I'm checking

if the rotated sorted array is:
             r
       m
 l            
 0 1 2 3 4 5 6
[5,6,7,0,1,2,4]

And I'm searching for 0, what can I use to help me find if 0 is to the right or left?

First, check if the middle number is the target, if it is, return mid pointer

Continuing from here, mid pointer is not the target, so check whether the left or right side is sorted

if left is less than or equal to mid (the left side is sorted):
    if the left side is sorted, I can check if the target is between left and mid
        if it is, go left
        else, go right

else (the right side is sorted):
    if the right side is sorted, I can check if the target is between mid and right
        if it is, go right
        else, go left

     r
     m
     l            
 0 1 2 3 4 5 6
[5,6,7,0,1,2,4]

target = 6

Pseudocode:

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

Time complexity: O(log n) - Since I'm halving the array I have to search every iteration
Space complexity: O(1) - Since I'm using pointers only

*/

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



/********************* Attempt 2 - done in 5 mins ***********************/

/**

Use binary search

First, check if the target is the middle number, if it's not, continue
Starting at the middle, check if the left number is less than or equal to the mid number
    - If so, the left side is sorted
        If the left side is sorted, I can check if the target is greater than mid or less than left
            - if either of these are true, I go right
        Else
            - The target is both smaller than mid and greater than left, so I go left
    - else, the right side is sorted
        If the right side is sorted, I can check if the target is greater than right or less than mid
            - If either of these are true, I go left
        Else
            - The target is both smaller than right and greater than mid, so I go right

Time complexity: O(log n) - Since I'm using binary search
Space complexity: O(1) - Since I'm only using pointers

 */

function search(nums: number[], target: number): number {
    let l = 0;
    let r = nums.length - 1;

    while (l <= r) {
        const m = Math.ceil((l + r) / 2);

        if (nums[m] === target) {
            return m;
        }

        if (nums[l] <= nums[m]) {
            if (target > nums[m] || target < nums[l]) {
                l = m + 1;
            } else {
                r = m - 1;
            }
        } else {
            if (target < nums[m] || target > nums[r]) {
                r = m - 1;
            } else {
                l = m + 1;
            }
        }
    }

    return -1;
};

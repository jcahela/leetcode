/*

In order to run a search algorithm at O(log n) time, I'd need to half the array at each iteration of searching. This is binary search

At the beginning, I'd need to find the mid point of the array. I'd start by having a left pointer at 0 and right pointer at nums.length - 1. Then I'd Math.ceil((right + left) / 2);

  0 1 2 3 4  5
[-1,0,3,5,9,12]

left = 0
right = 5

5 / 2 = 2.5 rounded up = 3; The number at index 3 is 5; target is 9

target is more than the num at index 3, so set left to be the mid point, recalculate mid:

left = 3
right = 5

(3 + 5) / 2 = 8 / 2 = 4

9 / 2 = 4.5 rounded up = 5

Then ask, is the target the mid point? Return the index
If that's not true, then is the target less than or more than the mid point?

The target is less than, so set the right pointer to the middle, then recalculate the middle

Pseudocode:
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

Time complexity: O(log n) - Since we're halving the searchable array each iteration, the time complexity is log n
Space complexity: O(1) - Since we're only using pointers

*/

// target = 2

//  r
//  m
//  l         
//  0
// [5]
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

/****************** Attempt #2 - easy, basic binary search *********************/

function search(nums: number[], target: number): number {
    let l = 0;
    let r = nums.length - 1;

    while (l <= r) {
        const m = Math.ceil((l + r) / 2);

        if (target < nums[m]) {
            r = m - 1;
        } else if (target > nums[m]) {
            l = m + 1;
        } else {
            return m;
        }
    }

    return -1;
};

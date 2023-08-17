/*

When a sorted array is rotated 0 times, it looks like this:

[11,13,15,17,19]

    smallest item on the left, largest item on the right
    if there are 3 pointers like in binary search, l < mid < r

When a sorted array is rotated 1 time, it looks like this:

[13,15,17,19,11]

    Smallest item on the right, largest item on the right
    if there are 3 pointers, l < m > r

When a sorted array is rotated 2 times, it looks like:

[15,17,19,11,13]

    smallest item on the right, largest item on the left
    if there are 3 pointers, l > m < r

When a sorted array is rotated 3 times:

[17,19,11,13,15]

    smallest item on the right, largest on the left
    if 3 pointers: l > m < r


So I need to implement binary search, and find the side that contains the smallest number each iteration

if l > m && m < r that means the nums cycles to the smallest between the left number and the mid number, so the smallest number is to the left

if l < m && m <= r that means it's in order, so the smallest is on the left

if l < m && m > r that means the nums cycle to the smallest between the mid and right number, so the smallest number is to the right

        r
        m 
        l
[14,15,10,11,12,13]

Maybe each mid I get I check if the number before it is greater, that would make it the minimum

Pseudocode:
1. Make a left pointer at 0
2. Make a right pointer at nums.length - 1
3. While left <= right:
    1. Make a mid pointer at Math.ceil((l + r) / 2)
    2. Check num at mid: if nums[m - 1] > nums[m]:
        1. return nums[m]
    3. if (nums[l] > m && nums[m] < nums[r]) || (l < m && m <= r)
        1. Set right pointer to mid - 1
    4. if (nums[l] < nums[m] && nums[m] > nums[r]):
        1. Set left pointer to mid + 1

Time complexity: O(log n) - Since I'm halving the array I'm searching for each iteration
Space complexity: O(1) - Since I'm only using pointers

*/

//          r
//          m
//        l
//  0 1 2 3 4
// [3,4,5,1,2]
function findMin(nums: number[]): number {
  if (nums.length === 1) return nums[0];
  let l = 0;
  let r = nums.length - 1;

  let minimum = Infinity;

  while (l <= r) {
      const m = Math.floor((l + r) / 2);
      
      if (nums[m] < nums[r]) {
          minimum = Math.min(nums[m], minimum);
          r = m - 1;
      }
      
      if (nums[m] > nums[r]) {
          minimum = Math.min(nums[l], minimum);
          l = m + 1;
      }
  }

  return minimum;
};

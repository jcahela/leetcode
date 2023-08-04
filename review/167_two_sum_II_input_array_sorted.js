/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}

Since the array is sorted in non-decreasing order, I can use two pointers that start at either end. If I come up to a sum between the two numbers that are too small, incrementing the left pointer will always result in a larger sum eventually. If the sum of the two numbers is too large, decrementing the right pointer will always result in a smaller sum eventually (if there are repeats, I could continue incrementing/decrementing until I come to a number that's different, then do the sum calculation again).

Since there is exactly one solution, I will find an answer with this method prior to the pointers overlapping in the middle

Using the two pointers approach, I can do this using constant extra space (no need for a hashmap)

Pseudocode:

1. Instantiate a left pointer at 0
2. Instantiate a right pointer at numbers.length - 1
3. While the left pointer is less than the right pointer
    1. If the sum of the number at the left pointer and the number at the right pointer is less than the target
        1. Increment l
        2. While the new number at l is the same as the previous number at l, continue incrementing l
    2. Else if the sum of the number at left pointer and the number at right pointer is greater than the target
        1. Decrement r
        2. While the new number at r is the same as the previous number at r, continue decrementing r
    3. Else
        1. Return [l + 1, r + 1] since we want to return the indices of the two numbers added by one in an integer array of length 2

Time complexity: O(n) - since we only need to iterate over the numbers array once using the two pointers (out -> in)
Space complexity: O(1) - since we only need to use pointers to find the two sum

 */
var twoSum = function(numbers, target) {
  let l = 0;
  let r = numbers.length - 1;

  while (l < r) {
      if (numbers[l] + numbers[r] < target) {
          l += 1;
          while (numbers[l] === numbers[l - 1]) {
              l += 1;
          }
      } else if (numbers[l] + numbers[r] > target) {
          r -= 1;
          while (numbers[r] === numbers[r + 1]) {
              r -= 1;
          }
      } else {
          return [l + 1, r + 1];
      }
  }

};

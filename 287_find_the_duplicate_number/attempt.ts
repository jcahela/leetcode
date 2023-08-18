/*

 0 1 2 3 4
[1,3,4,2,2]

If the indices are nodes, and the values are pointers, this would be the linked list

                             sf
(0) -> (1) -> (3) -> (2) -> (4)
                      ^
                      |      |
                      --------

Since the integer nums contains n + 1 integers, and each integer is in the range between 1 and n, that means for each value in the array, it can point to an index within the array that exists. That hints that it's a linked list cycle problem. Since it's a linked list cycle, I can use that to jump around the array like a linked list, treating each value at the index as the pointer to the next value. Then, using Floyd's algorithm, I can detect where the pointers meet. Once I find where the pointers meet, I set the slow pointer back to the beginning of the linked list, then count up by 1 for each pointer. This allows me to find the beginning of the linked list cycle, which in the array representation, would be the duplicate number (if two indices in the array has the same value, they both point to the same number, and that number they both point to, the value they both are in the array, is the duplicate).

Pseudocode:

1. Instantiate a slow pointer at 0
2. Instantiate a fast pointer at 0
3. while true
    1. set slow pointer to be nums[slow]
    2. set fast pointer to be nums[nums[fast]]
    3. if slow === fast break
4. set slow pointer back to 0
5. while true
    1. set slow pointer to be nums[slow]
    2. set fast pointer to be nums[fast]
    3. if slow === fast return nums[slow]

Time complexity: O(n) - Since we're iterating through a linked list cycle using floyd's algorithm, it has a time complexity of O(n)
Space complexity: O(1) - Since we're only using pointers

        s
        f
 0  1  2  3  4
[1, 3, 4, 2, 2]

 sf
(0) -> (1) -> (3) -> (2) -> (4)
                      ^
                      |      |
                      --------

*/

function findDuplicate(nums: number[]): number {
  let slow = 0;
  let fast = 0;

  while (true) {
      slow = nums[slow];
      fast = nums[nums[fast]];
      if (slow === fast) break;
  }

  slow = 0;

  while (true) {
      slow = nums[slow];
      fast = nums[fast];
      if (slow === fast) return slow;
  }
};
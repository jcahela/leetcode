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

/**************** Attempt #2 floyd's algorithm + finding beginning of a cycle with floyd's algorithm *******************/

/*

Using only constant space, I can't keep a hashmap of each number and use that to detect duplicates, so I have to only use pointers

Since the array of integers contains n + 1 integers, and each integer is within range of 1 and n (inclusive), that means each number can point to an index that exists in the array

So I could consider each number a pointer to another index, and their index as the value

I could consider this a linked list and if there's a duplicate, that means two different integers point to the same index

vals:      0 1 2 3 4
pointers: [1,3,4,2,2]

                      sf
(0) -> (1) -> (3) -> (2) -> (4)
                      |______|

If two different integers point to the same index, that means there's a cycle in the list at some point, because on a non-cycle list, only one node points to certain node, by definition/nature

I'd have to find if a cycle exists, then find the start of that cycle

Using Floyd's algorithm, I can find the point where they equal each other, then reset slow to 0, and go through the list from the point of the repeated number up to the point where they equal each other again. That is the duplicate

Pseudocode:
1. Instantiate a slow pointer at 0
2. Instantiate a fast pointer at 0
3. while true
    1. slow = nums[slow];
    2. fast = nums[nums[fast]];
    3. if (slow === fast) break;
4. slow = 0;
4. while true
    1. slow = nums[slow];
    2. fast = nums[fast];
    3. if (slow === fast) return slow; (this should be the duplicate number, since we're using the indices as the values of the nodes)

Time complexity: O(n) - Since I'm traversing through the list in a coefficient of n to find the cycle, then from 0 to that duplicate in length to find the duplicate. This simplifies to O(n)

Space complexity: O(1) - Since I'm only using pointers

*/
//                f
//                s   
// vals:      0 1 2 3 4
// pointers: [1,3,4,2,2]

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
        if (slow === fast) return slow;
        slow = nums[slow];
        fast = nums[fast];
    }
};


/******************** Attempt #3 - fast, using floyd's algorithm ***********************/

/*

floyd's algorithm to find where slow and fast meet in the cycle,
then resetting slow to 0 and incrementing both by 1 until they meet to find the beginning of the cycle, which is the duplicate

1. Slow pointer at 0
2. Fast pointer at 0
3. while true
    1. slow = nums[slow]
    2. fast = nums[fast][fast]
    3. if slow === fast, break
4. Slow = 0
5. while true
    1. slow = nums[slow]
    2. fast = nums[fast]
    3. if slow === fast return slow

Time complexity: O(n)
Space complexity: O(1) 

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

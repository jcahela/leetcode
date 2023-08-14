Time to Complete: 30m

Method: This is a linked list cycle problem because it's specified that the array of numbers contains n + 1 integers, and each integer is between 1 and n, meaning each integer is also within the range of the indices of the array itself, and can point to an existing index. Since there's always a duplicate, this means that each number can point to an index within the same array, and eventually lead to a cycle (between the two indices that have the same value, and thus point to the same index). So, in order to find if there's a duplicate, it's an extension of Floyd's Algorithm/Tortoise and Hare problem. Except this time, when the slow and fast pointer meet, they are always the same distance away from the start of the linked list cycle. And since two pointers point to the same node, that node would be the duplicate, which is the start of the cycle. So the problem becomes "find the start of the linked list cycle in this linked list cycle". To do it, you run Floyd's Algorithm until slow and fast meet, then you set slow back to the beginning, and increment both by one. Once they meet again, you've found the beginning of the cycle, and thus the duplicate number, which would be the value of slow and fast as they meet the second time.

Pseudocode:
/*

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

*/


Code:

```js
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
```


Time Complexity: O(n) 
Explanation: Since we're iterating through a linked list cycle using floyd's algorithm, it has a time complexity of O(n)

Space Complexity: O(1)
Explanation: Since we're only using pointers

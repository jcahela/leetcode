Time to Complete: 15m

Method: Floyd's algorithm of slow and fast pointers. By incrementing the slow pointer by 1, and incrementing the fast pointer by 2, if they ever point at the same node, then a cycle must exist in the linked list. If there was no cycle, the fast pointer would outrun the slow pointer until the end of the list, and they'd never point at the same node. This is one of those "you gotta know it before you know it" type solutions.

Note: Why does Floyd's algorithm always work in detecting cycles? If slow goes 1 at a time and fast goes 2 at a time, isn't it possible that fast would miss slow by 1 and overlap it each time, resulting in them never pointing at the same node at once, while both pointers endlessly cycle through the linked list? If there's a finite distance between the fast pointer and slow pointer (in a linked list with a cycle), the fast pointer always goes a distance of 2, and the slow pointer goes a distance of 1. That means, each iteration, the fast pointer gets closer to the slow pointer by -2 +1, or by -1 each iteration. That means, the distance between them gets closer by 1 each iteration. Eventually, they will point at the same node once the distance between them goes down to 0.

Pseudocode:
/*
0. Edge case: if no head.next, return false (single node linked list is not a cycle)
1. Instantiate a slow pointer that starts at head
2. Instantiate a fast pointer that starts at head
3. while fast is truthy
    1. increment slow by 1
    2. increment fast by 2
    3. check if slow === fast
        1. if so, return true
4. return false
*/


Code:

```js
function hasCycle(head: ListNode | null): boolean {
    if (!head?.next) return false;
    let slow = head;
    let fast = head;

    while (fast) {
        slow = slow.next;
        fast = fast.next?.next;
        if (slow === fast) {
            return true
        }
    }
    return false;
};
```


Time Complexity: O(n)
Explanation: Since I'm traversing the list once, or cycling through the cycle with the fast pointer while traversing one at a time with the slow pointer, the most operations would be traversing n times through the list with the slow pointer

Space Complexity: O(1)
Explanation: Since I'm only using pointers

Time to Complete: 30m

Method: This problem can be solved in three parts: 1. Find the second half of the list, 2. Reverse the second half of the list, and 3. Merge the first half of the list and the reversed second half of the list. In order to find the second half of the list, you can use a Slow and Fast pointer. The "tortoise and the hare" algorithm uses a Slow and Fast pointer, where Slow increments 1 each iteration, and Fast increments 2. By the time Fast gets to the end of the list, Slow will be at the end of the first half of the list. At this point, slow.next becomes the head of the second half, and then you'll set slow.next to be null (cut off from the second half).

     s     f
[0,1,2,3,4,5]
  First: [0,1,2]
  Second: [3,4,5]

       s       f
[0,1,2,3,4,5,6]
  First: [0,1,2,3]
  Second: [4,5,6]

Once you get the second half of the list, you reverse it (simple reverse linked list algorithm), and find the new head on the reversed list. Then, once you have the head of the reversed second half list, you merge that list and the cut off first half of the list, into a single list. This results in the alternation needed.

Pseudocode:
/*

// find middle
1. Instantiate a variable slow at head
2. Instantiate a variable fast at head.next
3. while fast && fast.next (while fast is still within the list and not at the end of the list, we want this loop to keep going)
  1. Set slow to be slow.next (increment by 1)
  2. Set fast to be fast.next.next (increment by 2)

// reverse second half
4. Instantiate a second variable that starts at slow.next (this is the second half of the list)
5. Set slow.next to null (splits the first half of the list from the second)
6. Instantiate a prev variable that starts at null
7. while second is truthy (head of the second half of the list)
  1. store second.next in a tmp variable
  2. set second.next = prev
  3. set prev = second
  4. set second = tmp

// merge two halves
8. Instantiate a first variable that starts at head
9. Set second (second head) to be prev (the new head of the reversed second half list)
(Now we have first and second, and we can merge them.)
10. while (second) // we know second is shorter or equal to the first half, based on where the slow pointer stopped in the tortoise and hare algorithm
  1. store first.next into a temp variable tmp1
  2. store second.next into a temp variable tmp2
  3. Set first.next to be second
  4. Set second.next to be tmp1 (first.next's original next value)
  5. Set first to be tmp1 (first's original next value)
  6. Set second to be tmp2 (second's original next value)


*/


Code:

```js
function reorderList(head: ListNode | null): void {
    // Goal 1: Find the median head:
    let slow = head;
    let fast = head.next;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    let second = slow.next;
    slow.next = null;

    // Goal 2: Reverse the list of the medianHead
    let prev = null;

    while (second) {
        let tmp = second.next;
        second.next = prev;
        prev = second;
        second = tmp;
    }

    // Goal 3: Now we have head and secondHead (reversed second half), we can merge the two
    let first = head;
    second = prev;

    while (second) {
        // Store the original next pointers in tmp1 and tmp2
        let tmp1 = first.next;
        let tmp2 = second.next;

        // Break the next pointers and point them to second and tmp1
        first.next = second;
        second.next = tmp1;

        // Increment the pointers, first becomes tmp1, second becomes tmp2. It's zipping!
        first = tmp1;
        second = tmp2;
    }
};
```


Time Complexity: O(n)
Explanation: Since we iterate over the list once to get the half, and another time to reverse the second half, and a third time to zip, these simplify down to O(n)

Space: O(1)
Explanation: Since we only use pointers to do the 3 steps of finding the start of the second half, reversing the second half, then merging the first and second halves

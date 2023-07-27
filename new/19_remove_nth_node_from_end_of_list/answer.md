Time to Complete: 30m

Method:

My method: Count the number of nodes in the list, then store that in a variable. Subtract the n input from that number of nodes to get the number of nodes from the front that the node is that needs to be skipped. Then, iterate over the list using that calculation to stop at the node before the one that needs to be skipped, and set the node before it to have its next pointer be next.next. Then you're done.

Neetcode method: Use two pointers, left and right. Set left to start at the dummy node (1 before the head), and set right to be n + 1 more than the left pointer. Increment both until right is at the end of the list (null), and left will be on the node before the one that needs to be deleted. Once at that point, you can skip the node after the left node, and return dummy.next. Then you're done.

Pseudocode:

My Pseudocode:
/*

1. Instantiate a counter that starts at 0
2. Instantiate a dummy that starts at new ListNode
3. Instantiate a tail at dummy
4. Set tail.next = head
5. While (tail)
    1. go to the next node: tail = tail.next
    2. Increment the counter by 1
6. Now that you have a count of the whole list in the counter variable, subtract n from it to get the node that needs to be removed
7. Instantiate a stop variable that starts at counter - n
8. Set tail to be dummy again
9. While (stop > 0)
    1. go to the next node: tail = tail.next
    2. Subtract 1 from the stop variable
    (this makes it so tail will stop at the node before the one that needs to be skipped)
10. Set tail.next = tail.next.next
11. Return dummy.next

*/

Neetcode Pseudocode:
/*

1. Instantiate a dummy node that has head as its next value (let dummy = new ListNode(0, head))
2. Set left to = dummy
3. Set right to = head
4. While (n > 0) AND right node is truthy (hasn't hit the null)
  1. increment the right node by 1
  2. decrement n by 1
5. By this point, right should be at its starting point n + 1 distance away from left, the latter of which is on the dummy node still
6. While right is truthy
  1. increment left
  2. increment right
7. Now, left is on the node before the one we want to delete. Delete its next node by doing left.next = left.next.next
8. Finally, return dummy.next

*/

Code:

```js
// My code:
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    let counter = 0;
    const dummy = new ListNode();
    let tail = dummy;
    tail.next = head;
    
    while (tail.next) {
        tail = tail.next;
        counter += 1;
    }

    let stop = counter - n;
    tail = dummy;

    while (stop > 1) {
        tail = tail.next;
        stop -= 1;
    }

    tail.next = tail.next.next;

    return dummy.next;
};


// Neetcode code:
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  const dummy = new ListNode(0, head);
  let left = dummy;
  let right = head;

  while (n > 0 && right) {
    right = right.next;
    n -= 1;
  }

  while (right) {
    left = left.next;
    right = right.next;
  }

  left.next = left.next.next;

  return dummy.next;
};
```


Time Complexity: O(n)
Explanation: Since we only need to iterate over the list once to get the length (or the left pointer with the two pointer method), and another time minus n to get the stopping point, simplifying to O(n)

Space: O(1)
Explanation: Since we only use pointers to find the node to skip

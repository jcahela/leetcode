/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

/*

Idea: I could find the length of the linked list, then subtract that length by n to get the node I'd need to remove

Once I know the node I need to remove, I need to iterate through the list again, and stop 1 before the node I need to remove, then I can set its curr.next pointer to be curr.next.next

Finally, I can return the head

Pseudocode:
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

Time complexity: O(n) - Since we only need to iterate over the list once to get the length, and another time minus n to get the stopping point, simplifying to O(n)
Space complexity: O(1) - Since we only use pointers to find the node to skip

*/

/*

counter = 5
dummy = ()
tail = dummy
stop = (5 - 2) = 0

dt
() -> (1) -> (2) -> (3) -> (4) -> (5) -> null
                      \___________/
*/

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

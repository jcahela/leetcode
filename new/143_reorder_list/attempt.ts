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


[1,2,3,4,5,6]

[1,6,2,5,3,4]

Since it's a singly linked list, I can't go backward from 6. How to get 
    1 to point to 6, 
    then 6 to point to 2, 
    then 2 to point to 5, 
    then 5 to point to 3, 
    then 3 to point to 4?

Shrink the problem down:

Let's say it's a 2-node list:
[1,2]
it's already solved, 1 points to 2, or L[0] points to L[n]

Split the list in half, reverse the second half, merge the two lists

Split the list in half:
To split the list in half, I have to find the middle node. I can do this by iterating through the list, and counting a variable up until I get to the end. Then, outside the loop, I can divide the variable by 2 rounded up, and that's the number of nodes until I get to the head of the second list.

Then, I have to find the median using the variable:
To do this, I iterate over the list again, then subtract 1 from the variable and stop once the variable is 0. If on a node list of 4, I will need to stop at the 3rd node, so the median variable would be 2, and I'd start at 1 in the beginning of the loop:
    go to the next node (2), subtract from 2 by 1 (1)
    go to the next node (3), subtract from 1 by 1 (0)
    break from the loop since the variable is now 0

Now I have the head and the median, I will need to reverse the median list:
    1. use prev, curr, and nxt to reverse the median list

Then, once I have the head and the reversed median list (in prev), I can merge the two:
    1. Use dummy node and tail node
    2. alternate between list1 and list2, pointing the next to the other one's head

Pseudocode:
Goal 1: Find the median head:
1. Instantiate a nodeCount variable that starts at 0
2. Instantiate a dummy node that starts at new ListNode()
3. Instantiate a tail node that starts at dummy
4. Set tail.next = head
5. while (tail)
    1. set tail = tail.next
    2. add 1 to the nodeCount variable
6. Instantiate a median variable that is Math.ceil(nodeCount / 2). This is where the 2nd half starts
7. Set tail back to dummy: tail = dummy
8. while (median > 0)
    1. set tail = tail.next
    2. subtract 1 from median variable: median - 1
9. Instantiate a secondHead variable that starts at tail.next (at this point, tail will be on the last node before the start of the second half, so the secondHead will start at tail.next).

Goal 2: Reverse the list of the medianHead
1. Instantiate a prev variable that starts at null
2. Instantiate a curr variable that starts at newHead
3. while (curr)
    1. Instantiate a nxt variable that stores curr.next
    2. Set curr.next = prev
    3. Set prev = curr;
    4. Set curr = nxt
4. Instantiate a variable reversedListHead = prev (this is the head of the reversed second half)

Goal3: Now we have head and reversedListHead, we can merge the two:
1. Set tail = dummy
2. Instantiate a counter that'll allow us to alternate between head and reversedListHead: 0
3. Instantiate a nxt variable
3. while (tail)
    1. if (counter % 2) // if counter is even
        1. Set tail.next = head;
        2. Save head.next into nxt
        2. Set head.next = reversedListHead
        3. Set head = head.next;
    2. else // if counter is odd
        1. Set tail.next = reversedListHead
        2. Set reversedListHead.next = head;
        3. Set reversedListHead = reversedListHead.next;
    3. Add 1 to the counter
    4. tail = tail.next
4. No need to return, it should've modified the head in place
*/

/**
 Do not return anything, modify head in-place instead.
 */
 function reorderList(head: ListNode | null): void {
  // Goal 1: Find the median head:
  let nodeCount = 0;
  let dummy = new ListNode();
  let tail = dummy;
  tail.next = head;

  while (tail) {
      tail = tail.next;
      nodeCount += 1;
  }

  let median = Math.ceil(nodeCount / 2);

  tail = dummy;

  while (median > 0) {
      tail = tail.next;
      median -= 1;
  }

  let secondHead = tail.next;

  // Goal 2: Reverse the list of the medianHead
  let prev = null;
  let curr = secondHead;

  while (curr) {
      let nxt = curr.next;
      curr.next = prev;
      prev = curr;
      curr = nxt;
  }

  let reversedListHead = prev;

  // Goal 3: Now we have head and reversedListHead, we can merge the two
  tail = dummy;
  let alternator = 0;
  while (head && reversedListHead) {
      if (alternator % 2 === 0) {
          tail.next = head;
          head = head.next;
      } else {
          tail.next = reversedListHead;
          reversedListHead = reversedListHead.next;
      }
      tail = tail.next;
  }

  if (head) tail.next = head;
  if (reversedListHead) tail.next = reversedListHead;
};

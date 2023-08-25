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

/********************** Attempt 2 - forgot tortoise and hare to find the middle *********************/

/*

In order to reorder the list, I will need to do a few things:

- Be able to traverse from the head to the middle
- Be able to traverse from the end to the middle

While traversing both of the above, alternate where each points to to create the reordered list

Therefore, I need to cut the list in half, then reverse the second half, then splice them together using a dummy node to hold the head of the spliced list

How do I find the middle?

(1) -> (2) -> (3) -> (4) -> (5)

(1) -> (5) -> (2) -> (4) -> (3)

I could traverse the whole thing and count how many nodes there are:

5

Then, get the ceiling of the result divided by 2: Math.ceil(5 / 2) = 3

Then, traverse through the list again, and decrement the divided result, until the divided result is 0

0

dummy() -> (1) -> (2) -> tail(3) -> (4) -> (5)

Once I get to that point, I store the next of curr in a var (l2), then I set next of curr to be null

l1 = dummy.next; // (1) -> (2) -> (3) -> null
l2; // (4) -> (5) -> null

Then, I reverse l2

l2Reversed = (5) -> (4)

Alternate between the two using an alternating variable or something:
addingL1 = true;

Then, I set a tail and dummy, and go while l1 and l2Reversed is not null:
    if (addingL1) {
        Add l1 to the tail
        Set l1 to l1.next
        Set tail to be tail.next
        addingL1 = false;
    } else {
        Add l2 to the tail
        Set l2 to l2.next
        Set tail to be tail.next
        addingL1 = true;
    }

Then, if either l1 or l2 is still truthy, add that to the tail, and return the dummy.next head node

Pseudocode:
// Find the length of the list
1. Instantiate a dummy node at new ListNode()
2. Instantiate a tail node that = dummy
3. Set tail.next to head (which sets dummy's .next to head too)
3. Instantiate a count var at 0
4. While tail
    1. Set tail to be tail.next
    2. Add 1 to count

// Find the middle using the count, store the second half in a variable
5. Instantiate an l2 that's empty
6. Reset tail to = dummy
7. While count > 0
    1. Subtract 1 from count
    2. Set tail to be tail.next
8. Set l2 to be tail.next
9. Set tail.next to be null

// Reverse the second half
10. Instantiate a prev var at null
12. While l2
    1. Store l2.next in a temp var
    2. Set l2.next to be prev
    3. Set prev to be l2
    4. Set l2 to be the temp var

// Use tail and prev to splice together the lists
13. Set tail to be dummy
14. Instantiate an l1 var to be dummy.next
15. Instantiate an l2 var to be prev
16. Instantiate a var called addingL1 to true
17. While l1 && l2
    1. if addingL1
        1. tail.next = l1
        2. l1 = l1.next
        3. addingL1 = false
    2. Else
        1. tail.next = l2
        2. l2 = l2.next
        3. addingL1 = true
    3. tail = tail.next
18. If l1 is truthy
    1. Add l1 to the end of tail: tail.next = l1
19. If l2 is truthy
    1. Add l2 to the end of tail: tail.next = l2
20. Return dummy.next

*/

function reorderList(head: ListNode | null): void {
    // Find the length of the list
    const dummy = new ListNode();
    let tail = dummy;
    tail.next = head;
    let count = 0;

    while (tail) {
        tail = tail.next;
        count += 1
    }

    // Find the middle using the count, store the second half in a variable
    let l2;
    tail = dummy;
    tail.next = head;
    let halfway = Math.ceil(count / 2);
    console.log(halfway)
    while (halfway > 1) {
        halfway -= 1;
        tail = tail.next;
    }
    // console.log(tail);
    
    // Reverse the second half
    l2 = tail.next;
    tail.next = null;

    let prev = null;
    while (l2) {
        const temp = l2.next;
        l2.next = prev;
        prev = l2;
        l2 = temp;
    }
    
    // Use tail and prev to splice together the lists
    tail = dummy;
    let l1 = dummy.next;
    l2 = prev;
    let addingL1 = true;
    
    while (l1 && l2) {
        if (addingL1) {
            tail.next = l1;
            l1 = l1.next;
            addingL1 = false;
        } else {
            tail.next = l2;
            l2 = l2.next;
            addingL1 = true;
        }
        tail = tail.next;
    }

    if (l1) {
        tail.next = l1;
    }

    if (l2) {
        tail.next = l2;
    }
};

/*************** Attempt #3 - Remembered Floyd's Algorithm to find the middle, merged 2 at a time using 2 tmp vars correctly first try ******************/

/*

First I need to find the middle of the list

Then, I need to split the list so that I have:
    1. one list that goes from the beginning to the middle, and
    2. another list that goes from the middle to the end

Then, I need to reverse the second list

Then, I need to merge the two lists by alternating between which ones I set to next

Then, I return the head of the merged list
               s                   f
(1) -> (2) -> (3) -> null

(4) -> (5) => (5) -> (4)

dummy ->       (1)  (2)  head(3) -> tmp1 null
                |  / |   /
               (5)  tail(4)  prev(null)

tmp1 = head.next;
tmp2 = prev.next;
tail.next = head
head.next = prev

head = tmp1
prev = tmp2
tail = tail.next.next

Pseudocode:
// Find the middle of the list and split them - Using Floyd's algorithm of a fast and slow pointer
1. Instantiate a slow pointer at head
2. Instantiate a fast pointer at head.next
3. While fast and fast.next
    1. Set slow to be slow.next
    2. Set fast to be fast.next.next
4. At this point, slow should be at the end of the first list, so instantiate a head2 var at slow.next
5. Then, set slow.next to be null

// Reverse the second list
6. Instantiate a prev var at null
7. While head2
    1. Save head2.next in a tmp var
    2. Set head2.next to be prev
    3. Set prev to be head2
    4. Set head2 to be tmp
8. At this point, head and prev should be the heads of the lists to merge

// Merge the first half list and the reversed second half list
9. Instantiate a dummy node that points to head
10. Instantiate a tail node that = dummy
11. While head or prev are truthy
    1. Instantiate a tmp1 var at head.next
    2. Instantiate a tmp2 var at prev ? prev.next : null
    3. Set tail.next to be head
    4. Set head.next to be prev
    5. Set head to be tmp1
    6. Set prev to be tmp2
    7. Set tail to be tail.next.next
12. Return dummy.next

Time complexity: O(n) - Since I'm traversing through half the list to find the mid pointer, half the list to reverse the second half, then through the whole list while merging the two halves, it simplifies to O(n)

Space complexity: O(1) - Since I'm only using pointers

*/

function reorderList(head: ListNode | null): void {
    // Find the middle of the list and split them - Using Floyd's algorithm of a fast and slow pointer
    let slow = head;
    let fast = head.next;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    let head2 = slow.next;
    slow.next = null;

    // Reverse the second list
    let prev = null;
    while (head2) {
        const tmp = head2.next;
        head2.next = prev;
        prev = head2;
        head2 = tmp;
    }

    // Merge the first half list and the reversed second half list
    let tail = new ListNode();

    while (head || prev) {
        const tmp1 = head.next;
        const tmp2 = prev ? prev.next : null;

        tail.next = head;
        head.next = prev;

        head = tmp1;
        prev = tmp2;

        tail = tail.next.next;
    }
};

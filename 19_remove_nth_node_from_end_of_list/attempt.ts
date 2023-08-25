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

/******************* Attempt #2 calculate length of list and use the diff ********************/

/*

I could count the number of nodes in the list
Then subtract that count by n to get the number of nodes the skipped node would be from the front
Then traverse through and skip that node

Pseudocode:
// Get the length of the list
1. Instantiate a count var at 0
2. Instantiate a dummy node at new ListNode
3. Instantiate a tail at dummy
4. Set tail.next to be head
5. While tail
    1. tail = tail.next
    2. count += 1

// Get the difference of the length of the list and n
6. Instantiate a diff var at count - n

// Traverse from head again and stop at the node before the skipped node
7. set tail = dummy
8. while diff > 0
    1. Set tail = tail.next
    2. diff -= 1
9. Set tail.next = tail.next.next
10. Return dummy.next

Time complexity: O(n) - Since I'm traversing through the list n + c(n), where n is the length of the list, and c is the node before the skipped node, which should always result in a second traversal less than n. Together, it simplifies to O(n)

Space complexity: O(1) - Since I'm only using pointers

*/

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    let count = 0;
    const dummy = new ListNode();
    let tail = dummy;
    tail.next = head;
    while (tail.next) {
        tail = tail.next;
        count += 1;
    }

    let diff = count - n;

    tail = dummy;

    while (diff > 0) {
        tail = tail.next;
        diff -= 1;
    }
    
    tail.next = tail.next.next;

    return dummy.next;
};

/********************** Attempt #3 - Calculate length of list and use the diff, try neetcode solution next time *****************************/

/*

First, count the nodes in the list


n = 2

 dummy()
              (1) -> (2) -> left(3) -> (4) -> (5) -> right(null)

listLength = 5

Then, subtract by n: 5 - 2 = 3 - 1 = 2 (land 1 node before the node to remove)

               c
(1) -> (2) -> (3) -> (4) -> (5)

Set c.next = c.next.next

If n = 1
length = 5 - 1 - 1 = 0
                      c
(1) -> (2) -> (3) -> (4) -> (5)

Pseudocode:
1. Instantiate a length var at 0
2. Instantiate a curr var at head
3. While curr
    1. Add 1 to length
    2. Set curr = curr.next
4. Set numFromEnd var to be length - n - 1
5. Set curr to be head again
6. While numFromEnd > 0
    1. Subtract 1 from numFromEnd
    2. Increment curr
7. Set curr.next = curr.next.next
8. Return head

*/

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    let length = 0;
    let curr = head;
    while (curr) {
        length += 1;
        curr = curr.next
    }

    let numFromEnd = length - n - 1;

    if (numFromEnd === -1) return head.next;

    curr = head;

    while (numFromEnd > 0) {
        numFromEnd -= 1;
        curr = curr.next;
    }

    curr.next = curr.next.next;

    return head;
};

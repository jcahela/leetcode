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

 l
[1, 2, 4]

 r
[2, 3, 5]

create a variable that'll hold the first head
compare the values at l and r,
whichever one is smaller
    - save its nxt pointer
    - then, set its next to to be r
    - then, set firstHead = left
    - then, set left to be the nxt pointer

Pseudocode:

1. Instantiate a variable called newHead at null;
2. Set a left pointer at list1
3. Set a right pointer at list2
4. While (left && right) {
    1. if newHead is null:
        1. compare left and right
        2. If left is smaller than or equal to right
            1. set newHead = left
            2. set left = left.next
        3. else
            1. set newHead = right
            2. set right = right.next
    2. else:
        1. compare left and right. If left is smaller than or equal to right:
            1. save its next value in variable nxt
            2. set its next to be right
            3. set newHead.next = left
            4. set left to be nxt pointer
        2. else:
            1. save its next value in variable nxt
            2. set its next to be left
            3. set newHead.next = right
            4. set right to be nxt pointer
5. if (left) newHead.next = left
6. if (right) newHead.next = right
7. return newHead

}

Time complexity: O(l1 + l2) - since we iterate over both once
Space complexity: O(1) - since we only use pointers

 */

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  let newHead = null;
  let left = list1;
  let right = list2;

  while (left && right) {
      if (!newHead) {
          if (left.val <= right.val) {
              newHead = left;
              left = left.next;
          } else {
              newHead = right;
              right = right.next;
          }
      } else {
          if (left.val <= right.val) {
              let nxt = left.next;
              left.next = right;
              newHead.next = left;
              left = nxt;
          } else {
              let nxt = right.next;
              right.next = left;
              newHead.next = right;
              right = nxt;
          }
      }
  }
  console.log(newHead);
  // if (left) newHead.next = left;
  // if (right) newHead.next = right;
  return newHead;
};

/************************ Attempt 2 - fail, need to get used to the shifting of pointers. I got the concept down, but wasn't sure how to execute in code *************************** */

/*

First I can create a dummy node so I have something that points to head to return

Then, I can create a tail node to point at the smaller of the two heads, either list1 or list2. I point dummy at the same node, whichever is smaller (will be the head)

If it points at list1, I want to check which node is less, the next node, or the head of the other list
    - if the next node is less, I move tail to the next node
    if (list1.next <= list2) {
        list1 = list1.next;
        tail = list1;
    }
    - if the head of the other list is less
        - I store the next node in a tmp var
        const tmp = list1.next;
        - I point the currentl list's next to the head of the other list
        list1.next = list2;
        - I set list1 to the tmp variable
        list1 = tmp;
    - Each loop I can check which one is 

Dummy() ->     (1)  (2) 
                \  /   \
                (1)    (3) -> list2(4) -> list1(4)

Dummy(), Tail() -> startNode(1) -> (2) -> (4) -> null

                   otherNode(1) -> (3) -> (4) -> null

*/

/******************* Attempt 3 - easy, fast, optimal, using dummy node ********************/

/*

I could have a dummy node that points at what will become the head of the linked list

Then use a tail node to traverse through the two merge lists, and point its next pointer to whichever of the two heads is smaller, then increment the tail node to keep attaching the next node to the end

Pseudocode:
1. Instantiate a dummy node that's empty
2. Instantiate a tail node thats = dummy node
3. While list1 and list2 (once one of them is empty, stop adding nodes to tail)
    1. if list1's val is less than or equal to list2's val
        1. Set tail.next to be list1
        2. Set list1 to be list1.next
    2. Else (list2 is less)
        1. Set tail.next to be list2
        2. Set list2 to be list2.next
    3. Set tail to be tail.next
4. If list1 is truthy, tack it onto the end of tail
5. If list2 is truthy, tack it onto the end of tail
6. Return dummy.next

Time complexity: O(l1 + l2) - At worst I could have to iterate through both list1 and list2 to add every node onto the end of tail, and list1 and list2 become falsy at the same time, causing a traversal of both at the same time

Space complexity: O(1) - Since I'm only using pointers and saving dummy nodes in a variable

*/

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    const dummy = new ListNode();
    let tail = dummy;

    while (list1 && list2) {
        if (list1.val <= list2.val) {
            tail.next = list1;
            list1 = list1.next;
        } else {
            tail.next = list2;
            list2 = list2.next;
        }
        tail = tail.next;
    }

    if (list1) tail.next = list1;
    if (list2) tail.next = list2;

    return dummy.next;
};

/**************** Attempt #4 easy done in 1 minute *******************/

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    const dummy = new ListNode();
    let tail = dummy;

    while (list1 && list2) {
        if (list1.val <= list2.val) {
            tail.next = list1;
            list1 = list1.next;
        } else {
            tail.next = list2;
            list2 = list2.next;
        }
        tail = tail.next
    }

    if (list1) tail.next = list1;
    if (list2) tail.next = list2;

    return dummy.next;
};

/****************** Attempt #5 - easy, forgot to increment list1 and list2 in the while loop, but remembered after *****************/

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    const dummy = new ListNode();
    let tail = dummy;

    while (list1 && list2) {
        if (list1.val < list2.val) {
            tail.next = list1;
            list1 = list1.next;
        } else {
            tail.next = list2;
            list2 = list2.next;
        }
        tail = tail.next;
    }

    if (list1) tail.next = list1;
    if (list2) tail.next = list2;

    return dummy.next;
};

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

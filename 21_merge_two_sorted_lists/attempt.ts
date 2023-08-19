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

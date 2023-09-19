/* Don't know how to detect a cycle */

/***************** Attempt #2 - Floyd's algorithm - easy *****************/

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

I can use Floyd's algorithm to determine if there's a cycle
    - Start slow and fast pointers at the first node
    - While fast && fast.next (ensures that I stop if fast is null, or if fast.next is null, so that I can always do fast.next.next within the loop)
        - increment slow by 1,
        - increment fast by 2
    If slow node ever equals fast node, return true
At the end, return false (since we escaped the above loop, fast became null at some point, and never equaled slow)

Pseudocode:
1. Instantiate a slow var at head
2. Instantiate a fast var at head
3. While fast && fast.next
    1. Set slow = slow.next;
    2. Set fast = fast.next.next;
    3. if slow === fast
        1. Return true
4. Return false

Time complexity: O(n) - Since if there isn't a cycle, I only traverse the list through once, and if there is a cycle, it simplifies down to a coefficient of n as its time complexity

Space complexity: O(1) - Since I'm only using pointers
 */

function hasCycle(head: ListNode | null): boolean {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
      if (slow === fast) return true;
  }
  
  return false;
};
/****************** Attempt #3 - practice writing out floyd's algorithm, easy *******************/

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

function hasCycle(head: ListNode | null): boolean {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true;
    }

    return false;
};

/********************* Attempt #4 - easy - floyd's algo ***********************/

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

        fs 
[3,2,0,-4]

Floyd's algorithm - tortoise and the hare
 */

function hasCycle(head: ListNode | null): boolean {
    let s = head;
    let f = head;

    while (f && f.next) {
        s = s.next;
        f = f.next.next;
        if (s === f) return true;
    }

    return false;
};

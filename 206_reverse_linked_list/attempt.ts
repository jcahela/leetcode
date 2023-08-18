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

Ideas:

To reverse a singly linked list, I will need to start at the head, and do multiple things before moving onto the next node:
    1. Store currentNode.next in a temp original next variable
    2. Set currentNode.next to be a temp new next variable (that starts at null)
    3. Store currentNode in the temp new next variable
    4. Set currentNode I'm iterating on to be temp original next variable

Pseudocode:

1. Set currentNode variable to = head
2. Instantiate a tempNext variable to = null
3. Instantiate an originalNext variable to = currentNode.next
4. While (currentNode.next) // currentNode.next makes it so that it stops on the last node, so currentNode remains the last node, which is the new head
    1. Set currentNode.next = tempNext
    2. Set tempNext = currentNode
    3. set currentNode = originalNext
5 Return currentNode

Time complexity: O(n) - Since we only need to iterate over the linked list once
Space complexity: O(1) - Since we only use pointers


 */
// originalNext = 5
// currentNode: 5
// tempNext = 4;
// [1,2,3,4,5]

// 4 -> 3 -> 2 -> 1 -> null


// Iterative:

function reverseList(head) {
    if (!head) return null;
    let currentNode = head;
    let tempNext = null;


    while (currentNode.next) {
    let originalNext = currentNode.next; // store the next node
        currentNode.next = tempNext; // set the next node to be the previous node stored in tempNext (or null)
        tempNext = currentNode; // set the tempNext variable to be the current node
        currentNode = originalNext; // set the current node to be the original next node
    }
    console.log(currentNode, tempNext);
    currentNode.next = tempNext;
    return currentNode;
};

/**************************** Attempt 2 - easy ******************************/
/*

To reverse a linked list, I need to traverse from the head, and at each node, set the next pointer to the previous node, then jump to the original next node

So I'd need to store the original next node in a temp variable, set the current node's next pointer to the previous node, then set the current node to be the node stored in the temp variable


Pseudocode:
1. Instantiate a curr var at head
2. Instantiate a prev var at null
3. while (curr)
    1. Instantiate a tmp var that holds curr.next
    2. Set curr.next to be prev
    3. Set prev to be curr
    4. Set curr to be tmp
4. Return prev (it'll be the new head, since I will have set prev to be curr before setting curr to be tmp, which at the tail will set curr to be null, and prev to be the last node in the list)

Time complexity: O(n) - Where n is the number of nodes in the list, since I'm traversing through it once
Space complexity: O(1) - Since I'm only using pointers

*/


function reverseList(head: ListNode | null): ListNode | null {
    let curr = head;
    let prev = null;

    while (curr) {
        const tmp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = tmp;
    }

    return prev;
}

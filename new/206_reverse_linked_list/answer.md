Time to Complete: 15m

Method:
  Iterative: Using pointers, you'll do the following: set the current node to point at the previous node you visited, then jump to the next node in the original node list. Once you reach the tail of the original node list, the previous pointer will be pointing at the last node you visited, which would now be the head. Then, you'll return that node.

  Recursive: When thinking of recursive problems, think about breaking it down to a sub problem. For reversing a linked list, first reverse the rest of the list not including the current node, this means you go down 1 recursive call to the second node (rest of the list), and repeat this until you get to the last node. Once on the last node, you pop out of the recursive stack, and set the next node's next pointer to be yourself (the current node you're at, which is the second-to-last node). Then, pop up to the 3rd-to-last node, and set its next node (the second-to-last node) to set its next pointer to yourself. Then keep going, popping out of the stack -> setting the next node's next pointer to point at the current node, until you reach the top of the call stack. All the while, we maintain the last node we saw so that at the end of popping out of the recursive stack, we can return it as the new head. The base case will be if the current node is null (meaning we've reached the tail, and can start popping back up)

Pseudocode:
  Iterative:

  /*
  1. Instantiate a prev pointer at null
  2. Instantiate a curr pointer at the head
  3. While the curr pointer is truthy:
    1. Store the next node in a temp variable nxt
    2. Set the current node's next to point at prev
    3. Set prev to be the current node
    4. Set the current node to be the next node temp variable
  4. Return the prev node (once at the end this node will be the new head)
  */

  Recursive:

  /*
  1. If the head is null, return null
  2. Instantiate a variable newHead set to head
  3. If head.next exists:
    1. Recursively call the function (reverseList(head.next))
    2. Set the result of it to newHead
    3. Set head.next.next = head (this is reversing the link, setting the next node to point its next pointer to yourself)
  4. head.next = null (if you've reached here, you've popped out of all recursive stacks in step 3, and can now set the current head to point its next pointer to null)
  5. return newHead (this will now be the head of the reversed linked list)
  */


Code:

  Iterative:
  ```js
  function reverseList(head) {
    let curr = head;
    let prev = null;

    while (curr) {
        let nxt = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nxt;
    }

    return prev;
  };
  ```

  Recursive:
  ```js
  function reverseList(head) {
    if (head === null) return null;
    let newHead = head;

    if (head.next) {
      newHead = reverseList(head.next);
      head.next.next = head;
    }
    
    head.next = null;
    return newHead;
  }
  ```


Time Complexity:
  Iterative: O(n)
  Recursive: O(n)
Explanation:
  Iterative: Since we iterate through the list once to switch the pointers, the overall time complexity will be O(n) on the iterative solution
  Recursive: Since we perform O(1) operations each recursive call, and it needs to go n stacks deep, the overall time complexity will be O(n)

Space Complexity:
  Iterative: O(1)
  Recursive: O(n)
Explanation:
  Iterative: Since we only use pointers, the space complexity will be O(1) on iterative
  Recursive: Since we add a stack to memory each recursive call, and it needs to go n stacks deep, the overall space complexity will be O(n)

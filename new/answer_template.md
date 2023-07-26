Time to Complete:

Method:
  Iterative: Using pointers, you'll do the following: set the current node to point at the previous node you visited, then jump to the next node in the original node list. Once you reach the tail of the original node list, the previous pointer will be pointing at the last node you visited, which would now be the head. Then, you'll return that node.

  Recursive:

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
  
  */


Code:

```js
function name(parameters) {

}
```


Time Complexity:
  Iterative: O(n)
  Recursive: O(n)
Explanation:
  Iterative: Since we iterate through the list once to switch the pointers, the overall time complexity will be O(n) on the iterative solution
  Recursive: Since we perform O(1) operations each recursive call, and it needs to go n stacks deep, the overall time complexity will be O(n)

Space:
  Iterative: O(1)
  Recursive: O(n)
Explanation:
  Iterative: Since we only use pointers, the space complexity will be O(1) on iterative
  Recursive: Since we add a stack to memory each recursive call, and it needs to go n stacks deep, the overall space complexity will be O(n)

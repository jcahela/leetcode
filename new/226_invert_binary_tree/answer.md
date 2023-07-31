Time to Complete: 15m

Method: To do this, you use recursive depth first search to traverse all nodes in the tree. On popping out of the call stack at each recursive call, you reverse the pointers left and right to point at each other, using a temp variable (similar to reversing a linked list). Then, return the root node at the end.

Pseudocode:
/*
1. Set the base case, if root is null, return root
2. Call invertTree on the left child node
3. Call invertTree on the right child node
4. After popping out of the call stack (after both of the above calls), swap the left and right child nodes:
  1. Save root.left in a tmp variable
  2. Set root.left = root.right
  3. Set root.right = tmp
5. Return root
*/

Code:

```js
var invertTree = function(root) {
  if (root === null) {
      return root;
  }

  invertTree(root.left); // returns null
  invertTree(root.right); // returns null

  const tmp = root.left;
  root.left = root.right;
  root.right = tmp;

  return root;
};
```

Time Complexity: O(n)
Explanation: Where n is the number of nodes in the tree, since I'd travese through each one changing their left and right

Space: O(h)
Explanation: Where h is the height of the tree, since the deepest recursive call would go down the a leaf node then pop out, removing 1 from the call stack, before going to the next leaf node, adding 1 back to the call stack. Overall, the call stack will at worse be h recursive call stacks tall.

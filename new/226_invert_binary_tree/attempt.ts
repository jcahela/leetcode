/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }


Idea: recursive depth first search, swapping left and right pointers as I pop back up the stack

How to code it?

base case: if root === null, return root

after calling the function:
    1. save this.left in a tmp variable: tmp = this.left
    2. set this.left = this.right
    3. set this.right = tmp

return root at the end

Pseudocode:
1. Set the base case, if root is null, return root
2. Call invertTree on the left child node
3. Call invertTree on the right child node
4. After popping out of the call stack (after both of the above calls), swap the left and right child nodes:
  1. Save root.left in a tmp variable
  2. Set root.left = root.right
  3. Set root.right = tmp
5. Return root

Time complexity: O(n) - where n is the number of nodes in the tree, since I'd travese through each one changing their left and right

Space complexity: O(h) - where h is the height of the tree, since the deepest recursive call would go down the a leaf node then pop out, removing 1 from the call stack, before going to the next leaf node, adding 1 back to the call stack. Overall, the call stack will at worse be h recursive call stacks tall.

 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
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

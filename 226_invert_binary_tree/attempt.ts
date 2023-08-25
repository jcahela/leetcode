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

/************* Attempt #2 unsuccessful **************/

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }


I could use a dfs that switches the left and right subtrees while propogating up the recursive call stack

                     me(4)
                   /     \ 
                 (7)     (2)
                / \      /  \
              (9) (6)   (3) (1)


Pseudocode:


Time complexity: O() - 
Space complexity: O() - 

 */

function invertTree(root: TreeNode | null): TreeNode | null {
  if (root === null) return root;

  invertTree(root.left);
  invertTree(root.right);

  const tmp = root.right;
  root.right = root.left;
  root.left = tmp;

  return root;
};


/*************** Attempt #3 success, using tmp var, easy *****************/

/*

Recursive DFS, post-order, as you're popping out of the recursive call stack
    1. save left tree in a tmp var
    2. set left tree to equal right tree
    3. set right tree to equal tmp

Pseudocode:
// Base Case
1. If root === null return root
// Recursive case
2. Recurse left: invertTree(root.left)
3. Recurse right: invertTree(root.right)
4. Instantiate a tmp var at root.left
5. Set root.left = root.right
6. Set root.right = tmp
7. Return root

Time complexity: O(n)
Space complexity: O(h)

*/

function invertTree(root: TreeNode | null): TreeNode | null {
  if (root === null) return root;

  invertTree(root.left);
  invertTree(root.right);

  const tmp = root.left;
  root.left = root.right;
  root.right = tmp;

  return root;
};

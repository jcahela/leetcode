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

At each node, I will have to ask:
    1. Is the current node's left child smaller than the current node's value?
    2. Is the current node's right child greater than the current node's value?
    

 */

    function isValidBST(root: TreeNode | null): boolean {
      if (root === null) return true;
  
      let isNodeValid = true;
      if ((root.left && root.left.val >= root.val) ||
          (root.right && root.right.val <= root.val)) {
          isNodeValid = false;
          }
      const leftIsValid = isValidBST(root.left);
      const rightIsValid = isValidBST(root.right);
  
      return isNodeValid && leftIsValid && rightIsValid;
  };

/****************** Attempt #2 - easier use of min max values ******************/

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

I need to keep track of mins and maxs as I traverse down the tree

Since the left subtree must all have values less than the current node, the current node's val becomes the left subtree's max, and that keeps changing as you recurse left and right down the subtrees

min can start as -Infinity
max can start as Infinity

if the current node is not between min and max, set isValid external variable to false

set base case to check isValid is false, if it is, return up the stack

when you recurse left, replace the max with the current node's val
when you recurse right, replace the min with the current node's val

Pseudocode:
1. Instantiate isValid var at true
2. Define function dfs that takes in node, min, and max
    // Base case
    1. if node is null or isValid is false, return
    // Recursive case
    2. if node's val is less than min or greater than max, set isValid to false
    3. recurse left, replace max with current node's val
    4. recurse right, replace min with current node's val
3. Call dfs on root, with min being -Infinity, and max being Infinity
4. Return isValid

Time complexity: O(n) - DFS time complexity
Space complexity: O(h) - DFS space

 */

function isValidBST(root: TreeNode | null): boolean {
    let isValid = true;
    function dfs(node: TreeNode | null, min: number, max: number) {
        if (node === null || !isValid) return;

        if (node.val <= min || node.val >= max) isValid = false;

        dfs(node.left, min, node.val);
        dfs(node.right, node.val, max);
    }
    dfs(root, -Infinity, Infinity);
    return isValid;
};

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

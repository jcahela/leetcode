/****************** Attempt #2 not sure on approach ********************/

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

 /*
1. Instantiate a max variable that'll hold the max diameter
2. Define a dfs recursive function that takes in a node parameter
    1. Base case: if the root is null, return the height, which at a null node is -1 (at a leaf node, the height is 0, so to add up its null children to get 0 with its parent nodes as you pop out of the recursive stack, you need to consider null nodes as -1)
    2. store a recursive call of the left child in a variable called left
    3. store a recursive call of the right child in a variable called right
    // calculate the diameter of the current node
    4. Diameter is left height + right height + 2 (including the current node in the calculation would increase the diameter's length by 2)
    5. Replace the max variable with the diamater if the diameter is larger
    6. Return the height of the current node (1 + the max between the height of the current node's left and right subtrees)
3. Call the dfs recursive function
4. Return the max variable
 */

function diameterOfBinaryTree(root: TreeNode | null): number {
  let max = 0;

  function dfs(node) {
      if (node === null) return -1;

      const left = dfs(node.left);
      const right = dfs(node.right);
      
      max = Math.max(max, left + right + 2);

      return Math.max(left, right) + 1;
  }

  dfs(root);

  return max;
};

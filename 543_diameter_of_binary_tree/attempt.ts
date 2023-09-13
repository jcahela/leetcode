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

/******************** Diameter of binary tree using maxDepth of left and right subtrees and calculating current depth with external max var ************************/

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

If I traverse the binary tree and calculate the diamater of the current subtree, I can set an external variable to it if it's greater than the current external variable value

To calculate the diamater of the current subtree, I will need the height of the maxHeight of the left and the maxHeight of the right and add 2

 */

function diameterOfBinaryTree(root: TreeNode | null): number {
  let max = 0;

  function dfs(node) {
      if (node === null) return -1;

      const leftDepth = dfs(node.left);
      const rightDepth = dfs(node.right);

      const currentDepth = leftDepth + rightDepth + 2;

      max = Math.max(max, currentDepth);

      return Math.max(leftDepth, rightDepth) + 1;
  }

  dfs(root);

  return max;
};

/******************* Attempt #4 - easy, good ******************/

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

I could do recursive DFS, then have an outside variable

Each recursive step back up, I can check if the current diameter is larger than the outside variable, if so replace that outside variable

I should end up with the largest width stored in the outside variable, even if it's in some arbitrarily deep left subtree, for example

Pseudocode:
1. Instantiate a var largestDiameter at 0
2. Define a function dfs that takes in a node
    1. If the node is null, return 0
    2. Instantiate a leftHeight var at dfs(node.left)
    3. Instantiate a rightHeight var at dfs(node.right)
    4. Set largestDiameter to the max between largestDiamater and leftHeight + rightHeight
    5. Return up the max between leftHeight and rightHeight + 1
3. Call dfs on root
4. Return largestDiameter

Time complexity: O(n)
Space complexity: O(h)

 */

function diameterOfBinaryTree(root: TreeNode | null): number {
  let largestDiameter = 0;
  function dfs(node) {
      if (node === null) return 0;

      const leftHeight = dfs(node.left);
      const rightHeight = dfs(node.right);

      largestDiameter = Math.max(largestDiameter, leftHeight + rightHeight);

      return Math.max(leftHeight, rightHeight) + 1;
  }
  dfs(root);
  return largestDiameter
};

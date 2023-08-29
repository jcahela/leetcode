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

Definition: A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.

This would mean I would have to visit every node, and check if the height at each child is more than 1 off

So I would need to find the height of the binary tree at a specific node using recursive DFS

Pseudocode:

1. Instantiate an output boolean variable at true
2. Create a dfs function that will recursively travese the binary tree
    1. Base case: if root is null, return 0
    2. instantiate a variable called leftHeight that is 1 + dfs(node.left)
    3. instantiate a variable called rightHeight that is 1 + dfs(node.right), as I recurse down, I will get the height of the right subtree, and add 1 to it on the current node once I propogate back up, to get the height of the right subtree 
                       1  +  1  +  0
    (current node) -> () -> () -> null
    4. If Math.abs(leftHeight - rightHeight) > 1 (if they differ by more than 1) set the boolean variable to false
3. Call the dfs function with root as a parameter
4. Return the boolean variable

Time complexity: O(n) - Since we only need to traverse through the tree once to find if at any point it's not height-balanced

Space complexity: O(h) - Since I'm using recursive DFS and the max number of stacks needed will be h, or the max height of the tree

 */

// function isBalanced(root: TreeNode | null): boolean {
//     let balanced = true;

//     function dfs(node) {
//         if (node === null) {
//             return 0;
//         }

//         const leftHeight = 1 + dfs(node.left);
//         const rightHeight = 1 + dfs(node.right);

//         if (Math.abs(leftHeight - rightHeight) > 1) {
//             balanced = false;
//         }

//         return Math.max(leftHeight, rightHeight);
//     }

//     dfs(root);

//     return balanced;
// };

function isBalanced(root: TreeNode | null): boolean {
  let balanced = true;

  function dfs(node) {
      if (node === null) {
          return 0;
      }

      const leftHeight = 1 + dfs(node.left);
      const rightHeight = 1 + dfs(node.right);

      if (Math.abs(leftHeight - rightHeight) > 1) {
          balanced = false;
      }

      return Math.max(leftHeight, rightHeight);
  }

  dfs(root);

  return balanced;
};

/******************* Attempt #2 - easy, good, dfs method **********************/

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

A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.

So, this means for each subtree of each node, I need to find the subtree's depth, and make sure they don't differ by more than 1

I could use recursive DFS to traverse every node

Then, as I reach the base case, return 0

For the recursive case, the depth of the current node is the max between left and right's depths

However, before I return that, I need to check if left's depth is over 1 different than right
    const isUnbalanced = Math.abs(leftDepth - rightDepth) > 1
    set an outside var to isUnbalanced

Then, I return the depth of the current tree (Math.max(leftdepth, rightDepth)) + 1

Pseudocode:
1. Instantiate a isUnbalanced boolean var at false
2. Define a dfs function that takes in a node parameter
    // Base case
    1. If root is null, return 0
    2. Instantiate a leftDepth at dfs(node.left)
    3. Instantiate a rightDepth at dfs(node.right)
    4. if (Math.abs(leftDepth - rightDepth) > 1) isUnbalanced = true
    5. Return Math.max(leftDepth, rightDepth) + 1;
3. Call dfs on root
4. Return isUnabalanced 

Time complexity: O(n) - dfs traversal time complexity
Space complexity: O(h) - dfs traversal space complexity

 */

function isBalanced(root: TreeNode | null): boolean {
    let balanced = true;
    function dfs(node) {
        if (node === null) return 0;

        const leftDepth = dfs(node.left);
        const rightDepth = dfs(node.right);

        if (Math.abs(leftDepth - rightDepth) > 1) balanced = false;

        return Math.max(leftDepth, rightDepth) + 1;
    }

    dfs(root);
    return balanced;
};

/********************* Attempt #3 - easy dfs w/short-circuit on base case **********************/

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
 */

function isBalanced(root: TreeNode | null): boolean {
    let balanced = true;

    function dfs(node) {
        if (node === null || !balanced) return 0;

        const leftDepth = dfs(node.left);
        const rightDepth = dfs(node.right);

        if (Math.abs(leftDepth - rightDepth) > 1) balanced = false;

        return Math.max(leftDepth, rightDepth) + 1;
    }

    dfs(root);

    return balanced;
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }

Pseudocode:

1. Instantiate a maxDepth variable at 0
2. Create a dfs function with root and depthCounter parameters
    1. Set the base case to be if node === null, return
    2. Each time you recurse through the dfs function, set the maxDepth to be the larger between maxDepth and the recursive depth input
    3. Call dfs on the left child
    4. Call dfs on the right child
3. Call the dfs recursive function, use root and maxDepth as the initial arguments
4. Finally, return maxDepth

Time complexity: O(n) - where n is the number of nodes in the tree, since we're running depth first traversal through the tree
Space complexity: O(h) - where h is the max height of the tree, since we're using recursive stacks that continue to stack as you go down to the next tree node, but pop out as you go to a lateral tree node

 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

// Recursive DFS
// var maxDepth = function(root) {
//     if (root === null) return 0;

//     return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
// };


// Iterative DFS
/*
1. Instantiate a stack array with the root node in an array, with its level as a tuple: [[root, 1]]
2. Instantiate a levels variable that starts at 0
3. While the stack has a length
    1. Pop the most recent node-level array out of the stack
    2. Set the levels variable to the level retrieved from the tuple
    3. if the node from the stack has a right child, add that and the level + 1 as a tuple: [root.right, levels + 1]
    4. if the node from the stack has a left child, add that and the level + 1 asa tuple: [root.left, levels + 1]
4. Return the levels variable
*/
// var maxDepth = function(root) {
//     if (!root) return 0;
//     let levels = 0;
//     const stack = [[root, 1]];

//     while (stack.length) {
//         const [node, level] = stack.pop();
//         levels = Math.max(levels, level);
//         if (node.right) stack.push([node.right, level + 1]);
//         if (node.left) stack.push([node.left, level + 1]);
//     }
//     return levels;
// }

// Iterative BFS
/*

1. Instantiate a levels variable that starts at 0
2. If no root, return levels
3. Create a queue array with the root and its level (1) as a tuple inside the queue
4. While the queue is non-empty
    1. Shift the first element from the stack
    2. If the level at index 1 of the shifted tuple is greater than the levels variable, set levels to it
    3. If the node at index 0 of the shifted tuple has a right child, push it onto the queue with level + 1 as its level
    4. If the node at index 0 of the shifted tuple has a left child, push it onto the queue with level + 1 as its level
5. Return levels

*/
// var maxDepth = function(root) {
//     let levels = 0;
//     if (!root) return levels;
//     const queue = [[root, 1]];

//     while (queue.length) {
//         const [node, level] = queue.shift();
//         levels = Math.max(levels, level);
//         if (node.right) queue.push([node.right, level + 1]);
//         if (node.left) queue.push([node.left, level + 1]);
//     }

//     return levels;
// }

/************************* Attempt #2 good, fast, recursive, iterative DFS, iterative BFS ******************************/

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

       (3)
       / \
     (9) (20)
         /  \
       (15) (7)

I could use recursive DFS and when I get to null, return 0.
In the recursive step, I could add 1 to the recursive call of the left and right
Then, in the recursive return, I could return the max between the left and right subtree depth

That way, I always add the max of each subtree to the parent node, then that parent node returns the max of that + 1

Pseudocode:
1. If root is null, return 0
2. return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));

Time complexity: O(n) - Where n is the number of nodes in the tree
Space complexity: O(h) - For recursive DFS

[[(3), 1]]

 */

// Recursive DFS
function maxDepth(root: TreeNode | null): number {
    if (root === null) return 0;
  
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
  };

// Iterative DFS
function maxDepth(root: TreeNode | null): number {
    if (!root) return 0;
    let maxLevel = 1;
    const stack: [TreeNode, number][] = [[root, 1]];
  
    while (stack.length) {
      const [node, level] = stack.pop();
      maxLevel = Math.max(level, maxLevel);
      if (node.left) stack.push([node.left, level + 1]);
      if (node.right) stack.push([node.right, level + 1]);
    }
  
    return maxLevel;
  };

// Iterative BFS
function maxDepth(root: TreeNode | null): number {
if (!root) return 0;
let maxLevel = 1;
const queue: [TreeNode, number][] = [[root, 1]];

while (queue.length) {
    const [node, level] = queue.shift();
    maxLevel = Math.max(level, maxLevel);
    if (node.left) queue.push([node.left, level + 1]);
    if (node.right) queue.push([node.right, level + 1]);
}

return maxLevel;
};

/************ Attempt #3 **************/

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

I could use DFS traversal

Once traversing out of the null nodes, I can return 0

Then, each recursive case I would instantiate a leftDepth at maxDepth(root.left)

and a rightDepth as maxDepth(root.right)

Then, for the return, that's when I add 1 to the larger between left and right. By doing this, I ensure that each step from null back up the tree will add 1 to whichever subtree was larger, left or right, resulting in the max depth being passed up

Pseudocode:
// Base case
1. If root is null, return 0

// Recursive case
2. Instantiate a leftDepth at maxDepth(root.left)
3. Instantiate a rightDepth at maxDepth(root.right);
4. Return Math.max(leftDepth, rightDepth) + 1;

Time complexity: O(n) - where n is the number of nodes in the tree

Space complexity: O(h) - since that's how much space I need to run dfs traversal while using O(1) space each recursive step
 */

function maxDepth(root: TreeNode | null): number {
  if (root === null) return 0;

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return Math.max(leftDepth, rightDepth) + 1;
};

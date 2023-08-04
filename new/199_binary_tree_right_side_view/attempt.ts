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

I could run breadth first search  on the tree, and at the end of every level, return the last number

Pseudocode:
1. Instantiate an output array that'll hold the right nums of each level
2. Instantiate a queue that'll hold the root node and its level as a tuple
3. while the queue has a length
    1. shift the front node off the queue
    2. if the node is truthy
        1. if the queue is currently empty or the front node in the queue has a level greater than the current level
            1. add the current node's val to the output array (that's the last node in the current level)
        2. if the node has a left child, push it and its level (current level + 1) to the queue as a tuple
        3. if the node has a right child, push it and its level (current level + 1) to the queue as a tuple
4. return the output array

Time complexity: O(n) - Since I'm traversing the whole tree to find the rightmost node of each level
Space complexity: O(n) - Since I'm storing n/2 nodes in the queue at the worst time, which simplifies to O(n)

 */

function rightSideView(root: TreeNode | null): number[] {
  const output = [];
  const queue: [TreeNode, number][] = [[root, 1]];
  while (queue.length) {
      const [node, level] = queue.shift();

      if (node) {
          if (!queue.length || queue[0][1] > level) {
              output.push(node.val)
          }

          if (node.left) queue.push([node.left, level + 1]);
          if (node.right) queue.push([node.right, level + 1]);
      }
  }

  return output;
};

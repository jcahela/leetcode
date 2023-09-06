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

/******************** Attempt #2 - easy, BFS with queue *************************/

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

function rightSideView(root: TreeNode | null): number[] {
    if (!root) return [];
    const output = [];
    const queue: [TreeNode, number][] = [[root, 1]];

    while (queue.length) {
        const [node, level] = queue.shift();
        if (!queue.length || queue[0][1] === level + 1) output.push(node.val);
        if (node.left) queue.push([node.left, level + 1]);
        if (node.right) queue.push([node.right, level + 1]);
    }

    return output;
};

/*********************** Attempt #3 - easy, bfs using queue data structure *******************************/

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

Idea: use breadth first search, grab the last node of each level, and push their values into the output array

When are you on the last node of a level?
    - If I store the levels of the nodes I put into the queue, I could check if the next node's level is 1 more than the current node i'm looking at. If that's true, then the current node I'm looking at is the last node of its level, since I'm using FIFO structure (queue)

Pseudocode:
1. Instantiate a queue array that'll hold a tuple of treenode and number noting its level: [TreeNode, number][], and put the root node in it with the number 1 as its second value
2. Instantiate an output array that'll hold numbers (values of the right-side nodes)
3. While the queue has a length
    1. Shift the first node from the front of the queue and store in a curr var
    2. If the queue has no length OR the first node in the queue has a level greater than the current node's level
        1. Add the current node's value to the output array
    3. If the current node has a left child, add it to the queue with its level being the current level + 1
    4. If the current node has a right child, add it to the queue with its level being the current level + 1
4. Return output array

Time: O(n) - Since I'm traversing the list BFS style
Space: O(n) - Since the binary tree could be unbalanced and n-1 nodes could be children of root

 */

function rightSideView(root: TreeNode | null): number[] {
    if (!root) return [];
    const queue: [TreeNode, number][] = [[root, 1]];
    const output = [];

    while (queue.length) {
        const [curr, level] = queue.shift();
        console.log(curr);
        if (!queue.length || queue[0][1] > level) output.push(curr.val);
        if (curr.left) queue.push([curr.left, level + 1]);
        if (curr.right) queue.push([curr.right, level + 1]);
    }

    return output;
};

/*

[[(5), 3], [(4) , 3]]

           1
         /   \
        2     3
         \      \
           5     4

*/

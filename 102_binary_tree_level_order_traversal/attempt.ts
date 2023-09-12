/** SUCCESS
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

This looks like iterative breadth first traversal

I can use a queue, and an output array

[[3,1],[9,2], [20,2]]

Every time I pop out of the stack, I check if the first item in the stack has a level higher than the node I popped out, or if the queue is empty (that means no other nodes exist that are the same level as the current node. If the traversal were to continue, I would be pushing the current node's children, which by definition wouldn't be the same level). If true, then push the temp array into the output array, then reset the temp array. If false, then I stick my node into the temp array variable then move on

Pseudocode:

1. Instantiate an output array empty
2. Instantiate a level array empty
3. Instantiate a queue with the root node and its level as a tuple
4. While queue has a length
    1. Shift the first node from the queue
    2. Add the node's value to the temp array
    3. If the queue is currently empty, or if the first item in the stack has a higher level than the current node:
        1. push temp array into output array
        2. Set temp array to be empty
    4. Add the node's left and right children to the queue, if they exist
5. return the output array

Time complexity: O(n) - Where n is the number of nodes in the tree, since we traverse through it once
Space complexity: O(n) - Since we store each node value into an output array, and queue

 */
class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
  }
}

class ListTreeNode {
  val: number
  next: ListTreeNode | null
  prev: ListTreeNode | null
  level: number
  constructor(val?: number, level?: number, next?: ListTreeNode | null, prev?: ListTreeNode | null) {
    this.val = (val === undefined ?  0 : val);
    this.level = (level === undefined ? 0 : level);
    this.next = (next === undefined ? null : next);
    this.prev = (prev === undefined ? null : prev);
  }
}

function levelOrder(root: TreeNode | null): number[][] {
  let output = [];
  let temp = [];
  // let queue: [TreeNode | null, number][] = [[root, 1]];
  let head = new ListTreeNode();
  let tail = new ListTreeNode();
  head.next = tail;
  tail.prev = head;

  

  while (queue.length) {
      const [node, level] = queue.shift();
      if (node) {
          temp.push(node.val);
          if (!queue.length || queue[0][1] > level) {
              output.push(temp);
              temp = [];
          }
          if (node.left) queue.push([node.left, level + 1]);
          if (node.right) queue.push([node.right, level + 1]);
      }
  }
  return output;
};

/********************** Attempt #2 easy using queue BFS *********************/

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

I will need to do BFS, and have a bucket for each level, then once I reach a deeper level, push the existing bucket from the previous level to the output array, and clear the level bucket

If I use a queue data structure on this tree

            (3)
           /   \
         (9)   (20)
        /   \   /  \
     (10) (14)(15) (7)

[ [(3), 1], [(9), 2],[(20), 2], [(10), 3], [(14), 3], [(20), 3], [(7), 3] ]

At the end of checking a node, if the next node's level is 1 more than the current node's level, then I'm at the end of the current level, so I can push the level bucket to the output array

Pseudocode:
1. Instantiate an output array at []
2. Instantiate a level array at []
3. Instantiate a queue array at [root, 1], give it type [TreeNode, number][]
4. While queue.length
    1. Shift the first node-level tuple from the front of the array and store in val and level vars
    2. push the current node's val into the level array
    3. if the first node in queue's level is 1 more than the current level
        1. Push level array onto output array
        2. Set level array to be []
    4. Add the current node's left child if exists onto the queue with its level + 1 of the current level
    5. Add the current node's right child if exists onto the queue with its level + 1 of the current level
5. Return output array

Time complexity: O(n) - BFS
Space complexity: O(n) - BFS queue

 */

function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const output = [];
  let levelBucket = [];
  const queue: [TreeNode, number][] = [[root, 1]];

  while (queue.length) {
      const [node, level] = queue.shift();
      levelBucket.push(node.val);
      if (!queue.length || queue[0][1] === level + 1) {
          output.push(levelBucket);
          levelBucket = [];
      }
      if (node.left) queue.push([node.left, level + 1]);
      if (node.right) queue.push([node.right, level + 1]);
  }

  return output;
};

/******************** Attempt #3 ***********************/

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

For level order traversal, I can use a queue data structure, then when I get to the end of the current level, push the subarray to the output, and clear out the subarray for the next level

How to know when I'm at the end of the current level? In a queue data structure, it'll be when the current node is a level 1 lower than the first node in the queue (the current node is the last in its level)

Pseudocode:
0. Check if root is null, if so return []
1. Instantiate a queue array that takes in a tuple: [Node, number][]. Set it to have root and 1 as its node/level in indices 0 and 1
2. Instantiate an output array that starts at empty
2. Instantiate a currentLevel array that starts at empty
3. While the queue is non-empty
    1. Shift the first tuple from the array and destructure the values as current node and level
    2. Push the node value onto the currentLevel array
    3. Check if either: the queue is empty or the first node in the queue has a level 1 more than the current level (that means you've reached the end of the current level)
        1. If so, push the currentLevel array onto the output array
        2. Then, set currentLevel array to []
    4. Finally, if the current node has a left child, push it to the queue with its level being level + 1
    5. Also, if the current node has a right child, push it to the queue with its level being level + 1
4. Return the output array

Time complexity: O(n)
Space complexity: O(w)

 */

function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const queue: [TreeNode, number][] = [[root, 1]];
  const output = [];
  let currentLevel = [];

  while (queue.length) {
      const [node, level] = queue.shift();
      currentLevel.push(node.val);
      if (!queue.length || queue[0][1] === level + 1) {
          output.push(currentLevel);
          currentLevel = [];
      }
      if (node.left) queue.push([node.left, level + 1]);
      if (node.right) queue.push([node.right, level + 1]);
  }

  return output;
};

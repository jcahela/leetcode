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

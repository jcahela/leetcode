/** SUCCESS FIRST TRY
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

In order for a node X to be good, the path from root to X must have no nodes with a value greater than X

Seems like a problem that's solvable via recursion

Smaller question to ask: if the tree were 2 nodes, I would ask at the root, is the current node's child smaller than the current node? If so, the child is not good

if I start at root, I can ask, is the child smaller than the current node? If it is, isGood will be passed into the recursive function as false

I can recursively call the function on the left child, then pass in a boolean isGood = false, and another number parameter representing the largest ancestor. Then based on the isGood ancestor, I can add the current 

Maybe don't need isGood boolean, I could use just the largest ancestor to keep track of the limit 

Base case: is the current node null? return up
Recursive case:
    Is the current node greater than or equal to the largest ancestor? Add 1 to count
    call recursive function on left child, pass in currentNode.left, then pass in Math.max(greatestAncestor, currentNode.val)
    call recursive function on right child, pass in currentNode.right, then pass in Math.max(greatestAncestor, currentNode.val)

if I'm on the root, I won't have a largest ancestor. I could start at null maybe? If the largestAncestor is null, set largestAncestor to be currentNode.val - 1. Then I can run the Math.math(largestAncestor, currentNode.val) and it won't break

Pseudocode:

1. Instantiate a count output var at 0
2. Define recursive function findGoods(node: TreeNode | null, largestAncestor: number | null): null
    1. Base case: if root is null, return up
    2. If largestAncestor is null
        1. Set largestAncestor to node.val - 1
    3. If node.val >= largestAncestor
        1. Add 1 to count output
    4. Call recursive function on left child, pass in node.left, Math.max(largestAncestor, node.val)
    4. Call recursive function on right child, pass in node.right, Math.max(largestAncestor, node.val)
3. Call findGoods, pass in root and null as parameters
4. Return count output var

Time complexity: O(n) - Since we only need to traverse the tree once to find the good nodes
Space complexity: O(h) - Since we need the tree's height in number of call stacks to traverse the tree

 */

function goodNodes(root: TreeNode | null): number {
  let output = 0;

  function findGoods(node: TreeNode | null, largestAncestor: number | null) {
      if (node === null) return;

      if (largestAncestor === null) largestAncestor = node.val - 1;

      if (node.val >= largestAncestor) output += 1;

      findGoods(node.left, Math.max(largestAncestor, node.val));
      findGoods(node.right, Math.max(largestAncestor, node.val));
  }

  findGoods(root, null);

  return output;
};

/*************** Attempt #2 - Success, easy *******************/

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

In order to know if a node is "good", you need to know what the max value is at the time you traverse to the node. To do this, you can carry through a max variable that starts at the root as the max, then as you traverse down, if the current node is larger, set that node as the new max.

Each time you get to a node that's smaller than the max it receives, add 1 to an external variable

Pseudocode:
1. Instantiate a good var at 0;
2. Instantiate a dfs function that takes in a node and a max var
    // Base case
    1. if node is null, return
    // Recursive case
    2. if the current node is less than or equal to max, add 1 to good var
    3. call dfs on node.left, and set max to the min between the current node val and the max val of the current recursion
    4. call dfs on node.right, and set max to the min between teh current node val and the max val of the current recursion
    No need to return anything since we're just traversing and counting good nodes
3. Call the dfs function with root and root.val as the max
4. Return good

Time complexity: O(n) - Where n is the number of nodes in root, since we have to traverse it
Space complexity: O(h) - Since we use dfs which requires node height amount of space

 */

function goodNodes(root: TreeNode | null): number {
    let good = 0;
    function dfs(node: TreeNode | null, max: number) {
        if (node === null) return;
        if (node.val >= max) good += 1;
        dfs(node.left, Math.max(node.val, max));
        dfs(node.right, Math.max(node.val, max));
    }
    dfs(root, root.val);
    return good;
};

/*

[2,null,4,10,8,null,null,4]

    (3) 3
    /  \
   3(1) (4)3
   /   /   \
 3(3) (1)4  (5)4

    (2)2
      \
      (4)2
      /  \
    4(10) (8)4
           \
           (4)8
*/

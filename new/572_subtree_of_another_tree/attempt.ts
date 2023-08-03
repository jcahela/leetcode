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

For this, I will need to traverse the root tree, looking for the root of subRoot
Once I find a node that has the same value as Root, it's a possible start point to check for equivalency with subRoot
    At this point, I check if both are the same using recursive DFS

I could have a helper function that checks for whether two trees are the same:

1. base case:
    1. if node at p and node at q are both null, return true
    2. if node at p or node at q or value at p !== value at q, return false
2. instantiate a leftSame variable at same(q.left, p.left)
3. instantiate a rightSame variable at same(q.right, p.right)
4. return leftSame && rightSame so it propogates up

Then I could have a helper function that searches through root to find a node with the same value as subRoot.val

1. base case:
    1. if node is null, return
2. currentVal = node.val
3. If currentVal is the same as subRoot.val, run the same function recursively, and store in a variable
4. Set an outside variable to that value if true
5. After traversing the root tree for nodes with values equal to subRoot, return the outside boolean

Pseudocode:
1. Instantiate a hasSubtree boolean variable at false
2. Define a same function that checks for equivalency of two trees
    1. base case:
        1. if node at p and node at q are both null, return true
        2. if node at p or node at q or value at p !== value at q, return false
    2. instantiate a leftSame variable at same(q.left, p.left)
    3. instantiate a rightSame variable at same(q.right, p.right)
    4. return leftSame && rightSame so it propogates up
3. Define a dfs function that traverses through a tree
    1. base case:
        1. if node is null, return
    2. currentVal = node.val
    3. If currentVal is the same as subRoot.val, run the same function recursively, and store in a variable
    4. Set an outside variable to that value if true
4. Run the dfs function on root
5. Return the hasSubtree boolean

Time complexity: O(root + subRoot) - we traverse root once, and whenever we find a node with the same value as root, we traverse through the smaller of the two trees at that point. If root is filled with values that are the same as subRoot, but subRoot is not a subtree

Space complexity: O(h) - since we recurse through both trees at the same time once finding a node in root tree with the same value as the subRoot node, the most stacks will be the taller of the two trees at finding that equivalency
 */

function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  let hasSubtree = false;

  function same(p: TreeNode | null, q: TreeNode | null): boolean { 
      if (p === null && q === null) {
          return true;
      }

      if (!p || !q || p.val !== q.val) {
          return false;
      }
      const leftSame = same(q.left, p.left);
      const rightSame = same(q.right, p.right);

      return leftSame && rightSame;
  }

  function dfs(node: TreeNode | null) {
      if (node === null) return;

      dfs(node.left);
      dfs(node.right);

      if (node.val === subRoot.val) {
          const isSameTree = same(node, subRoot);
          if (isSameTree) hasSubtree = true;
      }
  }

  dfs(root);

  return hasSubtree;
};

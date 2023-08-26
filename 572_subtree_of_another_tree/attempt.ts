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

/***************** Attempt #2 - easy, good, dfs recursion and checking each node for a value that === subRoot.val *******************/

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

traverse the tree, and look for the subRoot value

Once you find a node that's subroot, check for equivalency

If that equivalency is true, set an external var to true
If that equivalency is false, continue traversing the original tree

Pseudocode:
1. Instantiate a subtree var at false
2. Instantiate a dfs function that takes in a node
    // Base case
    1. If node is null or subtree is true, return (if at any point you find a subtree, start immediately recursing up the tree)
    // Recursive case
    2. Recurse left: dfs(node.left)
    3. Recurse right: dfs(node.right)
    4. If current node.val === subRoot.val
        1. Instantiate a var equivalent that will be isSame(node, subRoot)
        2. If equivalent, set subtree var to true
3. Instantiate a isSame function that takes in two nodes
    // Base case
    1. If node1 is null and node2 is null, return true
    2. If !node1 or !node2 or node1.val !== node2.val, return false
    // Recursive case
    3. Instantiate a leftIsSame var at isSame(node1.left, node2.left)
    4. Instantiate a rightIsSame var at isSame(node1.right, node2.right)
    5. Return leftIsSame && rightIsSame so the truthiness propogates up whenever a false case is found
4. Instantiate dfs function with root parameter
5. Return subtree var

Time complexity: O(n) - Where n is the nodes in root tree, worst case the root is all nodes that are the same value as the subRoot root value, and isSame is called on each node, but each subtree is eventually found to not be equivalent. In that case, the worst case time complexity is a coefficient of n, but not an order of magnitude of n since as soon as equivalency is not found, you start recursing up the call stack in the isSame function, so it wouldn't be truly O(n * m), where m is the nodes in the subRoot tree

Space complexity: O(h) - Worst case there's a subtree you have to check in root, but you never go deeper than the height of root, since you stop checking for equivalency once you reach null or you find non-matching nodes, so it's O(h) where h is the height of the root tree

 */

function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
    let subtree = false;
    function dfs(node) {
        if (node === null || subtree) return;
        dfs(node.left);
        dfs(node.right);

        if (node.val === subRoot.val) {
            const equivalent = isSame(node, subRoot);
            if (equivalent) subtree = true;
        }
    }

    function isSame(p, q) {
        if (p === null && q === null) return true;
        if (!p || !q || p.val !== q.val) return false;

        const leftIsSame = isSame(p.left, q.left);
        const rightIsSame = isSame(p.right, q.right);

        return leftIsSame && rightIsSame;
    }

    dfs(root);

    return subtree;
};

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

If I'm on a particular node, what questions can I ask to determine if it's the LCA?

    It's a binary search tree, so at each node I can check:

    1. Is the current node >= p and < q,  or 

    so is p <= node < q OR p < node <= q, return true?

    2. Is the current node < p? Go right

    3. Is the current node > q? Go left

 */

    function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
      if (root === null) return;
        const lower = p.val < q.val ? p : q;
        const higher = q.val < p.val ? q : p;
    
        if (lower.val <= root.val && root.val < higher.val ||
            lower.val < root.val && root.val <= higher.val) {
            return root;
        }
    
        let res;
    
        if (root.val < lower.val) {
            res = lowestCommonAncestor(root.right, p, q); 
        }
    
        if (root.val > higher.val) {
            res = lowestCommonAncestor(root.left, p, q);
        }
    
        return res;
    };

/********************** Attempt #2 - success, though not the most pretty code **********************/

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

In a binary search tree, the left subtree only contains nodes that are less than the current node, and the right subtree only contains nodes that are greater than the current node

This is true at every node

So if I'm looking for the lowest common ancestor between two nodes, I have to find the point at which they converge into their parent nodes. If I'm looking for the lowest common ancestor, I need to look for a node that's between p and q

Constraints don't say p will be less than q, it could be that q is less than p, just that they are not going to be equal to each other

First I need to find what the low bound is:
    low = p.val < q.val ? p.val : q.val
    high = p.val > q.val ? p.val : q.val

if p is 1 and q is 2
if p is 2 and q is 1

I also need to consider if the node is one of the nodes p or q

if the node is p or the node is q, since all Node.val are unique, then I've found the LCA. It's got to be one of them if I haven't found it yet and I land on one of the p or q nodes

Pseudocode:
1. Instantiate low at p.val < q.val ? p.val : q.val
2. Instantiate high at p.val > q.val ? p.val : q.val
4. Instantiate lca at undefined
5. Define dfs that takes in node
6. Call dfs on root
7. Return lca

Time complexity: O(n)
Space complexity: O(n)

 */
function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
    let low = p.val < q.val ? p.val : q.val;
    let high = p.val > q.val ? p.val : q.val;
    let lca;

    function dfs(node) {
        if (node === null || lca) return;

        if (low < node.val && node.val < high) lca = node;
        if (node.val === p.val || node.val === q.val) lca = node;

        dfs(node.left);
        dfs(node.right);
    }

    dfs(root);

    return lca;
}

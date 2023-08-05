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

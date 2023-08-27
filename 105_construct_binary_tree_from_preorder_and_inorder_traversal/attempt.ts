/** Unknown how to approach
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


preorder = [3,9,20,15,7]
inorder =  [9,3,15,20,7]

            (3)
            / \
        (9)   (20)
              /   \
             (15) (7)

 */

             function buildTree(preorder: number[], inorder: number[]): TreeNode | null {

             };


/************* Attempt #2 - knew approach, didn't know how to implement via dfs recursion, almost went iterative route ****************/

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

using the preorder, I know the first node is always the root

using the inorder, I know that once I know the root, every node that appears before the root are nodes on the left subtree of root, and every node that appears after the root are nodes on the right subtree of root

So I can construct the root node, then find the index of the root in inorder array.

Then, iterate from 0 to the root index in inorder, and use that to construct nodes

preorder = [3,9,20,15,7]
inorder  = [9,3,15,20,7]

root node = (3)
rootIndex = 1

from 0 to 1
    root.left = (9)

 */

    function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
        if (!preorder.length || !inorder.length) return null;
    
        const root = new TreeNode(preorder[0]);
        const mid = inorder.indexOf(preorder[0]);
    
        root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
        root.right = buildTree(preorder.slice(mid + 1, preorder.length), inorder.slice(mid + 1, inorder.length));
    
        return root;
    };

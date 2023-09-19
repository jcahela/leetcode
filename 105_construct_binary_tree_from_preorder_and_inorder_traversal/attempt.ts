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


/************************ Attempt #3 - knew approach, understood how to pass preorder and inorder arrays through the dfs traversal so it constructs the tree correctly ************************** */

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

preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]

Since the first number in preorder is always the root of the current tree/subtree, I can use that to create the node I'm currently going to define and attach any subtrees to

Then, I can create the left subtree and right subtree

The left subtree will contain the rest of preorder as preorder (after the root), and the right subtree will have from 0 to the current node's index as inorder, not including the current node in the inorder

The right subtree will contain the rest of preorder as preorder (after the root's index in inorder + 1, so that you don't give it any leftsubtree nodes, up to the end of preorder), and the nodes after the index of the current node in inorder as inorder

node.left = buildTree(preorder.slice(1, preorder.length), inorder.slice(0, inorder.indexOf(preorder[0])));
node.right = buildTree(preorder.slice(inorder.indexOf(preorder[0]) + 1, preorder.length), inorder.slice(inorder.indexOf(preorder[0]) + 1), inorder.length), 

Base case: if (!inorder.length || !preorder.length) return null

Recursive case: return current node, it will be defined as the thing its parent node will point to in the above recursive steps



 */

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    if (!inorder.length || !preorder.length) return null; // don't even need !preorder since inorder will run out at each leaf node first

    const node = new TreeNode(preorder[0]);
    const rootIndex = inorder.indexOf(preorder[0]);

    node.left = buildTree(preorder.slice(1, preorder.length), inorder.slice(0, rootIndex));
    node.right = buildTree(preorder.slice(rootIndex + 1, preorder.length), inorder.slice(rootIndex + 1, inorder.length));

    return node;
};


/*********************** Attempt #4 - knew approach, but was rusty and slow on understanding the approach intuitively, still figured out the correct answer *************************/

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

WIth the preorder array, I know the first node is the root node

With the inorder array, I know which nodes are to the left and right of the root node

First, I know that the 3 in the preorder array is the root of the tree

Every number before 3 in inorder would be in 3's left subtree, and every number after 3 in inorder would be in 3's right subtree

I could recurse down and create nodes using dfs, at the base when there's no more nodes to create in preorder, I could return the node I created to attach to the previous node

root = 3
leftInorder would then be = [9]
leftPreorder would follow the number of items in leftInorder = [3]


node created: (3)
node left subtree:
    - preorder: [9]
    - inorder: [9]

    node created: (9)
    node left subtree:
        - preorder: []
        - inorder: []
    node right subtree:
        - preorder: []
        - inorder: []

node right subtree:
    - preorder: [20, 15, 7]
    - inorder: [15, 20, 7]

    node created: (20)
    node left subtree
        - preorder: [15]
        -inorder: [15]
 */

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    if (!preorder.length || !inorder.length) {
        return null;
    }

    const newNode = new TreeNode(preorder[0]);

    const rootIndex = inorder.indexOf(preorder[0]);

    newNode.left = buildTree(preorder.slice(1, rootIndex + 1), inorder.slice(0, rootIndex));
    newNode.right = buildTree(preorder.slice(rootIndex + 1, preorder.length), inorder.slice(rootIndex + 1, inorder.length));

    return newNode;
};

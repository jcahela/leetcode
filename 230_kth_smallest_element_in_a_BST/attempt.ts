/** SUCCESS!!!
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


                (5)
              /     \
            (2)     (7)
            / \     / \
          (1) (3) (6) (8)

[1, 2, 3, 5, 7, 6, 8]

if (node === null) return;
dfs(node.left);
output.push(node.val);
dfs(node.right);

If I do in-order traversal of the tree

Then place each number in an output array as I traverse

I can iterate over the array k times, and return the number at k

[1,2,3,5,6,7,8]

In order traversal should be

base case
recurse left
do the thing
recurse right

Since it's a binary search tree, if I run an in-order dfs traversal of it, it'll visit each node in order from smallest to largest (since I'd be going down the left tree, visiting the smallest value node, going to its parent, then going to its parent's right child, which should be in order from smallest->larger->largest in that subtree). I can push each value I visit into an output array, then use k to index into the output array to return the correct number that is k smallest in the BST.

Pseudocode:
1. Instantiate a numbers array that's empty
2. Define the inOrderDFS function (node: TreeNode | null)
    1. Base case: if node === null, return
    2. If there's a left child, recurse left
    3. Push current value onto output array
    4. If there's a right child, recurse right
3. Call the inOrderDFS function on root
4. Return numbers array at k - 1 (since k is 1-indexed)

Time complexity: O(n) - Since I'm iterating through the tree once to form the in-order output array, and indexing into that array at O(1) time

Space complexity: O(n) - Since I'm creating a numbers array that holds each number in the BST

 */

function kthSmallest(root: TreeNode | null, k: number): number {
    const numbers = [];

    function inOrderDFS(node: TreeNode | null) {
        if (node === null) return;
        inOrderDFS(node.left);
        numbers.push(node.val);
        inOrderDFS(node.right);
    }

    inOrderDFS(root);

    return numbers[k - 1];
};

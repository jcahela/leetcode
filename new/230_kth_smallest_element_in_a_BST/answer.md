Time to Complete: 30m

Method: Since it's a binary search tree, if I run an in-order dfs traversal of it, it'll visit each node in order from smallest to largest (since I'd be going down the left tree, visiting the smallest value node, going to its parent, then going to its parent's right child, which should be in order from smallest->larger->largest in that subtree). I can push each value I visit into an output array, then use k to index into the output array to return the correct number that is k smallest in the BST.

Faster improvement: Decrement k each time you visit a node, then return the number you get to when k is 0 and stop traversing. That'll return the kth largest element without having to create the whole numbers array.

Pseudocode:
/*
1. Instantiate a numbers array that's empty
2. Define the inOrderDFS function (node: TreeNode | null)
    1. Base case: if node === null, return
    2. If there's a left child, recurse left
    3. Push current value onto output array
    4. If there's a right child, recurse right
3. Call the inOrderDFS function on root
4. Return numbers array at k - 1 (since k is 1-indexed)
*/

Code:

```js
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
```


Time Complexity: O(n)
Explanation: Since I'm iterating through the tree once to form the in-order output array, and indexing into that array at O(1) time

Space: O(n)
Explanation: Since I'm creating a numbers array that holds each number in the BST

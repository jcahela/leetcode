Time to Complete: 30m

Method: Since it's a binary search tree where the left tree is always less than the current node, and the right tree is always more than the current node, the only way for a node to be an LCA between the nodes p and q is if the node is between p and q. If the node were not between p and q, it couldn't be the lowest common ancestor, because its left or right child would also be a common ancestor. So, traverse through the tree, and at each node check if the current node is less than both p and q, and if so, check the right subtree. Do the same check on the left subtree (if node is greater than both p and q). Finally, if the node is between the two, return the node because that's the LCA.

Pseudocode:
/*
1. Base case: 
    1. if the current node is less than p and q, search right subtree
    2. if the current node is greater than p and q, search left subtree
2. Return the current node
*/

Code:

```js
function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
    if (p.val > root.val && q.val > root.val) {
        return lowestCommonAncestor(root.right, p, q);
    }
    if (p.val < root.val && q.val < root.val) {
        return lowestCommonAncestor(root.left, p, q);
    }
    return root;
}
```


Time Complexity: O(log n)
Explanation: Since we half the tree each time we recurse down, so the number of nodes we need to traverse log n

Space: O(h)
Explanation: Where h is the depth of the LCA, since that's where we are directing the recursive function (it goes left/right based on the current node's value compared to p and q, so it won't reach a leaf node/null node). Technically it doesn't even need the if (root === null) base case since it'll find the LCA before that.

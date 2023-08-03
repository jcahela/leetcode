Time to Complete: 15m

Method: For this, I will need to traverse the root tree, looking for a node that has the same value as subRoot. Once I find a node that has the same value as subRoot, it's a possible start point to check for equivalency with subRoot. At that point, I check if both are the same using recursive DFS

Pseudocode:
/*
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
*/

Code:

```js
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
```


Time Complexity: O(s * t)
Explanation: Where s is the root tree and t is the potential subTree. Worst case scenario, I have to traverse through t at every node in s, if every node in s has the same value as the subRoot root node. So worst case time complexity is O(s * t).

Space: O(h)
Explanation: At worse the call stack will fill until at a root node of the tallest tree as I'm checking for 1) nodes in root tree with the same value as subRoot, and 2) traversing both the subtree of root and the t potential subtree.

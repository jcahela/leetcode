Time to Complete:

Method: Recursive DFS. While recursing down, I use a paramater in the recursive function to keep track of the largest ancestor in the line. Then I can check the current node on the largest ancestor variable, and add to a count var outside the recursive function if the current node is greater than or equal to the largest ancestor (which means current node is good).

Pseudocode:
/*
1. Instantiate a count output var at 0
2. Define recursive function findGoods(node: TreeNode | null, largestAncestor: number | null): null
    1. Base case: if root is null, return up
    2. If largestAncestor is null
        1. Set largestAncestor to node.val - 1
    3. If node.val >= largestAncestor
        1. Add 1 to count output
    4. Call recursive function on left child, pass in node.left, Math.max(largestAncestor, node.val)
    4. Call recursive function on right child, pass in node.right, Math.max(largestAncestor, node.val)
3. Call findGoods, pass in root and null as parameters
4. Return count output var
*/

Code:

```js
function goodNodes(root: TreeNode | null): number {
    let output = 0;

    function findGoods(node: TreeNode | null, largestAncestor: number | null) {
        if (node === null) return;

        if (largestAncestor === null) largestAncestor = node.val - 1;

        if (node.val >= largestAncestor) output += 1;

        findGoods(node.left, Math.max(largestAncestor, node.val));
        findGoods(node.right, Math.max(largestAncestor, node.val));
    }

    findGoods(root, null);

    return output;
};
```


Time Complexity: O(n)
Explanation: Since we only need to traverse the tree once to find the good nodes

Space Complexity: O(h)
Explanation: Since we need the tree's height in number of call stacks to traverse the tree

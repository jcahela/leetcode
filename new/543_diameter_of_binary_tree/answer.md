Time to Complete: 15m

Method: Recursive depth first search, and at each node from the bottom (post order traversal) calculate the current diameter using the heights of the left and right subtree and replace a max variable outside the recursive function to keep track of the largest diameter. In order to find the diameter of a binary tree, you only need to traverse through the tree once and touch every node. From the bottom up, you calculate the diameter of the current node, and update the max diameter each time you calculate the diameter of the current node. In order to do this, you define a max variable that holds the current max diameter found, then within the function create the recursive dfs function that'll touch every node, calculate the diameter at the current node, and update max variable if its diameter is greater than the current max variable.

Pseudocode:
/*
1. Instantiate a max variable that'll hold the max diameter
2. Define a dfs recursive function that takes in a node parameter
    1. Base case: if the root is null, return the height, which at a null node is -1 (at a leaf node, the height is 0, so to add up its null children to get 0 with its parent nodes as you pop out of the recursive stack, you need to consider null nodes as -1)
    2. store a recursive call of the left child in a variable called left
    3. store a recursive call of the right child in a variable called right
    // calculate the diameter of the current node
    4. Diameter is left height + right height + 2 (including the current node in the calculation would increase the diameter's length by 2)
    5. Replace the max variable with the diamater if the diameter is larger
    6. Return the height of the current node (1 + the max between the height of the current node's left and right subtrees)
3. Call the dfs recursive function
4. Return the max variable
*/

Code:

```js
function diameterOfBinaryTree(root: TreeNode | null): number {
    let max = 0;

    function dfs(node) {
        if (node === null) return -1;

        const leftHeight = dfs(node.left);
        const rightHeight = dfs(node.right);

        const diameter = leftHeight + rightHeight + 2;

        max = Math.max(max, diameter);

        return 1 + Math.max(leftHeight, rightHeight);
    }

    dfs(root);

    return max;
};
```

```js
// Easier solution that doesn't use -1 for null nodes, or adds by 2 to consider the edges from the current node:
function diameterOfBinaryTree(root: TreeNode | null): number {
    let maxDiameter = 0;

    function dfs(node: TreeNode): number {
        if (!node) return 0;
        const leftHeight = dfs(node.left);
        const rightHeight = dfs(node.right);

        maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);

        const currentHeight = 1 + Math.max(leftHeight, rightHeight);
        return currentHeight;
    }

    dfs(root);

    return maxDiameter;
};
```


Time Complexity: O(n)
Explanation: Since we only need to traverse the tree once using recursive dfs

Space: O(h)
Explanation: Since at most we will use height number of stacks in the recursive call stack before popping out and checking other nodes during traversal

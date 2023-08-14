Time to Complete: 15m

Method: Using recursive DFS to traverse each node, and calculate the left subtree height and right subtree height at each node. Then compare the two heights to see if they differ by more than 1. If at any point they do, change an outside variable to false, then return that outside variable. This requires a dfs function within the answer function.

Pseudocode:
/*
1. Instantiate an output boolean variable at true
2. Create a dfs function that will recursively travese the binary tree
    1. Base case: if root is null, return 0
    2. instantiate a variable called leftHeight that is 1 + dfs(node.left)
    3. instantiate a variable called rightHeight that is 1 + dfs(node.right), as I recurse down, I will get the height of the right subtree, and add 1 to it on the current node once I propogate back up, to get the height of the right subtree 
                       1  +  1  +  0
    (current node) -> () -> () -> null
    4. If Math.abs(leftHeight - rightHeight) > 1 (if they differ by more than 1) set the boolean variable to false
    5. (*forgot to do this*) - return the max value between the left and right heights (this is the height of the current node, which will be used in the calculation of the leftHeight and rightHeight variables above)
3. Call the dfs function with root as a parameter
4. Return the boolean variable
*/

Code:

```js
function isBalanced(root: TreeNode | null): boolean {
    let balanced = true;

    function dfs(node) {
        if (node === null) {
            return 0;
        }

        const leftHeight = 1 + dfs(node.left);
        const rightHeight = 1 + dfs(node.right);

        if (Math.abs(leftHeight - rightHeight) > 1) {
            balanced = false;
        }

        return Math.max(leftHeight, rightHeight);
    }

    dfs(root);

    return balanced;
};
```


Time Complexity: O(n)
Explanation: Since we only need to traverse through the tree once to find if at any point it's not height-balanced

Space Complexity: O(h)
Explanation: Since I'm using recursive DFS and the max number of stacks needed will be h, or the max height of the tree

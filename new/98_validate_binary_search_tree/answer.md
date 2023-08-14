Time to Complete: 30m

Method: Recursive DFS. By keeping track of a min and max value at each node, starting at infinity for both, you can keep track of what the current node needs to be between to remain a valid binary search tree. For example, in the following binary search tree:

/*
      (5)
      / \
    (3) (7)
        / \
      (4) (8)
*/

It is not a valid binary search tree because the node 4 is on the right subtree of the root 5, yet 4 is less than 5. Every node on the right subtree must be greater than 5. To verify this while recursively DFS-ing, you keep track of a min and max variable. At the root node, the min and max are -Infinity and Infinity. Then, when you move to the right child of (5), (7), you update the min value, since 7 must be greater than 5 as part of the right subtree of 5, the new min and max are 5 and Infinity. Then, when you move to the left child of (7), (4), you update the max, since 4 must be less than 7 as part of the left subtree of 7, the new max is 7, but it maintains the min value of 5, since it's still part of 5's right subtree. So 4 must be between 5 and 7, and since it's not, it's false. Basically, recursive DFS, but keeping track of a min and max value, and every time you recurse left, you update the max value, and every time you recurse right, you update the min value.
 
Pseudocode:
/*
1. Instantiate an isValid boolean var at true
2. Define validCheck function with parameters (node: TreeNode | null, min: number, max: number)
    1. Base case: if node is null, return
    2. If the current node's number is smaller or equal to min, or greater or equal to max, set isValid to true, return up
    3. Call recursive function on left child, pass in left child, min, and currentNode.val (new max)
    4. Call recursive function on right child, pass in right child, currentNode.val, and max (new min)
3. Call validCheck function, pass in the root node, -Infinity, and Infinity, as parameters
4. Return isValid boolean var
*/

Code:

```js
function isValidBST(root: TreeNode | null): boolean {
    let isValid = true;
    function validCheck(node: TreeNode | null, min: number, max: number) {
        if (node === null) return;
        if ((node.val <= min) || (node.val >= max)) {
            isValid = false;
            return;
        } else {
            validCheck(node.left, min, node.val);
            validCheck(node.right, node.val, max);
        }
    }

    validCheck(root, -Infinity, Infinity);

    return isValid;
};
```


Time Complexity: O(n)
Explanation: Since we only need to traverse the tree once

Space Complexity: O(h)
Explanation: Since we only need the tree's height number of call stacks to traverse through the tree

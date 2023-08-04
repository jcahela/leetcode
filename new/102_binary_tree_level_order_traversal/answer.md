Time to Complete: 30m

Method: Using iterative breadth first search, I can traverse the tree using a queue one level at a time, and push each node into a temp array that stores each level, then push that temp array into an output array once I reach a new level.

Pseudocode:
/*
1. Instantiate an output array empty
2. Instantiate a level array empty
3. Instantiate a queue with the root node and its level as a tuple
4. While queue has a length
    1. Shift the first node from the queue
    2. Add the node's value to the temp array
    3. If the queue is currently empty, or if the first item in the stack has a higher level than the current node:
        1. push temp array into output array
        2. Set temp array to be empty
    4. Add the node's left and right children to the queue, if they exist
5. return the output array
*/



Code:

```js
function levelOrder(root: TreeNode | null): number[][] {
    let output = [];
    let temp = [];
    let queue: [TreeNode, number][] = [[root, 1]];

    while (queue.length) {
        const [node, level] = queue.shift();
        if (node) {
            temp.push(node.val);
            if (!queue.length || queue[0][1] > level) {
                output.push(temp);
                temp = [];
            }
            if (node.left) queue.push([node.left, level + 1]);
            if (node.right) queue.push([node.right, level + 1]);
        }
    }
    return output;
};
```


Time Complexity: O(n)
Explanation: Where n is the number of nodes in the tree, since we traverse through it once

Space: O(n)
Explanation: Since we store each node value into an output array, and queue

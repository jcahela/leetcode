Time to Complete: 30m

Method: Use iterative BFS and put the last node in each level into an output array. You find the last node in a level by checking if 1) the queue is empty (if it's empty, it has no other siblings), or 2) if it's not empty and the next node in the queue has a level greater than the current node (that's the next level down).

Pseudocode:
/*
1. Instantiate an output array that'll hold the right nums of each level
2. Instantiate a queue that'll hold the root node and its level as a tuple
3. while the queue has a length
    1. shift the front node off the queue
    2. if the node is truthy
        1. if the queue is currently empty or the front node in the queue has a level greater than the current level
            1. add the current node's val to the output array (that's the last node in the current level)
        2. if the node has a left child, push it and its level (current level + 1) to the queue as a tuple
        3. if the node has a right child, push it and its level (current level + 1) to the queue as a tuple
4. return the output array
*/

Code:
```js
function rightSideView(root: TreeNode | null): number[] {
    const output = [];
    const queue: [TreeNode, number][] = [[root, 1]];
    while (queue.length) {
        const [node, level] = queue.shift();

        if (node) {
            if (!queue.length || queue[0][1] > level) {
                output.push(node.val)
            }

            if (node.left) queue.push([node.left, level + 1]);
            if (node.right) queue.push([node.right, level + 1]);
        }
    }

    return output;
};
```


Time Complexity: O(n)
Explanation: Since I'm traversing the whole tree to find the rightmost node of each level

Space: O(n)
Explanation: Since I'm storing n/2 nodes in the queue at the worst time, which simplifies to O(n)

Time to Complete: 15m

Method: There are 3 different ways to do this problem, and it's important to know these methods for the basics of tree traversal via recursion and iteration. The 3 ways are: recursive depth first search, iterative depth first search, and iterative breadth first search. 

For 1) recursive depth first search, you use recursion to add 1 to the return value of the maxmimum value between the recursive call on the current node's right child and left child. By running the max function between both, you cause the node to recurse down to its leaf node, then it hits the base case and returns 0. That 0 gets returned up, and added to the 1 of the leaf node. That leaf node returns as 1 and adds to the 1 of the above node, and so on, until it hits the root node as a number representing the max depth at each step. Then, you add the leaf node's 1 and get the total max depth node. 

For 2) iterative depth first search, you use a stack data structure, and keep track of the levels of each node by pushing the node and its level as a tuple onto the stack. Then, while the stack has a length, iterate through and pop the latest node from the stack, set an outside counter to its level if its level is greater than the current counter (track the max level), then push any right or left children onto the stack with their own levels (current level + 1) as tuples. Continue until you reach a leaf node, and the outside variable will have tracked the max level reached in a depth first search traversal. 

For 3) iterative breadth first search, you use a queue data structure, and keep track of the levels of each node the same way as the iterative depth first search solution. The only difference is, you go level by level, because you use a queue data structure of First In First Out (FIFO) by shifting from the front, so it clears each level before moving onto nodes from the next level. Continue until you reach a leaf node, and the outside variable will have tracked the max level reached in a breadth first search traversal.

Pseudocode:

Recursive DFS:
/*
1. Set the base case to be if root === null, return 0
2. Return 1 + the max between the recursive call of the function on the left child, vs the recursive call of the function on the right child
*/

Iterative DFS:
/*
0. If root input is falsy, return 0
1. Instantiate a stack data structure that holds the root and its level (starting at 1) as a tuple
2. Instantiate a levels variable that'll track the max level that we reach
3. While the stack has a length
  1. Pop out the last tuple from the stack
  2. Set the levels variable to be the current level of the node, if the current level of the node is greater (or the max between the two)
  3. If the current node has a right child, push it and its level (current level + 1) as a tuple onto the stack
  4. If the current node has a left child, push it and its level (current level + 1) as a tuple onto the stack
4. Return the levels variable
*/

Iterative BFS:
/*
0. If the root is falsy, return 0
1. Instantiate a queue data structure that holds the root and its level (starting at 1) as a tuple
2. Instantiate a levels variable that'll track the max level that we reach
3. While the queue has a length
  1. Shift out the first tuple from the queue
  2. Set the levels variable to be the current level of the node, if the current level of the node is greater (or the max between the two)
  3. If the current node has a right child, push it and its level (current level + 1) as a tuple onto the stack
  4. If the current node has a left child, push it and its level (current level + 1) as a tuple onto the stack
4. Return the levels variable
*/

Code:

Recursive DFS:
```ts
function maxDepth(root: TreeNode | null): number {
    if (root === null) return 0;

    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};
```

Iterative DFS:
```ts
function maxDepth(root: TreeNode | null): number {
    if (!root) return 0;
    const stack: [TreeNode, number][] = [[root, 1]];
    let levels = 0;

    while (stack.length) {
        const [node, level] = stack.pop();
        levels = Math.max(levels, level);
        if (node.right) stack.push([node.right, level + 1]);
        if (node.left) stack.push([node.left, level + 1]);
    }

    return levels;
};
```

Iterative BFS:
```ts
function maxDepth(root: TreeNode | null): number {
    if (!root) return 0;
    const queue: [TreeNode, number][] = [[root, 1]];
    let levels = 0;

    while (queue.length) {
        const [node, level] = queue.shift();
        levels = Math.max(levels, level);
        if (node.right) queue.push([node.right, level + 1]);
        if (node.left) queue.push([node.left, level + 1]);
    }

    return levels;
};
```

Time Complexity: O(n)
Explanation: Where n is the number of nodes in the tree, since we're traversing through the whole tree to find the max depth

Space: O(h) recursive, O(n) iterative
Explanation: In the recursive solution, the max number of call stacks will be the depth of the tree, since it pops out and removes a stack from the call stack when propogating back up the recursive calls once reaching the depth of h. In the iterating solution, you only pop out one node from the stack/queue before adding its children, so it more closely approaches O(n), though doesn't quite reache O(n).

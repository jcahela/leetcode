Time to Complete: 30m

Method: Since we have the preorder array, we know an important fact: 1) The first number in the preorder array will always be the root of the tree. Since we have the inorder array, we know another important fact: 2) Numbers to the left of the root found in the preorder array are the root's left subtree, and numbers to the right of the root are the root's right subtree.

Pseudocode:
/*
1. Base case: if preorder or inorder are empty, return null
2. Instantiate a variable root that'l be a TreeNode from the first number in preorder
3. Instantiate a variable mid that'll be the index of the root number in inorder (this will be used to find the left and right subtrees in inorder based on that root index)
4. Set the root's left pointer to be the recursive call of the function
  1. Pass in the new left preorder array, which is from the next number after root to the number of nodes to the left of the root index in inorder
  2. Pass in the new left inorder array, which is from the 0th index in the inorder array to the mid index which is the root (not including the root)
5. Set the root's right pointer to be the recursive call of the function
  1. Pass in the new right preorder array, which is from the node after the end of the left preorder array, to the end of the preorder array
  2. Pass in the new right inorder array, which is from the node after the root index to the end of the inorder array
6. Return the root
*/

Code:

```js
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  // return null if either input array is empty
  if (!preorder.length || !inorder.length) return null;

  // create the root node knowing it's the first number in the preorder array
  const root = new TreeNode(preorder[0]);

  // Find the index of the root number in the inorder array
  const mid = inorder.indexOf(preorder[0]);

  // Recursively call the function and assign to the root's left child
  // Put in the new preorder and inorder arrays. The left preorder array will be the same length as the number of nodes to the left of the root found in inorder (since they're both the left subtree of the current root)
  // ex. preorder = [3,9,20,15,7], inorder = [9,3,15,20,7], since 3 is the root, and it's found in index 1 of inorder, that means the left subtree contains 1 node, since only 9 is to the left of the root node in inorder. That means, the preorder array that contains this left subtree will go from index 1 in preorder (the 9) up to the mid pointer root in inorder + 1 (so a total of 1 node, which makes up the left subtree, +1 because slicing is exclusive)
  root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));

  // Recursively call the function and assign to the root's right child
  root.right = buildTree(preorder.slice(mid + 1, preorder.length), inorder.slice(mid + 1, inorder.length));

  return root;
};
```


Time Complexity: O(p * i)
Explanation: Where p is the length of the preorder array, and i is the length of the inorder array. Since I'm recursively calling the function on subarray in p, and slicing the preorder and inorder arrays to create the subarrays to pass into the recursive calls, the total time complexity is O(p * i) 

Space Complexity: O(p + i)
Explanation: Where p is the length of the preorder array, and i is the length of the inorder array. In the worst case scenario, the recursion depth could be i if the tree is left-skewed or right-skewed, since the recursive call occurs on every number in the inorder array when being constructed.

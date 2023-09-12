/** SUCCESS
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

For this one, I could traverse the trees in the same order, and check the value of the nodes at each traversal. Then I can see if each node is the same as I traverse. First if I create an array that'll hold the order I traversed the tree in and each value, I can then traverse the second tree and create a second array. Then I can compare the values in the two arrays for length and same values

Pseudocode:
1. Instantiate a pArr as empty at first
2. Instantiate a qArr as empty at first
3. Define a pdfs function
    1. Base case: if node is null return
    2. Call left child of node: dfs(node.left)
    3. Call right child of node: dfs(node.right) 
    4. Push the current value onto the pArr
4. Define a qdfs function
    1. Base case: if node is null return
    2. Call left child of node: dfs(node.left)
    3. Call right child of node: dfs(node.right) 
    4. Push the current value onto the qArr    
5. Call the dfs function with p as parameter
6. Call the dfs function with q as parameter
7. if pArr.length !== qArr.length return false
8. iterate from i to pArr.length
    1. if the number at pArr[i] is not the same as the number at qArr[i], return false
9. Return true

Time complexity: O(p + q) -  Since I'm traversing each array but separately, then iterating over the arrays that have n number of nodes for each tree, the max time complexity is O(p + q), assuming both are the same length, it'd be O(n), but if p or q is larger, then it's O(p + q)

Space complexity: O(p + q) - since I am storing each node of each tree in an array, I need p and q number of spaces for comparison

 */

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  const pArr = [];
  const qArr = []
  function pdfs(node) {
      if (node === null) {
          pArr.push(null);
          return;
      }
      

      pdfs(node.left);
      pdfs(node.right);

      pArr.push(node.val);
  }

  function qdfs(node) {
      if (node === null ) {
          qArr.push(null);
          return;
      } 

      qdfs(node.left);
      qdfs(node.right);

      qArr.push(node.val);
  }
  pdfs(p);
  qdfs(q);
  console.log(pArr,qArr);

  if (pArr.length !== qArr.length) return false;

  for (let i = 0; i < pArr.length; i += 1) {
      if (pArr[i] !== qArr[i]) return false;
  }

  return true;
};

/****************** Attempt #2 - Traversing both trees at the same time, using base cases to determine if they're the same, and propogating those booleans up - Successful ********************/

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

What would the base case be? If the pNode does not equal the qNode
    - if pNode is null and qNode is not null
    - if pNode is not null and qNode is null
    - if neither are null but don't equal each other

Pseudocode:
// Base case:
1. If p === null && q !== null, return false
2. If p !== null && q === null, return false
3. If p.val !== q.val, return false

// Recursive case
4. Instantiate a leftIsSame var at isSameTree(p.left, q.left)
5. Instantiate a rightIsSame var at isSameTree(p.right, q.right)
6. Return leftIsSame && rightIsSame (so if either of them are false, it returns false up, propogating up the tree until the overall function returns false)

Time complexity: O(n) - Recursive dfs
Space complexity: O(h) - Recursive dfs

 */

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    if (p === null && q === null) return true;
    if (p === null && q !== null) return false;
    if (p !== null && q === null) return false;
    if (p.val !== q.val) return false;

    const leftIsSame = isSameTree(p.left, q.left);
    const rightIsSame = isSameTree(p.right, q.right);

    return leftIsSame && rightIsSame;
};

/*************************** Attempt #3 - easy no need for external vars *******************************/

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


start at the root of both trees

check if the value is the same
    if they both have values, both values must be the same
    if they both don't have values, they're both the same
    if one has value and the other doesn't, they're not the same

Then traverse the tree and keep checking

If you find a mismatched node, change an outside var to false, then return that outside var which defaults at true

Time complexity: O(n)
Space complexity: O(h)

 */

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    if (!p && !q) return true;
    if (!p || !q || p.val !== q.val) return false;

    const leftIsSame = isSameTree(p.left, q.left);
    const rightIsSame = isSameTree(p.right, q.right);

    return leftIsSame && rightIsSame;
};

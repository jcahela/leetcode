Time to Complete: 15m

Method: Using recursive DFS to traverse both trees at the same time, this one will have a more complicated base case. The base case checks 1) if both nodes are null, in which case return true (both null means they're the same tree), 2) if one of the nodes is null and the other is not, in which case return false because they're not the same, and 3) if both nodes are truthy but their values are not equal, return false because they're not the same. 2 and 3 can be combined since they both return false. Once you have the base cases written, you can do the recursive step, where you call the recursive function on the left subtree of both, and store that in a variable leftSame. Do the same on the next line with the right subtree and a variable rightSame. That'll store whether or not the left and right subtrees returned false or true as it propogated back up the recursive call stack. Finally, the non-base-case return statement will return leftSame and rightSame, because if either is false, it returns false, and propogates that false back up to root, where it returns from the function itself.

Pseudocode:
/*
1. Start a base case (this function can be recursively made from the default function because we can propogate true and false through the traversal via return statements).
  1. if p is null and q is null, return true
  2. if p is null or if q is null, or if p.val doesn't equal q.val, return false
2. Instantiate a variable leftSame that'll hold the result of the recursive call on the left subtree of both trees: leftSame = isSameTree(p.left, q.left)
3. Instantiate a variable rightSsame that'll hold the result of the recursive call on the right subtree of both trees: rightSame = isSameTree(p.right, q.right)
4. Return (the recursive return, not the basecase return) leftSame && rightSame, which makes it so that if either of them are ever false as the recursive call stack pops back up, that false is maintained throughout the propogation and the root recursive function returns that false.
*/


Code:

```js
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    if (p === null && q === null) {
        return true;
    } 
    
    if ((!p || !q) || (p.val !== q.val)) {
        return false;
    }

    const leftSame = isSameTree(p.left, q.left);
    const rightSame = isSameTree(p.right, q.right);

    return leftSame && rightSame;
};
```


Time Complexity: O(p + q)
Explanation: Since we are traversing both trees and it's not guaranteed they have the same length, so the overall time complexity is both of them added together

Space Complexity: O(minH)
Explanation: Since we are traversing both trees, but if either of them have a null node where the other has a non null node, it'll start propogating back up as soon as the shorter tree reaches a null, even if the longer tree has a truthy node at that null node. So, it'll start propogating back up in alignment with the smaller of the two trees, so min height.

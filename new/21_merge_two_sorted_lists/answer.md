Time to Complete: 15m

Method: Use a dummy node to start, which is an empty node, so you can hold the position of the head at the end of the merge (the head at the end of this merge would be dummy.next). Then, you can use a curr node that starts at the dummy, and each time you add l1 or l2 to the curr, you increment curr, then add the next node. Once you run out of nodes in one of the lists, break out of the loop, and add the rest of the other list (if it exists) to the curr. Finally, return dummy.next (which is the head). Note:
  - You don't need to do pointers to the list nodes, since you can just change where you're looking by using the head nodes and changing them to l1.next, for example
  - Your dummy node is a common strategy which solves the problem I had at attempting this: how to hold the spot where the head is once I'm no longer on it after the loop

Pseudocode:
/*
1. Instantiate a dummy variable that starts as an empty node
2. Instantiate a curr variable that starts as the dummy node (empty node)
3. While (l1 && l2) - this condition makes it so the loop continues until one of the lists is on a null node (tail), so you can just add the rest of the other list after the loop, if there's more to be added
  1. if l1.val < l2.val:
    1. set curr.next = l1
    2. set l1 = l1.next
  2. else: (l1.val is either > or = l2.val):
    1. set curr.next = l2
    2. set l2 = l2.next
  3. Regardless of which one you tacked onto the curr node, increment the curr node: curr = curr.next
4. If l1 is truthy - tack it onto curr
5. If l2 is truthy - tack it onto curr
6. return dummy.next
*/


Code:

```ts
function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    let dummy = new ListNode();
    let curr = dummy;

    while (list1 && list2) {
        if (list1.val < list2.val) {
            curr.next = list1;
            list1 = list1.next;
        } else {
            curr.next = list2;
            list2 = list2.next;
        }
        curr = curr.next;
    }

    if (list1) curr.next = list1;
    if (list2) curr.next = list2;

    return dummy.next;
};
```


Time Complexity: O(n + m)
Explanation: Since we have to go through both lists, the worst case time complexity is iterating through both (if list1 contains the extreme values, and list2 is 100 nodes long with values in between the nodes of list1, then worst case is we have to iterate through both sequentially)

Space Complexity: O(1)
Explanation: Since we only use pointers to go through the lists

Time to Complete: 30m

Method: This question wants you to create a deep copy of a singly linked list. The singly linked list that you're given have next nodes that point to the next node in the list like normal, but they also all have a random property that points to a random node (ex. node 1's random can point to node 4, and node 3's random can point to null at the very end). These random pointers also need to be copied. So, each node becomes copied in the right order, and each copied node points to the corresponding copy node that the original list pointed to. So, the way to do this is to do it in 2 passes. The 1st pass, you make a copy of each node, and store the original node and copy node as key-value pairs inside a hashmap (hashmaps can hold ListNodes!). Then, in the second pass, you set up the pointers using the original node list again, and keying into each node to set the next pointers and random pointers, for each copy node. Then, return the head of the copy list.

Pseudocode:

/*

1. Create a hashmap that'll hold the original:copy key value pairs
2. Instantiate a curr variable that starts at head
3. While curr
  1. Instantiate a copy node that is the same value as the current node
  2. Store the current node as a key in the hashmap, and make its value the copy node
  3. Increment the current node
1. Now that you have the hashmap, set curr to be head again, and pass through the original list again. While curr
  1. Set the value node at the current node key (its copy) to have its next pointer point to the value of the current node's next node key in the hashmap:
    hashmap[curr].next = hashmap[curr.next]
  2. Set the current node's copy to have its random pointer point to the random node copy in the hashmap
    hashmap[curr].random = hashmap[curr.random]
  3. Increment curr
4. Return the copy of head in the hashmap: return hashmap[head]

*/


Code:

```js
var copyRandomList = function(head) {
    const copyMap = new Map(); // need to use a Map so you can set the nodes as keys (objects can be used as keys in a Map)
    copyMap.set(null, null); // this is necessary because it's possible the copy of curr.next is null, and since there's no null key, it gets set to undefined, which is not the same as null.
    let curr = head;
    while (curr) {
        const copy = new Node(curr.val);
        copyMap.set(curr, copy);
        curr = curr.next;
    }
    curr = head;
    while (curr) {
        copyMap.get(curr).next = copyMap.get(curr.next);
        copyMap.get(curr).random = copyMap.get(curr.random);
        curr = curr.next;
    }

    return copyMap.get(head);
};
```


Time Complexity: O(n)
Explanation: Since we pass through the linked list twice, we run O(2n) operations, which simplifies to O(n)

Space: O(n)
Explanation: Since we use a hashmap to hold all the nodes and their copies, the max space used is O(n)

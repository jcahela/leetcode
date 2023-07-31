Time to Complete:

Method: This is more a design problem than an algorithm problem. The best way to store each key and value given through the .put method is through a hashmap. However, instead of using the key as the key and the value as the value, we will use the key as a key and the value as a pointer to a Node that contains the value. The way to keep track of which node is to have a Left and Right pointer nodes, where Left points to the least recently used node, and Right points to the most recently used node. These nodes will be connected in a Doubly Linked List, so that their positions can be swapped easily from left to right, so when a node is used, its least recently used neighbor can become the new left-most node. So, there will be a capacity to keep track of, a doubly linked list to keep track of least/most recently used nodes, with a left node at the beginning pointing at the least recently used node, and a right node at the end pointing at the most recently used node, and a hashmap to store the keys that points to the node with the correct value.

The nodes will look like this:

/*
class MyNode {
    key: number;
    val: number;
    prev: MyNode | null;
    next: MyNode | null;

    constructor(key: number, val: number) {
        this.key = key;
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}
*/

Pseudocode:
/*
// Create the MyNode class in order to create a double linked list
1. Instantiate a Node class named MyNode
  1. Set its parameter definitions to include key: number, val: number, prev: MyNode | null, and next: MyNode | null (allow it to instantiate without a prev/next pointer, but give it the option to set prev and next only to MyNode datatypes later)
  2. Set its constructor to take in a key and value, the key will be the given key for the cache, and the value will be the number
  3. Set its prev to be null
  4. Set its next to be null

// Define the LRUCache parameters and constructor
1. Set the parameters to include:
    1. capacity: number; this will be the given capacity when instantiating a new LRUCache
    2. cache: object; this will be the hashmap that holds the given keys and the values being the created MyNode's
    3. left: MyNode; this will be the leftmost node pointing to the least recently used node in the list
    4. right: MyNode; this will be the rightmost node pointing to the most recently used node in the list
    Note: when getting or editing an existing node, that node gets removed from wherever it is in the list, and put to the rightmost side right before the this.right node. This causes the least recently used nodes to naturally be on the left side of the doubly linked list, since they aren't being touched, but their neighbors are being removed and inserted to their right.
2. Set up the LRUCache constructor:
    1. Set capacity to this.capacity
    2. Set cache to be {}
    3. Set left to be a new MyNode with 0 for key and value
    4. Set right to be a new MyNode with 0 for key and value
    5. IMPORTANT: connect left and right. At first it will be just these border nodes, and we'll insert new nodes as they come and get edited/retrieved
        1. Set left.next to equal right
        2. Set right.prev to equal left

// Set up helper functions remove and insert
3. remove: Create a new method remove that takes in a node: MyNode datatype. This function disconnects the node from the list, but the cache at its key will still point to it
    1. Within the function, save the node's left neighbor (node.prev) to a variable left
    2. Save the node's right neighbor (node.next) to a variable right
    3. Set left.next to be right (bypass node)
    4. Set right.prev to be left (bypass node, cutting it out of the list)
4. insert: Create a new method insert that adds a node just before the this.right node, it takes in node: MyNode datatype
    1. Save this.right node to a variable right
    2. Save this.right.prev node to a variable left
    3. Set left.next to point to the node input
    4. Set node.prev to point to left
    5. Set node.next to point to right
    6. Set right.prev to point to the node input

// Define the get function, using the remove and insert helper functions
5. In get, if the cache contains the input key
    1. store the node at that key in a variable retrievedNode
    2. remove retrievedNode from the list, wherever it lies in the list, with this.remove(retrievedNode)
    3. add retrievedNode to the rightmost of the list with this.insert(retrievedNode)
    4. Return retrievedNode.val
6. If the cache doesn't contain the input key, return -1

// Define the put function, using the remove and insert helper functions, and keeping in mind capacity and the number of keys in the cache
7. In the put function, if the key given already exists in the cache, remove the node from the list: this.remove(this.cache[key]);
8. Instantiate a new variable set to new Node(key, value)
9. Whether or not the key existed in the cache, the code to either set the new node at that key, or edit the key to point to the new node, is the same: this.cache[key] = new
10. Insert the node into the list: this.insert(new)
11. Check capacity:
    1. If capacity is less than the number of keys in the cache (Object.keys(this.cache).length), then remove the most recently used (leftmost) node:
        1. Store the node being removed in a variable lru: lru = this.left.next
        2. Remove the node from the list: this.remove(lru)
        3. Delete the key that points to the lru node: delete this.cache[lru.key]
*/

Code:

```ts
class MyNode {
    key: number;
    val: number;
    prev: MyNode | null;
    next: MyNode | null;

    constructor(key: number, val: number) {
        this.key = key;
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    capacity: number;
    cache: object;
    left: MyNode;
    right: MyNode;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.cache = {};
        // the LRUCache left MyNode points at the least recently used MyNode
        this.left = new MyNode(0,0);
        // the LRUCache right MyNode points at the most recently used MyNode
        this.right = new MyNode(0,0);
        this.left.next = this.right;
        this.right.prev = this.left;
    }

    // Add two helper fuctions, remove and insert, to clean up and separate responsibilities, easier to implement
    remove(node: MyNode) {
        const left = node.prev;
        const right = node.next;
        left.next = right;
        right.prev = left;
    }

    insert(node: MyNode) {
        const left = this.right.prev;
        const right = this.right;
        left.next = node;
        right.prev = node;
        node.prev = left;
        node.next = right;
    }

    get(key: number): number {
        // retrieve the node at the given key
        if (this.cache[key]) {
            // remove the node from the left
            this.remove(this.cache[key]);
            // insert the node into the rightmost of the list between the right pointer and its previous node
            this.insert(this.cache[key]);
            // return the value at that node
            return this.cache[key].val;
        } else {
            return -1;
        }
    }

    put(key: number, value: number): void {
        // if the key exists in the cache already, remove the node from the list
        if (this.cache[key]) {
            this.remove(this.cache[key]);
        }
        // then, create a new node
        const newNode = new MyNode(key, value);
        // then, point the key in the cache to the new node
        this.cache[key] = newNode;
        // then, insert the node to the right (most recently used)
        this.insert(newNode);
        // check capacity:
        // if the length of the keys in the cache exceeds capacity, remove the left most node
        if (Object.keys(this.cache).length > this.capacity) {
            // remove the node from the list
            const lru = this.left.next;
            this.remove(lru);
            // remove the key of that node from the cache
            delete this.cache[lru.key];
        }
    }
}
```


Time Complexity: O(n)
Explanation: Since every operation is O(1), I run through the given inputs n and perform n many operations

Space: O(c)
Explanation: Where c is the capacity of the LRUCache object. Since I'm only holding that many keys in my cache hashmap and that many nodes in my node list which keeps track of the least recently used and most recently used sides

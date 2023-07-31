Time to Complete:

Method: This is more a design problem than an algorithm problem. The best way to store each key and value given through the .put method is through a hashmap. However, instead of using the key as the key and the value as the value, we will use the key as a key and the value as a pointer to a Node that contains the value. The way to keep track of which node is to have a Left and Right pointer nodes, where Left points to the least recently used node, and Right points to the most recently used node. These nodes will be connected in a Doubly Linked List, so that their positions can be swapped easily from left to right, so when a node is used, its least recently used neighbor can become the new left-most node. So, there will be a capacity to keep track of, a doubly linked list to keep track of least/most recently used nodes, with a left node at the beginning pointing at the least recently used node, and a right node at the end pointing at the most recently used node, and a hashmap to store the keys that points to the node with the correct value.

The nodes will look like this:

class ListNode {
  key: number
  val: number
  next: ListNode | null
  prev: ListNode | null
  constructor(key?: number, val?: number, prev?: ListNode | null, next?: ListNode | null) {
    this.key = (key===undefined ? 0 : key)
    this.val = (val===undefined ? 0 : val)
    this.prev = (prev===undefined ? null : prev)
    this.next = (next===undefined ? null : next)
  }
}

Pseudocode:
1. Instantiate a Node class to create the doubly linked list
  1. Set its constructor to have a key and value


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

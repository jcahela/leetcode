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
class Node {
    prev: Node | null;
    next: Node | null;
    key: number;
    val: number;

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
    left: Node;
    right: Node;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.cache = {};
        // the LRUCache left node points at the least recently used node
        this.left = new Node(0,0);
        // the LRUCache right node points at the most recently used node
        this.right = new Node(0,0);
        this.left.next = this.right;
        this.right.prev = this.left;
    }

    get(key: number): number {

    }

    put(key: number, value: number): void {
        this.cache[key] = new Node(key, value);
        let prev = this.right.prev;
    }
}
```


Time Complexity:
Explanation:

Space:
Explanation:

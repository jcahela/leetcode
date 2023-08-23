/*

The LRUCache is an object-like item, and gets a capacity when initialized.

Capacity determines how many key-value pairs the object can store.

If you try to cache.put into an initialized cache when it's already reached capacity, you must delete the least recently used key

the get method takes in a key, and returns the number at that key

the put method either updates the value of the key if the key exists, or adds the key-value pair to the cache

I could use an object to hold the key-value pairs, capacity to track how much more I can add before deleting the least recently used key, and an Array/linked list data type to hold the order of keys added, and remove the one in front when I've reached capacity

*/

class LRUCache {
  capacity: number;
  cache: object;
  recentlyUsedList: number[];
  recentlyUsedIndex: number;

  constructor(capacity: number) {
      this.capacity = capacity;
      this.cache = {};
      this.recentlyUsedList = []; // this can be a linked list to have O(1) removal from the beginning
      this.recentlyUsedIndex = 0;
  }

  get(key: number): number {
      console.log(this.cache);
      if (this.cache[key]) {
          return this.cache[key];
      } else {
          return -1;
      }
  }

  put(key: number, value: number): void {
      if (this.capacity === 0) {
          const keyToDelete = this.recentlyUsedList.shift() || 0;
          delete this.cache[keyToDelete];
          this.capacity += 1;
      }

      this.recentlyUsedList.push(key);
      this.cache[key] = value;
      this.capacity -= 1;
  }
}

/**
["LRUCache","put","put","get","put","get","put","get","get","get"]
[[2],       [1,1],[2,2],  [1],[3,3],  [2],[4,4],  [1],  [3],  [4]]
correct output:
[null,       null, null,  1,   null,  -1,  null,   -1,   3,    4]
my output:
[null,       null, null,  1,   null,   2,  null,   -1,   3,    4]


cache.put()

* Your LRUCache object will be instantiated and called as such:
* var obj = new LRUCache(capacity)
* var param_1 = obj.get(key)
* obj.put(key,value)
*/

/******************* Attempt #2 - lengthy attempt, done in 40 minutes though *********************/

/*

I will need to keep track of what is the least recently used key-value pair

I could use a linked list ordered from least recently used to most recently used

(lru) -> (1) -> (2) -> (3) (mru)

if I get node 1, I would move it to be rightmost before (mru) node

To do that, I'd need to remove node 1 from the left, then set the node before (mru) to point to (1), and set (1) to point to (mru), making it rightmost

To do THAT, I'd need to make it a doubly linked list to get the node before (mru) in O(1) time

(lru) <-> (1) <-> (2) <-> (3) (mru)

If I'm asked to get the node in the middle, I'd have to pluck out that node from the list, and put it at the end

To get the node in the middle in O(1) time, I'd need to have a map of that node, with the key in the cache pointing at that node, so I could get it instantly

{
    1: (1),
    2: (2),
    3: (3)
}

If I reach capacity (say capacity is 3), and I'm told to put in the node (4) into the cache, I'd need to pluck out the least recently used node from the list. So I'd first key into the cache using the key, set the node before that node (lru) to point to the node after it, and the node after it to point to the (lru), then delete the key-value from the cache, before adding in node (4) to the right

That means I'd need a reference to the key on the node too, so when I remove it from the list, I have a reference of what key to use to delete the right reference in the map

I need a few things:
1. A ListNode class that has instance variables: key, value, prev, next
2. 2 ListNodes that are start and end that start out pointing at each other in the LRUCache constructor
3. A cache map to hold the key-node key/value pairs
4. Helper functions would help
    1. remove that plucks a given node from the list and returns it
    2. insert that adds a given node to the end of the list and returns it

Pseudocode:
// Create the ListNode class
1. Instantaite a ListNode class that has instasnce variables: key, value, prev, next, all optional variables, otherwise set to null

// Set up the constructor of LRU cache class
2. Create capacity var instance variable
3. Create this.cache var as {}
4. Create start that's a ListNode with no key/value/prev/next
5. Create end that's a ListNode with no key/value/prev/next
6. Set start.next to be end, its prev will be null
7. Set end.prev to be start, its next will be null

// Create helper function remove, that has parameter node
8. With the given node, set its prev to point to its next
9. Set its next to point to its prev
10. Return the node

// Create helper function insert, that has parameter node (3) <-> (end) => (3) <-> (node) <-> (end)
11. With the given node, set this.end.prev.next to point to node
12. Set node.prev to point to this.end.prev
13. Set node.next to point to this.end
14. Set this.end.prev to point to node
15. Return node

// Set up get function
16. if the key doesn't exist in cache, return -1
17. Instantiate var node and store this.remove(this.cache[key]) in it, it's now removed from the (start) side of the list
18. Call this.insert(node), it's now inserted into the last position on the (end) side of the list
19. Return node.val

// Set up the put function
20. Check if capacity is 0
    1. If so, we can't add the key-value node to the list or cache yet, we must remove the LRU from the left
    2. Instantiate a node var at this.remove(this.start.next), it should now be removed from the list
    3. Run delete this.cache[node.key]
21. Instantiate a node var at new ListNode(key, value)
21. Add the node to the cache at this.cache[key] = node (adds to the cache)
22. Run this.insert(node) (adds to the list)
23. Subtract 1 from capacity

Time complexity of each operation: O(1) - Since I'm using a hashmap to store references to each node in the list, and using pointers to remove and insert nodes from the left and right sides of the list, respectively

Space complexity of each operation: O(c) - Where c is capacity, since that's the most I'm storing in the cache at any one point, and the most listnodes that'll exist at any one time

*/

// Create the MyNode class
// 1. Instantaite a MyNode class that has instasnce variables: key, value, prev, next, all optional variables, otherwise set to null
class MyNode {
    key: number | null;
    val: number | null;
    prev: MyNode | null;
    next: MyNode | null;

    constructor(key?: number | null, val?: number | null, prev?: MyNode | null, next?: MyNode | null) {
        this.key = key === undefined ? null : key;
        this.val = val === undefined ? null : val;
        this.prev = prev === undefined ? null : prev;
        this.next = next === undefined ? null : next;
    }
}

class LRUCache {
    // Set up the constructor of LRU cache class
    // 2. Create capacity var instance variable
    // 3. Create this.cache var as {}
    // 4. Create start that's a MyNode with no key/value/prev/next
    // 5. Create end that's a MyNode with no key/value/prev/next
    // 6. Set start.next to be end, its prev will be null
    // 7. Set end.prev to be start, its next will be null
    capacity: number;
    cache: object;
    start: MyNode;
    end: MyNode;
    constructor(capacity: number) {
        this.capacity = capacity;
        this.cache = {};
        this.start = new MyNode();
        this.end = new MyNode();
        this.start.next = this.end;
        this.end.prev = this.start;
    }

    // Create helper function remove, that has parameter node
    // 8. With the given node, set its prev to point to its next
    // 9. Set its next to point to its prev
    // 10. Return the node
    remove(node: MyNode) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
        return node;
    }

    // Create helper function insert, that has parameter node (3) <-> (end) => (3) <-> (node) <-> (end)
    // 11. With the given node, set this.end.prev.next to point to node
    // 12. Set node.prev to point to this.end.prev
    // 13. Set node.next to point to this.end
    // 14. Set this.end.prev to point to node
    // 15. Return node
    insert(node: MyNode) {
        this.end.prev.next = node;
        node.prev = this.end.prev;
        node.next = this.end;
        this.end.prev = node;
        return node;
    }

    // Set up get function
    // 16. if the key doesn't exist in cache, return -1
    // 17. Instantiate var node and store this.remove(this.cache[key]) in it, it's now removed from the (start) side of the list
    // 18. Call this.insert(node), it's now inserted into the last position on the (end) side of the list
    // 19. Return node.val
    get(key: number): number {
        if (!this.cache[key]) return -1;
        const node = this.remove(this.cache[key]);
        this.insert(node);
        return node.val;
    }

    // Set up the put function
    // 20. Check if capacity is 0 AND that the key doesn't already exist in the cache
        // 1. If so, we can't add the key-value node to the list or cache yet, we must remove the existing LRU from the left
        // 2. Instantiate a node var at this.remove(this.start.next), it should now be removed from the list
        // 3. Run delete this.cache[node.key]
        // 4. Add 1 to capacity
    // 21. Instantiate a node var at new ListNode(key, value)
    // 22. If the key already exists in the cache, I need to remove the existing node from the list
        // 1. If this is the case, capacity isn't changing, so don't decrement capacity, it just overwrites an existing node
    // 23. Else (key doesn't exist in the cache), decrement capacity
    // At this point, whether or not the node exists in the cache, either it can be added as a new node and key (capacity can withstand it after deleting above), or it can overwrite an existing node which existed at that key but has since been removed from the list (capacity can withstand it because it doesn't change capacity, and a key is just changing nodes, which can happen at max capacity). Either way:
    // 24. Add the node to the cache at this.cache[key] = node (adds to the cache)
    // 25. Run this.insert(node) (adds to the list)
    // 26. Subtract 1 from capacity
    put(key: number, value: number): void {
        let node: MyNode | undefined;
        if (this.capacity === 0 && !this.cache[key]) {
            node = this.remove(this.start.next);
            delete this.cache[node.key];
            this.capacity += 1;
        }

        node = new MyNode(key, value);
        if (this.cache[key]) {
            this.remove(this.cache[key]);
        } else {
            this.capacity -= 1;
        }

        this.cache[key] = node;
        this.insert(node);
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)

["LRUCache","get","put","get","put","put","get","get"]
[  [2],       [2],[2,6], [1], [1,5],[1,2], [1],  [2]]
[  null,      -1,  null, -1,   null,null,   2,    6]

capacity: 2;  => null
get(2)        => -1
put(2,6) {
    2: MyNode(key = 2, val = 6)
} capacity: 1 => null     
get(1)        => -1
put(1,5) {
    2: MyNode(key = 2, val = 6),
    1: MyNode(key = 1, val = 5)
} capacity: 0 => null
put(1,2) {
    2: MyNode(key = 2, val = 6),
    1: MyNode(key = 1, val = 2)
} capacity: 0 => null
 */

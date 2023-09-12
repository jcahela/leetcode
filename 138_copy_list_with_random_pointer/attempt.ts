/*

Could not begin to understand the question

*/

/***************** Attempt #2 got approach correct, forgot to use Map instead of hashmap *********************/

// REMEMBER: Maps can store nodes (objects) as keys, so always use a Map if you're dealing with storing nodes as keys

/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}



In order to create a copy, I'll have to map the old list with a new list:

{
    3: (val: 3, random: null, next: null),
    4: (val: 4, random: null, next: null)
}

Once all the new nodes are created with the same values as the old nodes, mapped to their values in a hashmap, I can iterate through the old list again, and at each node, point the new nodes random and next pointers to the correct new nodes within the map

Then, I can return the head of the new list

Pseudocode:
// Create a map of new nodes by iterating through the given list
1. Instantiate a nodeMap var at {}
2. Create a curr var at head
3. While curr
    1. Add the current value to the map as a key, and set its value = new Node(thatVal), without setting its random or next pointers (because those new nodes haven't been created yet)
    2. Increment curr
4. Set curr to = head again
5. While curr
    1. Set the node at the current val in nodeMap to have its next pointer point to the node at the value of that next pointer in the nodeMap
    2. Set the node at the current val in nodeMap to have its random pointer point to the node at the value of that random pointer in the nodeMap
    3. Increment curr
6. Return nodeMap[head.val]

Time complexity: O(n) - Since we only need to traverse through the given list twice, which simplifies to O(n)
Space complexity: O(n) - Since we store n amount of nodes in the nodeMap to store before setting each new node's pointers

 */
var copyRandomList = function(head) {
  const nodeMap = new Map();
  nodeMap.set(null, null);
  let curr = head;

  while (curr) {
      nodeMap.set(curr, new Node(curr.val));
      curr = curr.next;
  }

  curr = head;

  while (curr) {
      nodeMap.get(curr).next = nodeMap.get(curr.next);
      nodeMap.get(curr).random = nodeMap.get(curr.random);
      curr = curr.next;
  }

  return nodeMap.get(head);
};

/* Works fine in TypeScript */

/**
 * Definition for Node.
 * class Node {
 *     val: number
 *     next: Node | null
 *     random: Node | null
 *     constructor(val?: number, next?: Node, random?: Node) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *         this.random = (random===undefined ? null : random)
 *     }
 * }
 */

function copyRandomList(head: Node | null): Node | null {
  const nodeMap = new Map();
  nodeMap.set(null, null);

  let curr = head;

  while (curr) {
      nodeMap.set(curr, new Node(curr.val));
      curr = curr.next;
  }

  curr = head;

  while (curr) {
      nodeMap.get(curr).next = nodeMap.get(curr.next);
      nodeMap.get(curr).random = nodeMap.get(curr.random);
      curr = curr.next;
  }

  return nodeMap.get(head);
};


/******************** Attempt #3 - easy, fast, conceptually understood from start, no pseudocode *******************/

/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */

var copyRandomList = function(head) {
    const nodeMap = new Map();
    nodeMap.set(null, null);

    let curr = head;

    while (curr) {
        nodeMap.set(curr, new ListNode(curr.val));
        curr = curr.next;
    }

    curr = head;

    while (curr) {
        nodeMap.get(curr).next = nodeMap.get(curr.next);
        nodeMap.get(curr).random = nodeMap.get(curr.random);
        curr = curr.next;
    }

    return nodeMap.get(head);
};


/******************** Attempt #4 - easy, understand concept ********************/

/**
 * Definition for Node.
 * class Node {
 *     val: number
 *     next: Node | null
 *     random: Node | null
 *     constructor(val?: number, next?: Node, random?: Node) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *         this.random = (random===undefined ? null : random)
 *     }
 * }

{
    originalNodehead: copyNodeHead,
    originalNodehead+1: copyNodeHead+1
}

if originalNodeHead points its next at originalNodeHead+3, I could set its value to point to the value of originalNodeHead+3, causing the copies to point at the correct nodes

Pseudocode:
// First, create a map that has a key/value of null at the start
1. Instantiate a map: const nodeMap = new Map()
2. Set a key of null with value of null: nodeMap.set(null, null)

// Then traverse through the list, setting the copy nodes as values to their original counterparts as keys
3. Instantiate a curr var at head
4. While curr is truthy
    1. Set the current node as the key, and a copy of it as the value, into the map: nodeMap.set(curr, new Node(curr.val))
    2. Increment curr (curr = curr.next)

// Then, traverse through the list again, setting the pointers for each node using the originals to key into their own copies
5. Set curr back to head
6. While curr is truthy
    1. Set the value at the current node in nodeMap (its copy) to have its next pointer point to the value at the current node's next node in nodeMap (the copy of the current node's next node)
    2. Set the value at the current node in nodeMap (its copy) to have its random pointer point to the value at the current node's random node in nodeMap (the copy of the current node's random node)

// Finally, return the value of head in the map, which should be the copy list head
7. Return nodeMap at head

Time complexity: O(n)
Space complexity: O(n)

 */

function copyRandomList(head: Node | null): Node | null {
    const nodeMap = new Map();
    nodeMap.set(null, null);

    let curr: Node = head;
    while (curr) {
        nodeMap.set(curr, new Node(curr.val));
        curr = curr.next;
    }

    curr = head;
    while (curr) {
        nodeMap.get(curr).next = nodeMap.get(curr.next);
        nodeMap.get(curr).random = nodeMap.get(curr.random);
        curr = curr.next;
    }

    return nodeMap.get(head);
};

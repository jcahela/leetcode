/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }


Thoughts: Since each list contains the addend but reversed, I would need to reverse the two linked lists, then traverse through them both, and store each digit in a string.

Then, once I have the string number, I will need to reverse that string, then create new nodes for each number in the string.

Step 1) Reverse the first list, traverse it, then store its number in a string
Step 2) Reverse the second list, traverse it, then store its number in a string
Step 3) Convert both strings into numbers, add them together
Step 4) Convert the sum into a string, reverse that string
Step 5) Create a linked list based on the reversed sum string

Pseudocode:
// Reverse l1
1. Instantiate a prev1 that starts at null
2. Instantiate a curr1 that starts at l1
3. While curr1
    1. Store curr1.next in a tmp variable
    2. Set curr1.next = prev1
    3. Set prev1 = curr1
    4. Set curr1 = tmp variable

// Reverse l2
4. Instantiate a prev2 that starts at null
5. Instantiate a curr2 that starts at l2
6. While curr2
    1. Store curr2.next in a tmp variable
    2. Set curr2.next = prev2
    3. Set prev2 = curr2
    4. Set curr2.next = tmp variable

// Store reversed l1 list values in a string
7. Instantiate addend1Str as an empty string
8. While (prev1)
    1. Add the current number as a string to the empty string: addend1Str += `${prev1.val}`;
    2. increment prev1

// Store reversed l2 list values in a string
9. Instantiate addend2Str as an empty string
10. While (prev2)
    1. Add the current number as a string to the empty string: addend2Str += `${prev2.val}`;
    2. increment prev2

// Add the two numbers
11. sum = `${BigInt(addend1Str, 10) + BigInt(addend2Str, 10)}`;

// 1st pass: Create the nodes by traversing backwards along the sum string and storing in a map
12. Instantiate an indexPointer that starts at the end of the sum string: sum.length - 1
13. Instantiate a Map that holds the index as the key, and the node as the value.
14. While indexPointer is greater than 0
    1. Store the current index in the map as the key, and create a new node as the value: map[index] = new ListNode(sum[index])

// 2nd pass: set the next pointers on each node
15. Set indexPointer back to sum.length - 1
16. While indexPointer is greater than 0
    1. Set the current node at the current index in the map to have its next pointer point at the node at the previous index in the map: map[index].next = map[index - 1] || null (|| null is necessary in case you're at the beginning of the sum string, and there is no map[-1]).

// Return the head of the new list stored in the hashmap
17. Return map[sum.length - 1]


Time complexity: O(l1 + l2) - since I traverse both lists to reverse them, traverse them again to get the addends, then iterate over a string version of the sum, the worst time complexity is the addition of the two lengths of lists

Space complexity: O(s) - where s is the length of the string of the sum of the two addends gotten by the list, which is what I use to create the hashmap

 */

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  // Reverse l1
  // 1. Instantiate a prev1 that starts at null
  let prev1 = null;
  // 2. Instantiate a curr1 that starts at l1
  let curr1 = l1;
  // 3. While curr1
  //     1. Store curr1.next in a tmp variable
  //     2. Set curr1.next = prev1
  //     3. Set prev1 = curr1
  //     4. Set curr1 = tmp variable
  while (curr1) {
      const tmp = curr1.next;
      curr1.next = prev1;
      prev1 = curr1;
      curr1 = tmp;
  }
  
  // Reverse l2
  // 4. Instantiate a prev2 that starts at null
  let prev2 = null;
  // 5. Instantiate a curr2 that starts at l2
  let curr2 = l2;
  // 6. While curr2
  //     1. Store curr2.next in a tmp variable
  //     2. Set curr2.next = prev2
  //     3. Set prev2 = curr2
  //     4. Set curr2.next = tmp variable
  while (curr2) {
      const tmp = curr2.next;
      curr2.next = prev2;
      prev2 = curr2;
      curr2 = tmp;
  }
  
  // Store reversed l1 list values in a string
  // 7. Instantiate addend1Str as an empty string
  let addend1Str = '';
  // 8. While (prev1)
  //     1. Add the current number as a string to the empty string: addend1Str += `${prev1.val}`;
  //     2. increment prev1
  while (prev1) {
      addend1Str += `${prev1.val}`;
      prev1 = prev1.next;
  }
  
  // Store reversed l2 list values in a string
  // 9. Instantiate addend2Str as an empty string
  let addend2Str = '';
  // 10. While (prev2)
  //     1. Add the current number as a string to the empty string: addend2Str += `${prev2.val}`;
  //     2. increment prev2
  while (prev2) {
      addend2Str += `${prev2.val}`;
      prev2 = prev2.next;
  }
  
  // Add the two numbers
  // 11. sum = `${BigInt(addend1Str, 10) + BigInt(addend2Str, 10)}`;
  const sum = `${BigInt(addend1Str) + BigInt(addend2Str)}`; // BigInt is the same as parseInt, but allows you to keep precision when trying to convert a string to a number that is larger than the max limit of parseInt. In this example, the number 1e+30 was attempted to convert to a number, but parseInt couldn't handle it. So BigInt (ES11 in 2020) was introduced to handle precision at large numbers like this.
  
  // 1st pass: Create the nodes by traversing backwards along the sum string and storing in a map
  // 12. Instantiate an indexPointer that starts at the end of the sum string: sum.length - 1
  let indexPointer = sum.length - 1;
  // 13. Instantiate a Map that holds the index as the key, and the node as the value.
  let answerMap = {};
  // 14. While indexPointer is greater than or equal to 0
  //     1. Store the current index in the map as the key, and create a new node as the value: map[index] = new ListNode(sum[index])
  while (indexPointer >= 0) {
      const newVal = parseInt(sum[indexPointer]);
      answerMap[indexPointer] = new ListNode(newVal);
      indexPointer -= 1;
  }
  
  // 2nd pass: set the next pointers on each node
  // 15. Set indexPointer back to sum.length - 1
  indexPointer = sum.length - 1;
  // 16. While indexPointer is greater than 0
  //     1. Set the current node at the current index in the map to have its next pointer point at the node at the previous index in the map: map[index].next = map[index - 1] || null (|| null is necessary in case you're at the beginning of the sum string, and there is no map[-1]).
  while (indexPointer >= 0) {
      answerMap[indexPointer].next = answerMap[indexPointer - 1] || null;
      indexPointer -= 1;
  }
  
  // Return the head of the new list stored in the hashmap
  // 17. Return map[sum.length - 1]
  return answerMap[sum.length - 1];
  
  };

  /********************** Attempt #2 - using simplified method, only requiring a single traversal ******************************/

  // REMEMBER: using a dummy node and adding each newly created node to it as its made can save on space complexity
  /**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }

l1 = [2,3,8,9,1]
l2 = [5,6,4]

num1 = 19832
num2 = 465
11 
19832
  465
------
20297

I could consider null nodes to be 0, and continue adding, in case I have leftover from the last sum where both l1 and l2 were non null

(7) -> (0) -> (8) -> (1) -> (1)

Output is the sum of the two numbers, but maintaining its reversal

If I iterate through both lists at the same time, I could add the two nodes together + leftover
    - fist have a var called leftover starts at 0
    - if the sum >= 10, I need to carry the 1, so 19 total % 10 = 1 leftover, 9 sum
    - Then, create a node with the val as the sum or 9 (if there was leftover), and store it in an array

Once done, I should have an array filled with nodes, I could iterate through the array and point each node at the next, or null at the end

Then, return the first node in the array

Pseudocode:
1. Instantiate a nodeArray at []
2. Instantiate a leftover var at 0 (this will hold remainders of additions greater than 10)
3. While l1 or l2
    1. Instantiate addend1 var at l1 or 0 (if l1 is null, set its addend to be 0)
    2. Instantiate addend2 var at l2 or 0 (if l2 is null, set its addend to be 0)
    3. Instantiate a sum var at 0;
    4. If addend1 + addend2 > 10
        1. sum = (addend1 + addend2 + leftover) % 10
        2. leftover = Math.floor((addend1 + addend2 + leftover) / 10) (floor division of 10)
    5. Else
        1. sum = addend1 + addend2 + leftover
    6. Create a node from the sum, and push to the nodeArray
    7. If l1 is truthy, increment l1
    8. If l2 is truthy, increment l2
4. Iterate over nodeArray up to the 2nd to last node
    1. Set the current node's next to point to the next node in the array
5. Return the first node in the nodeArray

Time complexity: O(n) - Where n is the length of the longer list. Since I'm iterating through the node lists once, at the same time until they are both falsy

Space complexity: O(n) - Where n is the length of the longer list. Since I'm adding the two lists together and storing the result nodes in the array to iterate over later, I'm storing the longer list in that array, since the longer of the two lists dictates how long the sum list will be

 */

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const nodeArray = [];
    let leftover = 0;

    while (l1 || l2) {
        const addend1 = l1 ? l1.val : 0;
        const addend2 = l2 ? l2.val : 0;
        let sum = 0;
        sum = (addend1 + addend2 + leftover) % 10;
        leftover = Math.floor((addend1 + addend2 + leftover) / 10);
        nodeArray.push(new ListNode(sum));
        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }

    if (leftover > 0) {
        nodeArray.push(new ListNode(leftover))
    }

    for (let i = 0; i < nodeArray.length - 1; i += 1) {
        nodeArray[i].next = nodeArray[i + 1];
    }

    return nodeArray[0];
};

/********************** Attempt #3 good easy, double traversal, use carry, continue until no more numbers to add with l1, l2, and carry ************************/

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    let carry = 0;
    const dummy = new ListNode();
    let tail = dummy;

    while (l1 || l2 || carry) {
        const addend1 = l1 ? l1.val : 0;
        const addend2 = l2 ? l2.val : 0;
        const sum = (addend1 + addend2 + carry) % 10;
        carry = Math.floor((addend1 + addend2 + carry) / 10);
        tail.next = new ListNode(sum);
        tail = tail.next;
        l1 = l1 ? l1.next : null;
        l2 = l2 ? l2.next: null;
    }

    return dummy.next;
};

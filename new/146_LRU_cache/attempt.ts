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

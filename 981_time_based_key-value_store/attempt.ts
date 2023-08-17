/*


hashmap:

{
    'foo': {
        1: 'bar',
        3: 'bar2',
        largest: 5,
        5: 'bar5'
    }
}


Pseudocode:
1. Instantiate a dictionary hashmap in the constructor
2. For set:
    1. Add the given key as the key, and set its value equal to another hashmap:
        1. Set the other hashmap to have a key that is the timestamp, and a value as the value input
        2. If the largest key doesn't exist in the object value of the given key, set it to be the current timestamp
            OR
           If the largest key does exist in the object value of the given key, but the current timestamp is greater than it, replace it with the current timestamp

3. For get:
    1. Search for the value in this.dict[key][timestamp]
        1. If it exists, return the value at that inner key
        2. If it doesn't exist, return the value at this.dict[key][largest]

Time complexity: O(1) - Since I'm using hashmaps which take O(1) to set and get
Space complexity: O(n) - Where n is the whole input array series after instantiating TimeMap, since I'm using a dictionary to hold each key and each timestamp at each key

*/

class TimeMap {
  dict: object;

  constructor() {
      this.dict = {};
  }

  set(key: string, value: string, timestamp: number): void {
      if (!this.dict[key]) {
          this.dict[key] = {}
      }

      this.dict[key][timestamp] = value;

      if (!this.dict[key]['largest'] || this.dict[key]['largest'] < timestamp) {
          this.dict[key]['largest'] = timestamp;
      }
  }

  get(key: string, timestamp: number): string {
      console.log(this.dict);
      if (this.dict[key][timestamp]) {
          return this.dict[key][timestamp];
      } else {
          if (this.dict[key]['largest'] && this.dict[key]['largest'] < timestamp) {
              return this.dict[key][this.dict[key]['largest']];
          } else {
              return "";
          }
      }
  }
}

/**
* Your TimeMap object will be instantiated and called as such:
* var obj = new TimeMap()
* obj.set(key,value,timestamp)
* var param_2 = obj.get(key,timestamp)
*/

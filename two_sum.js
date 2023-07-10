var twoSum = function(nums, target) { // nums = [2,7,11,15], target = 9
  const visited = {}; // {'2': 0}
  for (let i = 0; i < nums.length; i++) {
      const currentNum = nums[i]; // 7
      const difference = target - currentNum; // 2
      if (visited[difference] || visited[difference] === 0) { // True
          console.log(visited);
          return [visited[difference], i]; 
      } else {
          visited[currentNum] = i;
      }
  }
};

console.log(twoSum([2,2,2,2,7,11,15],9));

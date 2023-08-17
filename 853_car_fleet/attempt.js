/**
 * @param {number} target
 * @param {number[]} position
 * @param {number[]} speed
 * @return {number}


 position = [10,8,0,5,3], speed = [2,4,1,1,3]

 [[0,1], [3,3], [5,1], [8,4], [10,2]] Target = 12

                                    12
[0,1] [3,3] [5,1] [8,4] [10,2]       |

After 1 tick: 

                                    12
[1,1]       [6,1][6,1]    [12,4][12,2]|

The first car reaches 12 in 1 tick. The second car reaches 12 in 1 tick (along with the first car, so 1 car fleet).
The third car reaches 6 in 1 tick. The fourth car reaches 6 in 1 tick catching up with the third car. This causes the fourth car to slow down to 1 speed and become a car fleet with the third car.
The fifth car reaches 1 in 1 tick. It's now the same speed as the middle car fleet, and as such will never catch up to the middle car fleet.

In total, 3 car fleets will reach the finish line. Output: 3.

If I order the cars positions and speed by position along the track at the start, I can put that into a 2D array and iterate backwards.

On the first iteration, check the time to destination of the final car in the array (car closest to the target at the start)
    1. If the time to destination of that final car (target position - current position / speed) is greater than or equal to the time to destination of the car behind it, then I know the car behind it will never catch up. I can consider the current car to be its own fleet
    2. If the time to destination of that final car is less than the time to destination of the car behind it, I know the car behind it will catch up to the current car. I can consider them both part of a fleet, and leave out the car in front (since they are now one entity: a car fleet)
    3. Keep going until the array is empty, that means I've counted all cars and determined whether they'd be a fleet on their own, or become a fleet with the car behind it, prior to reaching the destination

Pseudocode:
1. Instantiate an empty array that'll hold the combined the positions and speeds into a 2D array
2. Iterate through the positions array and combine it and its speed into an array, then push that array into the empty array above
3. Sort the 2D array by position
4. Instantiate a car fleet variable starting at 0
5. While the 2D array has a length
    1. Pop the last car from the array and calculate its time to destination
    2. If the popped car has a time to destination that is less than the car behind it, or there are no other cars in the stack
        1. it'll arrive to destination before the car behind it, so it's its own car fleet. Add 1 to the car fleet variable
6. Return the car fleet variable

Time complexity: O(n log n) - since I need to sort the position and speed by position, it'll be at worst the sorting algorithm's level of time complexity, which is n logn.
Space complexity: O(n) - Since I create a 2D array that holds position/speed number of items in a 2D array

10
position =
[0,4,2]
speed =
[2,1,3]

[[0,2], [2,3], [4,1]]

 */
var carFleet = function(target, position, speed) {
  const stack = []; //  [[4,1]] ; 10
  for (let i = 0; i < position.length; i += 1) {
      stack.push([position[i], speed[i]]);
  }
  stack.sort((a, b) => a[0] - b[0]);
  
  let carFleets = 0; // 1

  while (stack.length) {
      if (stack.length === 1) {
          carFleets += 1;
          break;
      }
      const [firstCarPosition, firstCarSpeed] = stack.pop(); // 
      const [secondCarPosition, secondCarSpeed] = stack.pop(); // 
      const firstCarTTD = (target - firstCarPosition) / firstCarSpeed; // 
      const secondCarTTD = (target - secondCarPosition) / secondCarSpeed;// 

      // if the first car is the limiting factor for the second car, I need to get rid of the second car, not the first

      if (secondCarTTD <= firstCarTTD) { // if it takes the second car the same or less amount of time to get to the destination than the first, that means it'll form a car fleet with the first. So I can just push the first car back to the stack
          stack.push([firstCarPosition, firstCarSpeed]);
      } else { // if it takes the second car more time to get to the destination than the first, that means it WON'T form a car fleet, so they are two separate car fleets. The second is now the limiting factor for the cars behind it, potentially
          carFleets += 1;
          stack.push([secondCarPosition, secondCarSpeed]);
      }
  }

  return carFleets;
  
};

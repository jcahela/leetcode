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

/******************* Attempt #2 - easy ********************/

/*

I need to calculate the time to destination for each car

If a car in front has a time to destination greater than the car behind it, the car behind it will form a fleet with it

I can use a stack and order the cars from closest-to-destination to furthest-from-destination, then check if the top car will form a fleet with the car behind it (has a >= time to destination than the car behind it). If it does, I can pop out the car behind the top car, and put the top car back onto the stack, since it's now 1 fleet with the car behind it

If it has a smaller time to destination than the car behind it, that means the top car will be its own fleet, so I can add 1 to an output var

At the end of checking all the cars in the stack, I can add th remaining cars in the stack (cars that have formed fleets with cars behind it) to the output var, to get the total car fleets

[10,8,0,5,3]
[2,4,1,1,3]

Target = 12

Speed + position:
[[10,2], [8,4], [0,1], [5,1], [3,3]]

Sorted speed + position:
[[0,1]]

output = 2

0. Pop the top car from the stack
1. Does the popped car have a smaller time to destination than the top car (car behind it)?
    1. If so, it won't form a fleet, so keep the popped car out of the stack and add 1 to output
    2. If not, it will form a fleet either at or before the destination, so pop the next car from the stack, and push the first popped car back onto the stack

Keep checking the stack until it's got 1 left

Return output + 1

Pseudocode:
1. Instantiate an output var at 0
2. Instantiate a positionSpeed array at []
3. Iterate over position array
    1. Add the current position and the current speed to the positionSpeed array as a tuple
4. Instantiate a sorted array at positionSpeed.sort((a,b) => a[0] - b[0])
5. while the sorted stack has a length greater than 1
    1. Instantiate a topCar var at sorted.pop()
    2. Instantiate a nextCar var at sorted.pop()
    3. Instantiate a topCarTTD var at (target - topCar[0]) / topCar[1]
    4. Instantiate a nextCarTTD var at (target - nextCar[0]) / topCar[1]
    5. Check if topCarTTD is smaller than nextCarTTD
        1. If so,
            1. It won't form a fleet, so add nextCar back to sorted
            2. Add 1 to the output var
        2. If not
            1. It will form a fleet with the top car, so add topCar back to sorted
6. Return output + 1

Time complexity: O(n log n) - Since we have to sort the cars based on their position in order to calculate the TTD in the right order for determining car fleets
Space complexity: O(n) - Where n is the number of cars being evaluated, since we store a 2D array of n tuples to create the stack to verify TTD on

*/

// [ [ 0, 1 ] ]

function carFleet(target: number, position: number[], speed: number[]): number {
    let output = 0; // 2
    const positionSpeed = [];
    for (let i = 0; i < position.length; i += 1) {
        positionSpeed.push([position[i], speed[i]]);
    }
    const sorted = positionSpeed.sort((a,b) => a[0] - b[0]);

    while (sorted.length > 1) {
        const topCar = sorted.pop(); // [ 5, 1 ] 
        const nextCar = sorted.pop(); // 
        const topCarTTD = (target - topCar[0]) / topCar[1]; // (12 - 5) / 1 = 7
        const nextCarTTD = (target - nextCar[0]) / nextCar[1]; // (12 - 0) / 1 = 12

        if (topCarTTD < nextCarTTD) {
            sorted.push(nextCar);
            output += 1;
        } else {
            sorted.push(topCar);
        }
    }
    return output + 1;
};

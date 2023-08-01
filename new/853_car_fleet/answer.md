Time to Complete: 30m

Method: First, sort the positions with their corresponding speeds. By sorting the cars by position, I can see cars ordered in the one lane highway, from furthest away from the destination, to closest to the destination. This allows me to iterate backwards over the sorted array, and compare the fastest car with the one behind it. The main method of determining if a fleet will happen is by starting at the car closest to the destination, and calculating the amount of time it'll take it to reach the destination. This is done by doing the equation: (destination - position)/speed. If the car behind it has a faster time to destination (if (destination - position) / speed) is lower than the car in front of it), then that means it'll reach the destination quicker than the car that's in front of it. However, cars can't overlap, so I know for sure the car 2nd closest to the destination will become a fleet with the car 1st closest to the destination before or at the time they both reach the target. By starting at the car closest to the destination, knowing it could be slow enough to be the only fleet with all the rest of the cars behind it, I can use a stack data structure to store these "limiting" cars. Starting at the car closest to the destination, I push it onto the stack, then go to the 2nd closest car. By calculating their ETA, if the second closest car's ETA is faster than or equal to the closest car, I know they will overlap by the time they get to the destination, so I can ignore the current car (the limiting car is the one in front of it). Going to the 3rd closest car, I can do the same comparison. If the 3rd closest car's ETA is slower than the limiting car (1st closest car), I know it'll never become a fleet with the 1st car, so I push the 3rd closest car onto the stack. It'll now be the one to compare cars behind it with, to determine if they will become fleets with the 3rd car, or be fleets of their own with cars behind them.

Pseudocode: 
/*
Goal 1: Create a sorted, 2D array, which holds each position and their corresponding speed, and sorts ascending by position
1. Instantiate an empty array that will be sorted
2. Iterate over the positions array
    1. At each iteration, push the current position, and the speed at index i, as an array, into the empty array
3. Sort the 2D array by position once it has each car in it ([position, speed]): 2DArray.sort((a,b) => a[0] - b[0])

Goal 2: Find the limiting closer-cars using a stack
4. Once you have the sorted array, instantiate a stack that starts out as empty
5. Then, iterate over the 2D array backwards
    1. If the stack is empty, push the current car onto the stack, then continue;
    2. If the stack is not empty, pop the top car from the stack
        1. Calculate the time to destination for the top car on the stack: (target - position)/speed
        2. Calculate the time to destination for the current car at index i
        3. If the time to destination for the current car is less than or equal to the time to destination for the top car:
            1. That means the current car will "fleet up" with the car ahead of it, either prior to reaching the destination, or at the time of reaching the destination. Push only the car popped out of the top of the stack back onto the stack
        4. If the time to destination for the current car is greater than the time to destination for the top car:
            1. That means the current car will never "fleet up" with the car ahead of it. Push the car popped out of the top of the stack back onto the stack, then push the current car onto the stack
6. Return the length of the stack, that will hold all the "limiting variable" cars. These are cars that are fleets with cars before it, but not fleets with cars after it 
 */

Code: 
```js
var carFleet = function(target, position, speed) {
    const sortedCars = [];

    for (let i = 0; i < position.length; i++) {
        sortedCars.push([position[i], speed[i]]);
    }

    sortedCars.sort((a,b) => a[0] - b[0]); 

    const stack = [];

    for (let i = sortedCars.length - 1; i >= 0; i--) {
        if (!stack.length) {
            stack.push(sortedCars[i]);
        } else {
            const [stackPosition, stackSpeed] = stack[stack.length - 1];
            const [currentPosition, currentSpeed] = sortedCars[i];

            const stackCarETA = (target - stackPosition) / stackSpeed;
            const currentCarETA = (target - currentPosition) / currentSpeed;

            if (currentCarETA > stackCarETA) {
                stack.push([currentPosition, currentSpeed]);
            }
        }
    }

    return stack.length;
};
```

Time Complexity: O(nlogn)
Explanation: Since I'm sorting an array of n length which is nlogn time, that is the most expensive algorithm used, since after that I'm only iterating over that sorted array backwards once.

Space Complexity: O(n)
Explanation: Since I'm using a stack that will at worst contain n number of cars, each of which are its own fleet, if given an input n that is such that each car has successively faster time to destinations from the car furthest away to the car closest to, the destination.

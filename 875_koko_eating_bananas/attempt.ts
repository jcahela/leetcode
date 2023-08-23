/*

The minimum integer k will allow koko to eat all the bananas within h hours

She wants to eat as slowly as possible, so what's the slowest rate of bananas eaten per hour that allows her to eat all bananas within h hours?

First, I know the slowest koko could eat is 1 banana per hour
Next, I know the fastest koko could eat is the max banana pile in the bunch
    1. Since if the pile has less than k bananas, she eats them all and won't eat any more bananas during this hour, I know that the fastest she could eat all the piles is one pile per hour.
    2. Therefore, the minimum bananas needed to eat in order to eat one pile per hour is whatever the largest pile is, this would result in all other piles, and the largest pile, to be eaten within piles.length hours

So, between 1 and Math.max(...piles), the answer is somewhere in between

In order to find the answer in between, I could use binary search

First I need to make a function that, when given a k, determines if koko eats all piles within h hours. How would I decide this?
    1. Given a pile of 10 as the first pile, if k is 6, I subtract from the current pile
    2. Now pile is 4, if pile is still > 0, I subtract from the current pile
    3. So I make a variable that holds the current pile
    4. Then, while the current pile is > 0
        1. Subtract k from it
        2. Add to currentHours
    5. After the above loops, I have the number of hours it takes to eat all piles given a k
    6. Then I could return the hours with the given k
    7. If that hours is greater than h, I need a larger k
    8. If that hours is less than h, I need a smaller k

Pseudocode:
1. Instantiate a min variable at 1
2. Instantiate a max variable at Math.max(...piles)
3. Define a calculateHours function that takes in a k (mid between min and max), it can use the piles in the outer function, and the h in the outer function, because it won't mutate them
    1. In calculateHours, instantiate an hours var at 0
    2. Iterate over the piles
        1. In each iteration, store the current pile in a let variable currentPile
        2. While currentPile > 0
            1. Subtract k from current pile
            2. Add 1 to hours var
    3. Return hours var
4. While min <= max
    5. Calculate a mid: Math.ceil((min + max) / 2)
    6. If calculateHours(mid) > h
        1. min = mid + 1
    7. If calculateHours(mid) < h
        2. max = mid - 1
    8. Else
        1. Return mid
5. No need to return anything because there will always be an answer

Time complexity: O(n log*Max(p)) - Since I'm running the calculateHours function which is O(n) within a binary search on the max piles in the piles array, which is O(log Max(p)), the overall time complexity is O(n log*Max(p))

Space complexity: O(1) - Since I'm only using pointers and holding single points of data to subtract from from within calculateHours

*/

// [312884470]

// min = 1
// max = 100

// 101 / 2 = 50.5 = 50
// min = 1
// max = 49

// 25
// min = 1
// max = 24

// 17
// min = 1
// max = 16

// 8
// min = 1
// max = 7

// 4
// min = 1
// max = 3

// 2
// min = 1
// max = 2

// 1

function minEatingSpeed(piles: number[], h: number): number {
  let min = 1;
  let max = Math.max(...piles);
  let minK;

  function calculateHours(k: number): number { // 16
      let hours = 0; // 8
      for (let i = 0; i < piles.length; i += 1) {
          let currentPile = piles[i];
          hours += Math.ceil(currentPile / k);
      }
      return hours;
  }

  while (min <= max) {
      const mid = Math.ceil((min + max) / 2); // 16

      const midHours = calculateHours(mid); // 8
      // console.log(mid, midHours, h);
      // if (midHours > h) {
      //     min = mid + 1;
      // } else if (midHours < h) {
      //     max = mid - 1;
      //     minK = Math.min(minK, mid);
      // } else {
      //     return mid;
      // }

      // This is needed because there could be multiple k's that result in eating all piles within h hours, but only one of those k's is the minimum k, so once you find a k that is less than or equal to h, assign that to minK outside variable, and continue checking
      if (midHours <= h) {
          max = mid - 1;
          minK = mid;
      } else {
          min = mid + 1;
      }
  }

  return minK
};

/********************* Attempt #2 - easier, able to reason out better *********************/

/*

The most bananas koko can eat in an hour regardless of how much time she has is the largest pile in the piles array
if she eats that amount of bananas, she'll eat the rest of the piles within the number of hours as there are piles
This is the minimum time that she'll be given, because of the constraint piles.length <= h

The least bananas koko can eat in an hour regardless of how much time she has is 1. If given enough hours, that's the slowest

So, I need to find the minimum amount of bananas eaten per hour such that she eats all piles with h hours

Simplifying the problem, how would I find how many hours it'd take her to eat a specific piles list with a given k?

piles = [3,6,7,11]

k = 5

let hours = 0;

for (const pile of piles) {
    // if pile is > 5, say pile is 8, 8 / 5 = 1.3something which would take 2 hours to eat, so round up. If pile is 12, it's 2.2something, which takes 3 hours to eat, so round up
    hours += Math.ceil(pile / k);
}

return hours;

If between 1 and 30, and I choose 15 as the first one to check. If 15 is eaten within h hours, it could possibly not be the minimum, so if the hours to eat at k is >= h, I go left

const hoursAtM = calculateHours(k);

if (hoursAtM < h) {
    l = m + 1;
} else {
    r = m - 1;
    minimum = Math.min(mininum, k);
}

Pseudocode:
1. Instantiate a minimum var at Infinity (since I'm guaranteed to find a good k between 1 and max(piles), this will be replaced at some point during the binary search)
2. Instantiate an l var at 1
3. Instantiate an r var at Math.max(...piles);
4. Define a calculateHours function that takes in a k
    1. Instantiate an hours var at 0
    2. Iterate over piles
        1. At each pile, add to hours Math.ceil(pile / k);
    3. Return hours
5. While l <= r
    1. Calculate k at Math.ceil((l + r) / 2);
    2. Calculate hours at calculateHours(k)
    3. if hours > h needed
        1. Koko is eating too slow, so I need to check a larger k
        2. l = k + 1
    3. else (hours <= h needed)
        1. Either Koko is eating too fast and needs a smaller eating rate k checked, but is still within the hours h, so go down r = k - 1, or Koko is eating just right but there's a smaller k that is also just right (the minimum k that finishes all piles in h hours), so also go down r = k - 1. Either of these scenarios would replace k as the minimum, so go to step 2
        2. Set minimum to be the smaller between whatever it currently is, and the current k. (since if hours is greater than h, it'll be replaced by a smaller k whose calculated hours is equal to h, and since if it already is = h, I need to make sure the k I have that has the correct h is the smallest I've found, and store that one)
6. Return minimum

Time complexity: O(p + log(max(p))) - Since I'm getting the max pile with a linear operation of piles, and since I'm using binary search from 1 to the amount of that max pile (max(p)), the overall time complexity is O(p + log(max(p)))

Space complexity: O(1) - since I'm only using pointers

*/

// [3,6,7,11]
// h = 8
// 4

function minEatingSpeed(piles: number[], h: number): number {
    let minimum = Infinity;
    let l = 1;
    let r = Math.max(...piles); // 11

    function calculateHours(k) {
        let hours = 0; // 6
        for (const pile of piles) {
            hours += Math.ceil(pile / k);
        }
        return hours;
    }

    while (l <= r) {
        const k = Math.ceil((l + r) / 2); // 6
        const hours = calculateHours(k);

        if (hours <= h) {
            minimum = Math.min(minimum, k);
            r = k - 1;
        } else {
            l = k + 1;
        }
    }

    return minimum;
};

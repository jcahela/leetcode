Time to Complete: 15m

Method: Sliding window of a buy and sell index. Since I can only choose a single day to buy, and I must choose a different day in the future of that buy day to sell (only moving forward in the prices array), I can use a sliding window approach to determine the best day to buy and sell.

Pseudocode:
/*
1. Instantiate a buyIndex var at 0
2. Instantiate a sellIndex var at 1
3. Instantiate a profit var at 0
4. While sellIndex is less than the length of prices array
    1. Instantiate a buyPrice at prices[buyIndex]
    2. Instantiate a sellPrice at prices[sellIndex]
    3. First, check if buyPrice is greater than sellPrice
        1. If so, buyIndex = sellIndex
        2. And, sellIndex = buyIndex + 1
        3. Continue the loop
    4. Else (buyPrice is either less than or equal to sellPrice, so we can check the profit)
        1. profit = Math.max((sellPrice - buyPrice), profit)
        2. sellIndex + 1
5. Return profit
*/

Code:

```js
function maxProfit(prices: number[]): number {
    let buyIndex = 0;
    let sellIndex = 1;
    let profit = 0;

    while (sellIndex < prices.length) {
        const buyPrice = prices[buyIndex];
        const sellPrice = prices[sellIndex];

        if (buyPrice > sellPrice) {
            buyIndex = sellIndex;
            sellIndex = buyIndex + 1;
        } else {
            profit = Math.max((sellPrice - buyPrice), profit);
            sellIndex += 1;
        }
    }

    return profit;
};
```


Time Complexity: O(n)
Explanation: Since we're only iterating through the prices array once to find the best time to buy and sell using a sliding window

Space Complexity: O(1)
Explanation: Since we're only using pointers and a var holding a profit number

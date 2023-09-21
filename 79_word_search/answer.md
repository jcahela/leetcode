Time to Complete: 30m

Method: Using a type of backtracking, but more like traversing many branches of "paths" along a board, while looking for a path that can make the target word. First, you look for the first letter in the word, then you check its neighbors for the second letter in the word, etc. until you do or don't find the word.

Pseudocode:
/*
1. Instantiate a wordExists var at false
2. Instantiate a visited hashmap at {}
2. Define dfs function that takes in k: number, i: number, j: number
    // Base case
    1. if k === word.length
        1. set wordExists to true
        2. return
    2. if i or j are out of bounds below the min of rows/cols OR
       if i or j are out of bounds above the max of rows/cols OR
       if the letter at k in word isn't the same as the current letter I'm on in the board coordinates OR
       if I've already visited the coordinate I'm currently on
        1. return

    // Recursive case
    3. Mark the current coordinates as visited in the visited map
    4. Call dfs on k + 1, i, j + 1
    5. Call dfs on k + 1, i - 1, j
    6. Call dfs on k + 1, i, j - 1
    7. Call dfs on k + 1, i + 1, j
    8. Remove the coordinate I'm currently on from the visited map (since I'm recursing up at this point and won't have visited it after recursing up)

3. Loop through the board at m
    1. Loop through the board at n
        1. if the current letter at [m][n] === the first letter in word: call the dfs function, pass in k = 0, i = m, j = n
        2. if wordExists is true, break from this inner loop
    2. if wordExists is true, break from this outer loop

4. Return wordExists
*/


Code:

```js
function exist(board: string[][], word: string): boolean {
    let wordExists = false;
    let visited = {};

    function dfs(k: number, i: number, j: number) {
        if (k === word.length) {
            wordExists = true;
            return;
        }

        if (i < 0 || j < 0 ||
            i >= board.length || j >= board[0].length ||
            word[k] !== board[i][j] ||
            visited[`${i}${j}`]) {
                return;
            }
        
        visited[`${i}${j}`] = true;

        dfs(k + 1, i + 1, j);
        dfs(k + 1, i - 1, j);
        dfs(k + 1, i, j + 1);
        dfs(k + 1, i, j - 1);

        visited[`${i}${j}`] = false;
    }

    for (let m = 0; m < board.length; m += 1) {
        for (let n = 0; n < board[m].length; n += 1) {
            if (board[m][n].toLowerCase() === word[0].toLowerCase()) {
                dfs(0, m, n);
                if (wordExists) break;
            }

            if (wordExists) break;
        }
    }
    return wordExists;
};
```


Time Complexity: O(m * n * 4^l)
Explanation: Where m is the number of rows on the board, n is the number of cols in each row, and l is the length of the word I'm searching for. Since I'm making 4 branching paths at each letter of the word, as I continue searching for letters that match the word, it grows exponentially from those 4 choices, so it simplifies to 4^l

Space Complexity: O(h + v)
Explanation: Where h is the height of the decision tree, since I need that much space to recurse, and where v is the number of visited items before either recursing up or finding the word I'm looking for. If each path I check potentially has word - 1 matching letters, I would at the worst time have word - 1 visited keys, but as I recurse up I remove those keys, so it won't have any more than word.length space used for the visited map, which is adjacent to the recursion. 

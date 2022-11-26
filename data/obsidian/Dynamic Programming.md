## Definition

Proceeds by making a choice, then solving the subproblem that results from that choice. Combine the choice and subproblem solution.
Useful when problem instances contain overlapping subproblems.

## Procedure

1. Determine the subproblems we may get by making a choice
2. Define a [[Recurrence Relation]] for the optimal value of the objective function for the problem in terms of its optimal values for one or more subproblems
3. Determine the dimensions of the memo
4. Implement the algorithm (two ways)
   1. Memoization (recursion): Recursive approach that first checks the memeo to see if the solution has already been computed
   2. Iteration (dynamic programming): Loop over subproblems starting with base cases, then solve increasingly larger subproblems that uses subproblems that have already been computed
      1. Space may be saved by discarding never-to-be-used-again memo entries
5. Retrieve the optimal solution, as step 4 gives the value of the objective function for the optimal solution, but not the solution

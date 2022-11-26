## Greedy Algorithm Stays Ahead

A type of [[Proof by Induction (Math Induction)]]

### What?

Prove base case is true, then prove that at each state, the greedy choice is at least as good as the choice in the optimal solution.

### How?

You compare the list of choice made by the greedy algorithm to a similar list for an optimal solution.

### When?

A value to induce upon

### Examples

[[Interval Scheduling Problem]]

## Exchange Arguments

### What?

Prove for arbitrary solution $S$ and greedy solution $G$, you can modify $S$ slightly to get $S'$ such that:

- $S'$ is more similar to $G$ than $S$;
- $S'$ is at least as good a solution as $S$.

### How?

At each stage, change $S$ by swapping elements, or adding elements to a solution. Show that the result $S$ is is no worse than before, and with enough stages $S'$ approaches a solution that is as good as $G$.

### When?

When induction too hard :)

### Examples

[[Kruskal's Algorithm]]

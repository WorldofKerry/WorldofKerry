## Definition

Recursively breaks down a problem into two or more sub-problems of the same or related type, until they become simple enough to be solved directly.
Generally uses a [[Recurrence Relation]].
Note that recurrence relation for runtime bounds on a function is independent of the implementation of the function.
For example, while a function on binary numbers can do "jank arithemetic" on the values, we only care about what number of what size sub-problems each problem divides into, without worrying about the constant-time "jank arithemetic".

## Computing Runtime

- [[Master Theorem]]
- [[Recursion Tree]] with geometric series based on total work at each depth
- [[Proof by Induction (Math Induction)]]

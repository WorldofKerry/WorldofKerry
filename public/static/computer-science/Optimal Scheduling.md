General an exchange argument is best used to prove the correctness of the greedy solution.

> Prove for arbitrary solution $S$ and greedy solution $G$, you can modify $S$ slightly to get $S'$ such that: $S'$ is more similar to $G$ than $S$; $S'$ is at least as good a solution as $S$.

To prove the first part, contradiction can be used to show that $S$ still has 'inversions', and each step removes a 'inversion', making $S'$ closer to $G$.
To prove the second part, an inequality based on the pre-swap optimization value vs the post-swap optimization value can be used to show that $S'$ is at least as good as $S$.

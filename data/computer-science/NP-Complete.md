[[NP-Complete Problems]]

## Types of Problems

### Optimization Problem

Find solution $s$ that maximizes or minimizes a function $f(s)$

### Decision Problem

Given a parameter $k$, decide if there is a solution $s$ for which:

- $f(s) \le k$ or
- $f(s) \ge k$
  These problems are almost equivalent, as if we can solve the decision problem efficiently, then binary search on $k$ can be used to find the answer to the optimization problem; similarily for vice versa

## Sets P and NP

### P

The set of all problems for which we have an efficient solver.
A solver is:
Given a problem instance, the solver decides in polynomial time if the answer is "Yes" or "No".

### NP

The set of all problems for which we have an efficient verifier.
A verifier is:
For every problem instance whose answer is Yes, there is a "proof" that a verifier can check in polynomial time.

## NP-Hard

A subclass of problems that are at least as hard as the hardest problems in NP.

## NP-Complete

If the problem is in NP, and the problem can be used to simulate every other problem for which we can verify quickly that a solution is correct (Cook's Theorem)

### Proving Problem is NP-Complete

How to prove that $P$ is NP-complete?Pick a NP-complete problem $P_{NPC}$. Give a polynomial-time algorithm that transforms instances of $P_{NPC}$ into instances of $P$ with the same Yes/No answer.

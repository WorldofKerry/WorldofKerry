Let the intervals be described as shifts for easier understanding.
Mark all shifts as uncovered. While not all shifts are covered, consider the uncovered shift $v'$ with the earliest end time. Of the shifts that intersect with $v'$, add to the solution the shift $v$ with the latest end time. Mark as covered all shifts that intersect with $v$.
Proof for correctness can be done using two instances of the "stays ahead" method, by showing that the chosen subset a) overlaps with all other intervals, and b) contains as few intervals as possible.

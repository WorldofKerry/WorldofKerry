Uses restrictions on the classic [[Graph Colouring]] to make it possible to use a greedy algorithm.
Given a graph $G=(V,E)$, we want to colour each vertex with one of $k$ colours so that the two end points of any edge in $E$ receive different colours. Let $d$ be the maximum degree in the graph.
Special condition: assume that there is at least one vertex $v$ in $V$ with degree less than $d$.
The algorithm orders the verticies such that every vertex has at most $d-1$ neighbours among the proceeding, already-coloured verticies. This holds for verticies that have at least one neighbour among the following verticies in the ordering, or if the vertex is the one of the special vertex $v$. Thus having $v$ at the end of this ordering satisfies this condition.
A such procedure that does this algorithm is a BFS starting from $v$, then using the topological ordering of that tree.

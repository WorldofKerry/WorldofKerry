![[Pasted image 20221122003700.png]]
![[Pasted image 20221123163646.png]]

## Special Problems

### Uneven Splits

The base cases for the recursions will be ignored for easier notation, but should be included formally for completeness.
Let there be a problem in the form of $T(n)=AT(an/b)+CT(cn/d)+f(n)$, where $A, a, b, C, c, d$ are constants, $f(n)$ be a function of $n$, and $a/b < 1 \land c/d < 1 \land a/b \ne c/d$.
Construct a [[Recursion Tree]], and notice that the root of the tree does $f(n)$ work, and the second level does $Af(an/b)+Bf(cn/d)$, ...
Assume that $a/b > c/d$.
Then the last leaf of the recursion tree is at level $log_{b/a}n$. To get an upper bound, we can create a new function $G(n)=XG(an/b)+f(n)$, and solve for $X$ by using the equation $Xf(an/b)=Af(an/b)+Bf(cn/d)$ (the total work done at the second level).
Master's theorem can then be used to obtain a $\theta$ bound on $G$, which is the $O$ bound for $T$.
A similar argument can be made for the lower bound using $c/d$.

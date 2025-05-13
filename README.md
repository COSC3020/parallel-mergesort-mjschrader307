# Parallel Mergesort

Implement a parallel version of mergesort (both the original recursive and the
iterative in-place version from a previous exercise are fine). You may use any
parallelization framework or method.

I have not provided any test code, but you can base yours on test code from
other exercises. Your tests must check the correctness of the result of running
the function and run automatically when you commit through a GitHub action.

## Runtime Analysis

What is the span of the parallel program, in terms of worst-case $\Theta$? Hint:
It may help to consider the DAG of the parallel program.

---

Answer:

The time to sort the largest portion in this implementation (using regular mergesort) happens in similar time as normal mergesort, but because the work is distributed across the threads, it ends up being $\Theta(\frac{n}{k} \log(\frac{n}{k}))$

After all portions are sorted, there is a final merge of the portions, which looks at everything. This happens in $\Theta(n)$ time.

Therefore, the overall span is the big theta of the max of those parts: $\frac{n}{k} \log(\frac{n}{k})$ and $n$

---

**I certify that I have listed all sources used to complete this exercise, including the use
of any Large Language Models. All of the work is my own, except where stated
otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is
suspected, charges may be filed against me without prior notice.**
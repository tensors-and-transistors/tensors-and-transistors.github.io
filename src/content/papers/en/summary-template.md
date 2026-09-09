---
title: 'Template: how we summarize a paper'
description: 'The structure every summary in this section follows. All technical content is written in LaTeX: notation, definitions, equations and metrics.'
pubDate: 2026-09-03
tags: ['template']
translationKey: 'summary-template'
draft: false
---

> **Paper title** — Authors (Year)  
> Venue · [arXiv](https://arxiv.org) · [Code](https://github.com)

**Abstract.** A summary is not a translation of the abstract: it is a critical
reading that answers a single question, *what can I take from this and use?*. All
technical content in this section is written in $\LaTeX$: notation is defined
before it is used, every quantitative claim carries its magnitude, and every
result states what it is measured against.

---

## 1. The problem

Let $\mathcal{D} = \{(x_i, y_i)\}_{i=1}^{N}$ be the training set, with
$x_i \in \mathbb{R}^{d}$ and $y_i \in \mathcal{Y}$. Prior work minimizes the
empirical risk

$$
\hat{\mathcal{R}}(\theta) \;=\; \frac{1}{N} \sum_{i=1}^{N} \ell\!\left(f_\theta(x_i),\, y_i\right)
\tag{1}
$$

and fails when the class of interest is rare: if $\Pr[y = c] = \pi_c \ll 1$, that
class contributes $O(\pi_c)$ to the gradient and the optimum of $(1)$ is reached
by ignoring it.

> **Research question.** Can the error on the minority class be reduced without
> degrading overall performance or increasing inference cost?

## 2. Notation

| Symbol | Meaning |
|---|---|
| $x \in \mathbb{R}^{d}$ | input, dimension $d$ |
| $f_\theta$ | model with parameters $\theta \in \mathbb{R}^{p}$ |
| $\ell(\cdot,\cdot)$ | loss function |
| $n$ | sequence length |
| $\pi_c$ | frequency of class $c$ |

## 3. The core idea

The contribution in one sentence, then the mechanism. A regularization term
$\Omega$ weighted by $\lambda > 0$ is introduced:

$$
\mathcal{L}(\theta) \;=\; \underbrace{\hat{\mathcal{R}}(\theta)}_{\text{fit}}
\;+\; \lambda \, \underbrace{\Omega(\theta)}_{\text{regularization}} .
\tag{2}
$$

The attention block it is applied to is the standard one:

$$
\operatorname{Attention}(Q, K, V) \;=\; \operatorname{softmax}\!\left(\frac{QK^{\top}}{\sqrt{d_k}}\right) V ,
\qquad Q, K, V \in \mathbb{R}^{n \times d_k} .
\tag{3}
$$

The $\sqrt{d_k}$ divisor is not decorative. If $q, k$ have independent entries
with mean $0$ and variance $1$, then

$$
\mathbb{E}\!\left[q^{\top} k\right] = 0,
\qquad
\operatorname{Var}\!\left[q^{\top} k\right] = d_k ,
$$

so without normalization the argument of the $\operatorname{softmax}$ grows as
$\sqrt{d_k}$ and pushes it into a region where the gradient vanishes.

The cost remains quadratic in sequence length,

$$
\mathcal{O}\!\left(n^{2} d\right) \text{ in time}, \qquad \mathcal{O}\!\left(n^{2}\right) \text{ in memory},
$$

which is exactly the bound to watch when moving this onto hardware with a fixed
memory budget.

## 4. Results

What they measured, what they compared against, and by how much they improved.
With numbers, and with the metric defined. If Dice is reported over masks $A$
(predicted) and $B$ (reference):

$$
\mathrm{DSC}(A, B) \;=\; \frac{2\,\lvert A \cap B \rvert}{\lvert A \rvert + \lvert B \rvert} \in [0, 1] .
\tag{4}
$$

| Method | $\mathrm{DSC} \uparrow$ | Perplexity $\downarrow$ | Parameters |
|---|---|---|---|
| Baseline | — | — | — |
| Proposed | — | — | — |

Every improvement comes with its spread, $\mu \pm \sigma$ over $k$ seeds. A gap
smaller than $\sigma$ is not an improvement, it is noise.

## 5. Limitations

The section authors write short and we write long. What they did not test, where
it breaks, and which assumptions may not hold in your case: if $(1)$ assumes
i.i.d. samples and your data is a time series, the guarantee is gone.

**This is the most valuable section of the summary.** A paper with no stated
limitations is a warning sign, not a mark of quality.

## 6. What you can use today

Is there a public implementation? Does it run on accessible hardware — does the
$\mathcal{O}(n^{2})$ activation fit in the VRAM you actually have? What would you
need to adapt?

---

### How the notation is written

Inline, between `$`: attention scales as `$\mathcal{O}(n^2 d)$` →
$\mathcal{O}(n^2 d)$. In display mode, between `$$`, with `\tag{n}` to number the
equation so it can be cited in the text.

*Rule: if after reading the summary you still do not know whether the paper is useful to you, the summary failed.*

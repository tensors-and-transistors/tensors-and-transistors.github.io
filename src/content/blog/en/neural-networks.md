---
title: 'What a neural network actually is'
description: 'Not a brain and not magic: a function built by composition, parameters tuned by measuring the error, and a rule for assigning blame backwards.'
pubDate: 2026-09-16
tags: ['deep learning', 'fundamentals']
translationKey: 'what-is-a-neural-network'
draft: false
category: 'deep-learning'
---

> **Draft for layout.** The text below is a long article used to test how a real page scrolls: headings, lists, tables, code, formulas and quotes. The content is honest, but it will be rewritten.

If you have ever opened a course on neural networks, you have seen the drawing: circles in columns, arrows between them, and a caption explaining that this is "inspired by the brain". The drawing is not wrong, but it is the least useful way to start, because it invites you to reason about biology when what you have in front of you is arithmetic.

A neural network is a function. It takes numbers in and returns numbers out. What makes it special is not what it is, but how it is built and how its parameters are chosen.

## The brain metaphor, and why it gets in the way

The metaphor was useful in 1958, when Rosenblatt wanted to describe the perceptron to people who had never seen a machine that learned. Today it costs more than it gives. Someone who thinks "neurons" asks the wrong questions: whether the network is conscious, whether it thinks, whether it understands. Someone who thinks "function with adjustable parameters" asks the right ones: what shapes can it represent, how many parameters does it need, how do I know it converged.

If you come from hardware, there is a closer analogy. A network is a **signal chain**: several stages, each one applying a linear transformation and then a nonlinearity, exactly like a chain of amplifiers with saturation. Nobody asks whether an amplifier understands the music.

## A layer is a matrix multiplication

The basic unit is not a neuron, it is a layer. And a layer does one thing:

$$
h = \sigma(Wx + b)
$$

where $x \in \mathbb{R}^{n}$ is the input, $W \in \mathbb{R}^{m \times n}$ the weight matrix, $b \in \mathbb{R}^{m}$ the bias and $\sigma$ a nonlinear function applied element by element.

That is all. Everything else is repetition and bookkeeping.

```python
import torch.nn as nn

layer = nn.Linear(784, 128)
print(layer.weight.shape)  # torch.Size([128, 784])
print(layer.bias.shape)    # torch.Size([128])
```

Note the shape: `[128, 784]`, output first. It is a convention that catches everyone out at least once, and it comes from writing $Wx$ rather than $xW$.

### Why the nonlinearity is not optional

Suppose you drop $\sigma$ and stack two layers:

$$
h_2 = W_2 (W_1 x + b_1) + b_2 = (W_2 W_1) x + (W_2 b_1 + b_2)
$$

The product of two matrices is another matrix. Two layers without nonlinearity are *exactly* one layer with different numbers. You could stack a hundred and it would still be one. The nonlinearity is what makes depth mean something.

Which one you choose matters less than people think, but it is not free:

| Function | Range | Cost | Note |
|---|---|---|---|
| `relu` | $[0, \infty)$ | one comparison | the default; can "die" if the input is always negative |
| `tanh` | $(-1, 1)$ | exponential | centred at zero, saturates at both ends |
| `gelu` | $(-0.17, \infty)$ | exponential | smooth; what most transformers use today |
| `sigmoid` | $(0, 1)$ | exponential | for probabilities at the output, rarely in the middle |

The practical rule: `relu` while you are exploring, `gelu` when you are polishing. If you are on a microcontroller, `relu` is a comparison and the others are a table lookup.

## How it learns: the error and its gradient

Up to here the network computes, but it does not learn. Learning is choosing $W$ and $b$. And choosing has a very concrete meaning: minimising a number.

That number is the **loss**: a measure of how wrong the output is compared to the expected answer. For regression, the mean squared error:

$$
\mathcal{L} = \frac{1}{N}\sum_{i=1}^{N}\left(\hat{y}_i - y_i\right)^2
$$

For classification, cross-entropy. The choice is not cosmetic — it changes what the model considers a serious mistake — but the mechanism is the same in both cases.

With a loss in hand, the question becomes: **in which direction do I move each parameter so the loss goes down?** That is the gradient. And computing it has a name that sounds more complicated than it is.

### Backpropagation is the chain rule

If the loss depends on $W_2$, which depends on $h_1$, which depends on $W_1$, the derivative with respect to $W_1$ is a product of derivatives along the chain. That is the chain rule from first-year calculus, applied systematically.

What backpropagation adds is **not recomputing** what is already computed. Going backwards through the chain, each stage receives the accumulated derivative from the stages above and only has to multiply by its own. The cost of computing all the gradients ends up being roughly the cost of one forward pass.

```python
loss = criterion(model(x), y)
loss.backward()          # fills .grad on every parameter
optimizer.step()         # moves each one against its gradient
optimizer.zero_grad()    # forgetting this line is the classic bug
```

Three details that cost beginners hours:

- **`zero_grad()`**: gradients accumulate by default. Without that line you are adding up the gradients of every batch you have seen.
- **The learning rate**: it is the size of each step. Too large and it diverges; too small and it never arrives. It is the most important hyperparameter, by a distance.
- **The batch**: you do not compute the gradient over the whole dataset, you compute it over a sample. That noise is not a defect; it helps escape bad regions.

## What changes once the network is large

Everything above holds for a two-layer network and for one with a hundred billion parameters. What changes is what stops working.

1. **Memory stops being free.** Backpropagation needs the intermediate activations of the forward pass to compute the gradients. In a large model, those activations weigh more than the parameters themselves.
2. **Numerical precision starts to matter.** In `float16`, small gradients round to zero. Hence mixed precision and loss scaling.
3. **The bottleneck stops being compute and becomes memory bandwidth.** A modern GPU can do far more arithmetic than it can feed. Most optimisation work is about moving fewer bytes, not doing fewer multiplications.
4. **Initialisation stops being a detail.** With few layers you can start from almost anything. With many, a poor initialisation makes the signal vanish or explode before reaching the end.

> This is the point where deep learning stops being mathematics and starts being engineering — and where knowing what a cache is, or what a memory bus is, turns into an advantage rather than trivia.

## What to take away from here

- A network is a function built by composing simple stages: linear transformation plus nonlinearity.
- Without the nonlinearity, depth buys nothing at all.
- Learning is minimising a number, and the gradient says which direction to move.
- Backpropagation is the chain rule applied without repeating work.
- Everything difficult about large models is a memory and precision problem, not a conceptual one.

In the next article we take a single layer and follow it all the way down to what the hardware actually executes: which instructions the multiplication turns into, why the order of the axes decides the speed, and what a tensor core changes.

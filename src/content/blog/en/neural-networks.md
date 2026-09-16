---
title: 'What a neural network actually is'
description: 'Not a brain and not magic: a function built by composition, parameters tuned by measuring the error, and a rule for assigning blame backwards.'
pubDate: 2026-09-16
tags: ['deep learning', 'fundamentals']
translationKey: 'what-is-a-neural-network'
draft: false
category: 'deep-learning'
---

> **Template.** This article sets the structure the rest of this branch will follow. The prose is filler; the headings are final.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## The brain metaphor, and why it gets in the way

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam. **Eaque ipsa quae ab illo inventore** veritatis et quasi architecto beatae vitae dicta sunt explicabo.

## A layer is a matrix multiplication

Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet:

$$
h = \sigma(Wx + b)
$$

where $W \in \mathbb{R}^{m \times n}$ holds the weights, $b$ the bias and $\sigma$ a nonlinearity.

```python
import torch.nn as nn

layer = nn.Linear(784, 128)
print(layer.weight.shape)  # torch.Size([128, 784])
```

### Why the nonlinearity is not optional

Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur. Without it, stacking layers buys you nothing: a product of matrices is just another matrix.

| Function | Range | Cost |
|---|---|---|
| `relu` | $[0, \infty)$ | one comparison |
| `tanh` | $(-1, 1)$ | exponential |
| `gelu` | $(-0.17, \infty)$ | exponential |

## How it learns: the error and its gradient

Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit.

- Temporibus autem quibusdam et aut officiis debitis
- Rerum necessitatibus saepe eveniet ut et voluptates
- Repudiandae sint et molestiae non recusandae

## What changes once the network is large

Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.

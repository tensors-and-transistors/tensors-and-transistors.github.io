---
title: 'Qué es realmente una red neuronal'
description: 'Ni cerebro ni magia: una función por composición, parámetros que se ajustan midiendo el error y una regla para repartir la culpa hacia atrás.'
pubDate: 2026-09-16
tags: ['deep learning', 'fundamentos']
translationKey: 'what-is-a-neural-network'
draft: false
category: 'deep-learning'
---

> **Plantilla.** Este artículo marca la estructura que seguirán los de esta rama. El texto es relleno; los títulos son los definitivos.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## La metáfora del cerebro y por qué estorba

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam. **Eaque ipsa quae ab illo inventore** veritatis et quasi architecto beatae vitae dicta sunt explicabo.

## Una capa es una multiplicación de matrices

Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet:

$$
h = \sigma(Wx + b)
$$

donde $W \in \mathbb{R}^{m \times n}$ son los pesos, $b$ el sesgo y $\sigma$ una no linealidad.

```python
import torch.nn as nn

capa = nn.Linear(784, 128)
print(capa.weight.shape)  # torch.Size([128, 784])
```

### Por qué hace falta la no linealidad

Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur. Sin ella, apilar capas no añade nada: el producto de matrices es otra matriz.

| Función | Rango | Coste |
|---|---|---|
| `relu` | $[0, \infty)$ | 1 comparación |
| `tanh` | $(-1, 1)$ | exponencial |
| `gelu` | $(-0.17, \infty)$ | exponencial |

## Cómo aprende: el error y su gradiente

Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit.

- Temporibus autem quibusdam et aut officiis debitis
- Rerum necessitatibus saepe eveniet ut et voluptates
- Repudiandae sint et molestiae non recusandae

## Qué cambia cuando la red es grande

Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.

---
title: 'Qué es realmente un tensor'
description: 'Más allá de "un array de N dimensiones": qué estructura tiene en memoria, por qué el orden de los ejes decide el rendimiento y qué pasa cuando lo mueves a una GPU.'
pubDate: 2026-09-08
tags: ['deep learning', 'fundamentos']
translationKey: 'what-is-a-tensor'
draft: false
category: 'deep-learning'
---

> **Borrador.** El texto de abajo es relleno para revisar la maquetación. Los títulos marcan la estructura prevista; el contenido real llega después.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## La definición que te dan y la que necesitas

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam. **Eaque ipsa quae ab illo inventore** veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

## Cómo se ve en memoria

Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit:

```python
import torch

x = torch.zeros(2, 3, 4)
print(x.shape)    # torch.Size([2, 3, 4])
print(x.stride()) # (12, 4, 1)
```

Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.

### El stride y por qué importa

Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur:

| Operación | Copia memoria | Coste |
|---|---|---|
| `view()` | no | O(1) |
| `permute()` | no | O(1) |
| `contiguous()` | sí | O(n) |

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.

## Qué cambia en la GPU

Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.

- Temporibus autem quibusdam et aut officiis debitis
- Rerum necessitatibus saepe eveniet ut et voluptates
- Repudiandae sint et molestiae non recusandae

Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.

---

*Este artículo es un borrador de maquetación. El contenido definitivo se publicará próximamente.*

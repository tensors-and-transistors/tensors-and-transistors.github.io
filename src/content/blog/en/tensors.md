---
title: 'What a tensor actually is'
description: 'Beyond "an N-dimensional array": how it is laid out in memory, why axis order decides throughput, and what changes when you move it to a GPU.'
pubDate: 2026-09-08
tags: ['deep learning', 'fundamentals']
translationKey: 'what-is-a-tensor'
draft: false
---

> **Draft.** The text below is filler for reviewing the layout. The headings show the planned structure; the real content comes later.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## The definition you are given, and the one you need

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam. **Eaque ipsa quae ab illo inventore** veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

## How it looks in memory

Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit:

```python
import torch

x = torch.zeros(2, 3, 4)
print(x.shape)    # torch.Size([2, 3, 4])
print(x.stride()) # (12, 4, 1)
```

Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.

### Strides, and why they matter

Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur:

| Operation | Copies memory | Cost |
|---|---|---|
| `view()` | no | O(1) |
| `permute()` | no | O(1) |
| `contiguous()` | yes | O(n) |

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.

## What changes on a GPU

Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.

- Temporibus autem quibusdam et aut officiis debitis
- Rerum necessitatibus saepe eveniet ut et voluptates
- Repudiandae sint et molestiae non recusandae

Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.

---

*This article is a layout draft. Final content coming soon.*

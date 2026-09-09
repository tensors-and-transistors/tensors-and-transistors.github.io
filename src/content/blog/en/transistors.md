---
title: 'From transistor to instruction'
description: 'What sits between a MOSFET switching and a line of code running: logic gates, the datapath, and why clock speeds stopped climbing in 2005.'
pubDate: 2026-09-08
tags: ['hardware', 'fundamentals']
translationKey: 'transistor-to-instruction'
draft: false
category: 'hardware'
---

> **Draft.** The text below is filler for reviewing the layout. The headings show the planned structure; the real content comes later.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

## A switch with no moving parts

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. **Totam rem aperiam, eaque ipsa** quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.

## From logic gate to ALU

Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt.

```c
// A 1-bit adder, the brick every arithmetic unit is built from
void full_adder(int a, int b, int cin, int *sum, int *cout) {
    *sum  = a ^ b ^ cin;
    *cout = (a & b) | (cin & (a ^ b));
}
```

Ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.

### The energy budget

Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur:

| Operation | Relative energy | Notes |
|---|---|---|
| 8-bit integer add | 1× | baseline |
| 32-bit multiply | 30× | — |
| SRAM read | 50× | — |
| DRAM read | 1000× | dominates power |

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.

## Why clock speeds stopped climbing

Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit.

1. Temporibus autem quibusdam et aut officiis debitis
2. Rerum necessitatibus saepe eveniet ut et voluptates
3. Repudiandae sint et molestiae non recusandae

Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur.

---

*This article is a layout draft. Final content coming soon.*

---
title: 'Del transistor a la instrucción'
description: 'Qué hay entre un MOSFET conmutando y una línea de código ejecutándose: puertas lógicas, ruta de datos y por qué el reloj dejó de subir en 2005.'
pubDate: 2026-09-08
tags: ['hardware', 'fundamentos']
translationKey: 'transistor-to-instruction'
draft: false
---

> **Borrador.** El texto de abajo es relleno para revisar la maquetación. Los títulos marcan la estructura prevista; el contenido real llega después.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

## Un interruptor que no tiene partes móviles

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. **Totam rem aperiam, eaque ipsa** quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.

## De la puerta lógica a la ALU

Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt.

```c
// Un sumador de 1 bit, el ladrillo de toda la aritmética
void full_adder(int a, int b, int cin, int *sum, int *cout) {
    *sum  = a ^ b ^ cin;
    *cout = (a & b) | (cin & (a ^ b));
}
```

Ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.

### El presupuesto de energía

Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur:

| Operación | Energía relativa | Notas |
|---|---|---|
| Suma entera 8 bit | 1× | referencia |
| Multiplicación 32 bit | 30× | — |
| Lectura de SRAM | 50× | — |
| Lectura de DRAM | 1000× | domina el consumo |

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.

## Por qué el reloj dejó de subir

Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit.

1. Temporibus autem quibusdam et aut officiis debitis
2. Rerum necessitatibus saepe eveniet ut et voluptates
3. Repudiandae sint et molestiae non recusandae

Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur.

---

*Este artículo es un borrador de maquetación. El contenido definitivo se publicará próximamente.*

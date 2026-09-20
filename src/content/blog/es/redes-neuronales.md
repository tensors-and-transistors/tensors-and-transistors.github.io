---
title: 'Qué es realmente una red neuronal'
description: 'Ni cerebro ni magia: una función por composición, parámetros que se ajustan midiendo el error y una regla para repartir la culpa hacia atrás.'
pubDate: 2026-09-16
tags: ['deep learning', 'fundamentos']
translationKey: 'what-is-a-neural-network'
draft: false
category: 'deep-learning'
---

> **Borrador de maquetación.** El texto de abajo es un artículo largo que sirve para probar cómo se desplaza una página real: títulos, listas, tablas, código, fórmulas y citas. El contenido es honesto, pero se reescribirá.

Si alguna vez abriste un curso de redes neuronales, viste el dibujo: círculos en columnas, flechas entre ellos y un pie de figura que explica que esto está "inspirado en el cerebro". El dibujo no es falso, pero es la peor manera de empezar, porque invita a razonar sobre biología cuando lo que tienes delante es aritmética.

Una red neuronal es una función. Recibe números y devuelve números. Lo que la hace especial no es lo que es, sino **cómo está construida** y **cómo se eligen sus parámetros**.

## La metáfora del cerebro y por qué estorba

La metáfora fue útil en 1958, cuando Rosenblatt quería explicarle el perceptrón a gente que nunca había visto una máquina que aprendiera. Hoy cuesta más de lo que aporta. Quien piensa en "neuronas" se hace las preguntas equivocadas: si la red es consciente, si piensa, si entiende. Quien piensa en "función con parámetros ajustables" se hace las buenas: qué formas puede representar, cuántos parámetros necesita, cómo sé que convergió.

Si vienes del hardware tienes una analogía mejor. Una red es una **cadena de etapas de señal**: cada etapa aplica una transformación lineal y luego una no linealidad, igual que una cadena de amplificadores con saturación. A nadie se le ocurre preguntar si un amplificador entiende la música.

## Una capa es una multiplicación de matrices

La unidad básica no es la neurona, es la capa. Y una capa hace una sola cosa:

$$
h = \sigma(Wx + b)
$$

donde $x \in \mathbb{R}^{n}$ es la entrada, $W \in \mathbb{R}^{m \times n}$ la matriz de pesos, $b \in \mathbb{R}^{m}$ el sesgo y $\sigma$ una función no lineal aplicada elemento a elemento.

Eso es todo. El resto es repetición y contabilidad.

```python
import torch.nn as nn

capa = nn.Linear(784, 128)
print(capa.weight.shape)  # torch.Size([128, 784])
print(capa.bias.shape)    # torch.Size([128])
```

Fíjate en la forma: `[128, 784]`, la salida primero. Es una convención que confunde a todo el mundo al menos una vez, y viene de escribir $Wx$ y no $xW$.

### Por qué la no linealidad no es opcional

Supón que quitas $\sigma$ y apilas dos capas:

$$
h_2 = W_2 (W_1 x + b_1) + b_2 = (W_2 W_1) x + (W_2 b_1 + b_2)
$$

El producto de dos matrices es otra matriz. Dos capas sin no linealidad son *exactamente* una capa con otros números. Podrías apilar cien y seguirían siendo una. La no linealidad es lo que hace que la profundidad signifique algo.

Cuál elegir importa menos de lo que parece, pero no es gratis:

| Función | Rango | Coste | Nota |
|---|---|---|---|
| `relu` | $[0, \infty)$ | una comparación | la de por defecto; puede "morir" si la entrada siempre es negativa |
| `tanh` | $(-1, 1)$ | exponencial | centrada en cero, satura por los dos lados |
| `gelu` | $(-0.17, \infty)$ | exponencial | suave; la que usan casi todos los transformers |
| `sigmoid` | $(0, 1)$ | exponencial | para probabilidades a la salida, rara vez en medio |

La regla práctica: `relu` mientras exploras, `gelu` cuando pules. Si estás en un microcontrolador, `relu` es una comparación y las demás son una tabla.

## Cómo aprende: el error y su gradiente

Hasta aquí la red calcula, pero no aprende. Aprender es elegir $W$ y $b$. Y elegir tiene un significado muy concreto: **minimizar un número**.

Ese número es la **función de pérdida**: una medida de cuánto se equivoca la salida respecto a la respuesta esperada. Para regresión, el error cuadrático medio:

$$
\mathcal{L} = \frac{1}{N}\sum_{i=1}^{N}\left(\hat{y}_i - y_i\right)^2
$$

Para clasificación, la entropía cruzada. La elección no es cosmética —cambia qué considera el modelo un error grave— pero el mecanismo es el mismo en los dos casos.

Con una pérdida en la mano, la pregunta pasa a ser: **¿en qué dirección muevo cada parámetro para que la pérdida baje?** Eso es el gradiente. Y calcularlo tiene un nombre que suena más complicado de lo que es.

### La retropropagación es la regla de la cadena

Si la pérdida depende de $W_2$, que depende de $h_1$, que depende de $W_1$, la derivada respecto a $W_1$ es un producto de derivadas a lo largo de la cadena. Eso es la regla de la cadena de primero de cálculo, aplicada con orden.

Lo que añade la retropropagación es **no recalcular** lo ya calculado. Recorriendo la cadena hacia atrás, cada etapa recibe la derivada acumulada de las de arriba y solo tiene que multiplicar por la suya. El coste de obtener todos los gradientes acaba siendo parecido al de una pasada hacia adelante.

```python
perdida = criterio(modelo(x), y)
perdida.backward()       # rellena .grad en cada parámetro
optimizador.step()       # mueve cada uno en contra de su gradiente
optimizador.zero_grad()  # olvidar esta línea es el error clásico
```

Tres detalles que cuestan horas a quien empieza:

- **`zero_grad()`**: los gradientes se acumulan por defecto. Sin esa línea estás sumando los gradientes de todos los lotes que has visto.
- **La tasa de aprendizaje**: es el tamaño de cada paso. Demasiado grande y diverge; demasiado pequeña y no llega nunca. Es el hiperparámetro más importante, por mucho.
- **El lote**: no calculas el gradiente sobre todos los datos, sino sobre una muestra. Ese ruido no es un defecto; ayuda a escapar de zonas malas.

## Qué cambia cuando la red es grande

Todo lo anterior vale para una red de dos capas y para una de cien mil millones de parámetros. Lo que cambia es **qué deja de funcionar**.

1. **La memoria deja de ser gratis.** La retropropagación necesita las activaciones intermedias de la pasada hacia adelante para calcular los gradientes. En un modelo grande, esas activaciones pesan más que los propios parámetros.
2. **La precisión numérica empieza a importar.** En `float16`, los gradientes pequeños se redondean a cero. De ahí la precisión mixta y el escalado de la pérdida.
3. **El cuello de botella deja de ser el cálculo y pasa a ser el ancho de banda de memoria.** Una GPU moderna puede hacer muchas más cuentas de las que puede alimentar. Casi todo el trabajo de optimización consiste en mover menos bytes, no en hacer menos multiplicaciones.
4. **La inicialización deja de ser un detalle.** Con pocas capas puedes arrancar desde casi cualquier sitio. Con muchas, una mala inicialización hace que la señal se apague o explote antes de llegar al final.

> Este es el punto donde el deep learning deja de ser matemática y pasa a ser ingeniería — y donde saber qué es una caché, o qué es un bus de memoria, se convierte en una ventaja en vez de en un dato curioso.

## Qué llevarte de aquí

- Una red es una función construida componiendo etapas simples: transformación lineal más no linealidad.
- Sin la no linealidad, la profundidad no aporta absolutamente nada.
- Aprender es minimizar un número, y el gradiente dice hacia dónde moverse.
- La retropropagación es la regla de la cadena aplicada sin repetir trabajo.
- Todo lo difícil de los modelos grandes es un problema de memoria y de precisión, no de concepto.

En el siguiente artículo cogemos una sola capa y la seguimos hasta lo que ejecuta el hardware: en qué instrucciones se convierte la multiplicación, por qué el orden de los ejes decide la velocidad y qué cambia un tensor core.

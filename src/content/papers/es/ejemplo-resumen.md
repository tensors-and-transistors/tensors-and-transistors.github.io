---
title: 'Plantilla: cómo resumimos un paper'
description: 'La estructura que sigue cada resumen de esta sección. Todo el contenido técnico se escribe en LaTeX: notación, definiciones, ecuaciones y métricas.'
pubDate: 2026-09-03
tags: ['plantilla']
translationKey: 'summary-template'
draft: false
---

> **Título del paper** — Autores (Año)  
> Venue · [arXiv](https://arxiv.org) · [Código](https://github.com)

**Resumen.** Un resumen no es una traducción del abstract: es una lectura crítica
que responde a una sola pregunta, *¿qué me llevo de aquí que pueda usar?*. Todo el
contenido técnico de esta sección se escribe en $\LaTeX$: la notación se define
antes de usarse, cada afirmación cuantitativa lleva su magnitud y cada resultado
indica contra qué se compara.

---

## 1. El problema

Sea $\mathcal{D} = \{(x_i, y_i)\}_{i=1}^{N}$ el conjunto de entrenamiento, con
$x_i \in \mathbb{R}^{d}$ e $y_i \in \mathcal{Y}$. El trabajo previo optimiza el
riesgo empírico

$$
\hat{\mathcal{R}}(\theta) \;=\; \frac{1}{N} \sum_{i=1}^{N} \ell\!\left(f_\theta(x_i),\, y_i\right)
\tag{1}
$$

y falla cuando la clase de interés es minoritaria: si
$\Pr[y = c] = \pi_c \ll 1$, el término de $c$ aporta $O(\pi_c)$ al gradiente y el
óptimo de $(1)$ se alcanza ignorándola.

> **Pregunta de investigación.** ¿Se puede reducir el error en la clase minoritaria
> sin degradar el rendimiento global ni aumentar el coste de inferencia?

## 2. Notación

| Símbolo | Significado |
|---|---|
| $x \in \mathbb{R}^{d}$ | entrada, dimensión $d$ |
| $f_\theta$ | modelo con parámetros $\theta \in \mathbb{R}^{p}$ |
| $\ell(\cdot,\cdot)$ | función de pérdida |
| $n$ | longitud de secuencia |
| $\pi_c$ | frecuencia de la clase $c$ |

## 3. La idea central

La contribución, en una frase, y luego el mecanismo. Se introduce un término de
regularización $\Omega$ ponderado por $\lambda > 0$:

$$
\mathcal{L}(\theta) \;=\; \underbrace{\hat{\mathcal{R}}(\theta)}_{\text{ajuste}}
\;+\; \lambda \, \underbrace{\Omega(\theta)}_{\text{regularización}} .
\tag{2}
$$

El bloque de atención sobre el que se aplica es el estándar:

$$
\operatorname{Attention}(Q, K, V) \;=\; \operatorname{softmax}\!\left(\frac{QK^{\top}}{\sqrt{d_k}}\right) V ,
\qquad Q, K, V \in \mathbb{R}^{n \times d_k} .
\tag{3}
$$

El divisor $\sqrt{d_k}$ no es decorativo. Si $q, k$ tienen entradas independientes
de media $0$ y varianza $1$, entonces

$$
\mathbb{E}\!\left[q^{\top} k\right] = 0,
\qquad
\operatorname{Var}\!\left[q^{\top} k\right] = d_k ,
$$

así que sin normalizar, el argumento del $\operatorname{softmax}$ crece como
$\sqrt{d_k}$ y lo empuja a una región donde el gradiente se desvanece.

El coste sigue siendo cuadrático en la longitud de secuencia,

$$
\mathcal{O}\!\left(n^{2} d\right) \text{ en tiempo}, \qquad \mathcal{O}\!\left(n^{2}\right) \text{ en memoria},
$$

que es exactamente el límite que hace falta vigilar al llevarlo a hardware
con memoria acotada.

## 4. Resultados

Qué midieron, contra qué compararon y cuánto mejoraron. Con números y con la
métrica definida. Si se reporta el Dice sobre las máscaras $A$ (predicha) y
$B$ (referencia):

$$
\mathrm{DSC}(A, B) \;=\; \frac{2\,\lvert A \cap B \rvert}{\lvert A \rvert + \lvert B \rvert} \in [0, 1] .
\tag{4}
$$

| Método | $\mathrm{DSC} \uparrow$ | Perplejidad $\downarrow$ | Parámetros |
|---|---|---|---|
| Baseline | — | — | — |
| Propuesto | — | — | — |

Toda mejora se acompaña de su dispersión, $\mu \pm \sigma$ sobre $k$ semillas.
Una diferencia menor que $\sigma$ no es una mejora, es ruido.

## 5. Limitaciones

La sección que los autores escriben corta y nosotros escribimos larga. Qué no
probaron, bajo qué condiciones falla y qué supuestos puede que no se sostengan
en tu caso: por ejemplo, si $(1)$ asume muestras i.i.d. y tus datos son series
temporales, la garantía desaparece.

**Esta es la sección más valiosa del resumen.** Un paper sin limitaciones
declaradas es una señal de alarma, no de calidad.

## 6. Qué puedes usar hoy

¿Hay implementación pública? ¿Corre en hardware accesible — cabe la activación
$\mathcal{O}(n^{2})$ en la VRAM que tienes? ¿Qué tendrías que adaptar?

---

### Cómo se escribe la notación

En línea, entre `$`: la atención escala como `$\mathcal{O}(n^2 d)$` →
$\mathcal{O}(n^2 d)$. En bloque, entre `$$`, con `\tag{n}` para numerar la
ecuación y poder citarla en el texto.

*Regla: si después de leer el resumen no sabes si el paper te sirve, el resumen falló.*

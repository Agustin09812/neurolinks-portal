# 💳 Tarjetas de Prueba - Mercado Pago Sandbox

Este documento reúne el listado oficial de tarjetas de prueba de Mercado Pago para realizar simulaciones en el entorno de desarrollo (Sandbox). Puedes utilizar cualquier fecha de vencimiento futura (ej. `12/30`) y cualquier código de seguridad de 3 dígitos (ej. `123`).

---

## 🟢 1. Tarjetas que Simulan Pago Aprobado (APRO)

Estas tarjetas están configuradas por Mercado Pago para procesar y aprobar el pago de forma inmediata.

| Emisor | Número de Tarjeta | Nombre del Titular | CVV | Vencimiento |
| :--- | :--- | :--- | :--- | :--- |
| **Visa** | `4509 9535 6623 3704` | `APRO` | `123` | *Cualquier fecha futura* |
| **Mastercard** | `5031 7531 3543 5130` | `APRO` | `123` | *Cualquier fecha futura* |
| **American Express** | `3754 8631 3543 5138` | `APRO` | `1234` | *Cualquier fecha futura* |
| **Diners Club** | `3005 7531 3543 5130` | `APRO` | `123` | *Cualquier fecha futura* |
| **Cabal** | `6042 2731 3543 5130` | `APRO` | `123` | *Cualquier fecha futura* |
| **Naranja** | `5895 6231 3543 5130` | `APRO` | `123` | *Cualquier fecha futura* |

---

## 🟡 2. Tarjetas que Simulan Pago Pendiente (CONT)

Estas tarjetas simulan que el pago requiere validaciones adicionales (como análisis manual de fraude o pago fuera de línea) y queda en estado `pending`.

| Emisor | Número de Tarjeta | Nombre del Titular | CVV | Resultado Esperado |
| :--- | :--- | :--- | :--- | :--- |
| **Visa** | `4984 0626 5506 2840` | `CONT` | `123` | Queda pendiente de aprobación |
| **Mastercard** | `5031 7531 3543 5130` | `CONT` | `123` | Queda pendiente de aprobación |
| **American Express** | `3754 8631 3543 5138` | `CONT` | `1234` | Queda pendiente de aprobación |

---

## 🔴 3. Tarjetas que Simulan Pago Rechazado

Utiliza estas tarjetas para validar cómo reacciona tu portal ante errores de pago, límites de crédito excedidos o problemas de autenticación.

| Emisor | Número de Tarjeta | Nombre del Titular | CVV | Motivo del Rechazo |
| :--- | :--- | :--- | :--- | :--- |
| **Visa** | `4515 7277 8261 4658` | `FUNDS` | `123` | **Fondos insuficientes** (*cc_rejected_insufficient_amount*) |
| **Visa** | `4024 0071 0503 6240` | `CALL` | `123` | **Llamar al emisor** (*cc_rejected_call_for_authorize*) |
| **Visa** | `4517 6671 0503 6243` | `OTHER` | `123` | **Rechazo general** (*cc_rejected_other_reason*) |
| **Visa** | `4517 6271 0503 6241` | `SECURE` | `123` | **Código de seguridad inválido** (*cc_rejected_bad_filled_security_code*) |
| **Visa** | `4517 5771 0503 6248` | `DATE` | `123` | **Fecha de vencimiento inválida** (*cc_rejected_bad_filled_date*) |

---

## 💡 Instrucciones Adicionales para Pruebas Sandbox

> [!TIP]
> **Datos de Identificación (DNI / CUIL)**:
> Cuando el formulario de Mercado Pago te solicite el número de documento del titular, puedes completar con cualquier número ficticio de 8 dígitos de Argentina (ej. `11111111` o `99999999`).

> [!IMPORTANT]
> **Correo Electrónico**:
> Para realizar la simulación de pago, debes estar logueado en la pasarela con tu cuenta de **comprador de pruebas** (como `TESTUSER3688959288854853262` con contraseña `DOnzlO58Tr`) para asegurar la consistencia del entorno Sandbox.

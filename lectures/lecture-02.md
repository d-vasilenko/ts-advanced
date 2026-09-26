## Часть 2 из 7: Условные конструкции и Narrowing

## 🎯 Цель этой части

Научиться принимать решения в коде: условия, сравнения, логика. И понять одну из самых мощных фич TypeScript — **type narrowing** (сужение типов), которая отличает TS от обычного JavaScript и является мостом к продвинутой теории типов.

---

## 1. Операторы сравнения

### Строгое сравнение (всегда используй)

```typescript
===  // строгое равенство (значение И тип)
!==  // строгое неравенство
>    // больше
<    // меньше
>=   // больше или равно
<=   // меньше или равно
```

### Примеры

```typescript
5 === 5        // true
5 === "5"      // false (разные типы: number vs string)
5 !== 5        // false
5 !== "5"      // true
10 > 5         // true
10 < 5         // false
10 >= 10       // true
10 <= 9        // false
```

### Нестрогое сравнение (НИКОГДА не используй)

```typescript
==   // нестрогое равенство (с приведением типов)
!=   // нестрогое неравенство
```

### Почему `==` — зло

```typescript
5 == "5"       // true (строка "5" приводится к числу 5)
0 == false     // true (false приводится к 0)
"" == false    // true
null == undefined  // true (специальное правило)
0 == ""        // true
0 == "0"       // true
"" == "0"      // false (!!!)

// Транзитивность нарушена:
// Если a == b и b == c, то должно быть a == c
// Но: "" == 0, 0 == "0", а "" != "0"
```

**Правило:** Всегда используй `===` и `!==`. Это не просто стиль — это предотвращает реальные баги.

---

## 2. Логические операторы

```typescript
&&   // логическое И (AND)
||   // логическое ИЛИ (OR)
!    // логическое НЕ (NOT)
```

### Таблицы истинности

**AND (`&&`)** — true, только если ОБА операнда true:
```typescript
true && true    // true
true && false   // false
false && true   // false
false && false  // false
```

**OR (`||`)** — true, если ХОТЯ БЫ ОДИН операнд true:
```typescript
true || true    // true
true || false   // true
false || true   // true
false || false  // false
```

**NOT (`!`)** — инвертирует значение:
```typescript
!true   // false
!false  // true
```

### Практические примеры

```typescript
const age = 25;
const hasLicense = true;

// AND: оба условия должны быть true
if (age >= 18 && hasLicense) {
  console.log("Можно водить");
}

// OR: хотя бы одно условие должно быть true
const isWeekend = true;
const isHoliday = false;
if (isWeekend || isHoliday) {
  console.log("Выходной!");
}

// NOT: инверсия
const isLoggedIn = false;
if (!isLoggedIn) {
  console.log("Пожалуйста, войдите");
}
```

---

## 3. Truthiness и Falsy значения

В JavaScript/TypeScript **не только `true` и `false`** могут быть в условиях. Любое значение можно интерпретировать как boolean.

### Falsy значения (интерпретируются как `false`)

```typescript
false
0
-0
0n          // bigint ноль
""          // пустая строка
''
``          // пустой template literal
null
undefined
NaN
```

### Truthy значения (всё остальное — интерпретируется как `true`)

```typescript
true
1
-1
42
"hello"
"0"         // НЕ пустая строка — truthy!
"false"     // строка — truthy!
[]          // пустой массив — truthy!
{}          // пустой объект — truthy!
() => {}    // функция — truthy!
```

### Примеры

```typescript
const name = "";
if (name) {
  console.log("Есть имя");
} else {
  console.log("Имя пустое");  // ← сюда попадём
}

const age = 0;
if (age) {
  console.log("Есть возраст");
} else {
  console.log("Возраст 0 или не указан");  // ← сюда попадём (0 — falsy)
}

// ⚠️ Опасность:
const count = 0;
if (count) {
  // не выполнится, хотя count — валидное число
}

// ✅ Правильно:
if (count !== undefined && count !== null) {
  // выполнится
}
```

### Почему это важно

Falsy/truthy — частый источник багов. Особенно с `0`, `""`, `[]`, `{}`.

**Правило:**
- Если хочешь проверить "есть ли значение" — используй явные сравнения
- Если хочешь проверить "не null/undefined" — используй `!= null` (единственный случай, где `!=` допустим)

```typescript
// ❌ Плохо
if (value) { ... }  // не сработает для 0, "", false

// ✅ Хорошо
if (value !== undefined && value !== null) { ... }
// или короче:
if (value != null) { ... }  // ловит и null, и undefined
```

---

## 4. Условные конструкции

### if / else if / else

```typescript
const score = 75;

if (score >= 90) {
  console.log("Отлично");
} else if (score >= 70) {
  console.log("Хорошо");
} else if (score >= 50) {
  console.log("Удовлетворительно");
} else {
  console.log("Неудовлетворительно");
}
```

### Тернарный оператор

Короткая форма `if/else` для простых случаев:

```typescript
const age = 20;
const status = age >= 18 ? "взрослый" : "ребёнок";
// status: "взрослый"

// Эквивалент:
let status2;
if (age >= 18) {
  status2 = "взрослый";
} else {
  status2 = "ребёнок";
}
```

**Когда использовать:**
- ✅ Для простых выражений (одно условие, два значения)
- ❌ Для сложной логики (используй `if/else`)

### Switch / case

```typescript
const day = "Monday";

switch (day) {
  case "Monday":
  case "Tuesday":
  case "Wednesday":
  case "Thursday":
  case "Friday":
    console.log("Будний день");
    break;
  case "Saturday":
  case "Sunday":
    console.log("Выходной");
    break;
  default:
    console.log("Неизвестный день");
}
```

**Важно:** не забудь `break`, иначе выполнится следующий case (fall-through).

**В TypeScript:** switch с exhaustiveness checking — это мост к pattern matching. Если ты не обработал все случаи, TS может предупредить (с правильной настройкой).

---

## 5. Short-circuit evaluation (короткое замыкание)

JavaScript **не всегда вычисляет оба операнда** логических операторов.

### AND (`&&`)

```typescript
a && b
```
- Если `a` — falsy, `b` **не вычисляется**, результат — `a`
- Если `a` — truthy, результат — `b`

```typescript
const user = null;
const name = user && user.name;
// user — falsy (null), user.name НЕ вычисляется
// name = null

const user2 = { name: "Денис" };
const name2 = user2 && user2.name;
// user2 — truthy, вычисляется user2.name
// name2 = "Денис"
```

**Практическое применение:** безопасный доступ к свойствам (до опциональной цепочки `?.`)

### OR (`||`)

```typescript
a || b
```
- Если `a` — truthy, `b` **не вычисляется**, результат — `a`
- Если `a` — falsy, результат — `b`

```typescript
const username = "";
const displayName = username || "Аноним";
// username — falsy (пустая строка), вычисляется "Аноним"
// displayName = "Аноним"

const username2 = "Денис";
const displayName2 = username2 || "Аноним";
// username2 — truthy, "Аноним" НЕ вычисляется
// displayName2 = "Денис"
```

**Практическое применение:** значения по умолчанию.

### Опасность `||` с falsy значениями

```typescript
const count = 0;
const displayCount = count || 100;
// count — falsy (0), поэтому displayCount = 100
// Но 0 — валидное значение!

// ✅ Правильно: используй ?? (nullish coalescing)
const displayCount2 = count ?? 100;
// ?? заменяет только null и undefined, не 0 или ""
// displayCount2 = 0
```

---

## 6. Type Narrowing (сужение типов) — КРИТИЧЕСКИ ВАЖНО

Это одна из самых мощных фич TypeScript. TS **автоматически сужает тип** внутри блоков кода на основе проверок.

### Пример 1: Проверка на undefined

```typescript
function printLength(str: string | undefined) {
  // Здесь str: string | undefined
  // console.log(str.length);  // ❌ Ошибка: str может быть undefined
  
  if (str !== undefined) {
    // Здесь str: string (TS сузил тип!)
    console.log(str.length);  // ✅ OK
  }
}
```

### Пример 2: typeof

```typescript
function process(value: string | number) {
  // value: string | number
  
  if (typeof value === "string") {
    // value: string (TS сузил тип!)
    console.log(value.toUpperCase());
  } else {
    // value: number (TS сузил тип!)
    console.log(value.toFixed(2));
  }
}
```

### Пример 3: instanceof

```typescript
class Dog {
  bark() { console.log("Гав!"); }
}
class Cat {
  meow() { console.log("Мяу!"); }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    // animal: Dog
    animal.bark();
  } else {
    // animal: Cat
    animal.meow();
  }
}
```

### Пример 4: in operator

```typescript
interface Bird { fly(): void; }
interface Fish { swim(): void; }

function move(animal: Bird | Fish) {
  if ("fly" in animal) {
    // animal: Bird
    animal.fly();
  } else {
    // animal: Fish
    animal.swim();
  }
}
```

### Пример 5: Discriminated Unions (самый важный паттерн!)

```typescript
interface Circle {
  kind: "circle";  // discriminator (литеральный тип)
  radius: number;
}

interface Square {
  kind: "square";  // discriminator
  side: number;
}

type Shape = Circle | Square;

function area(shape: Shape) {
  // shape: Circle | Square
  
  switch (shape.kind) {
    case "circle":
      // shape: Circle (TS сузил тип по discriminator!)
      return Math.PI * shape.radius ** 2;
    case "square":
      // shape: Square
      return shape.side ** 2;
  }
}
```

**Почему это важно:**
- Discriminated unions — основа для моделирования состояний (Type-State pattern, Этап 1)
- Это прямой мост к **алгебраическим типам данных (ADT)** в ФП (Этап 1)
- Это основа для **зависимых типов** в Lean 4 (Этап 6)

---

## 7. User-defined Type Guards

Ты можешь создать свою функцию для сужения типов:

```typescript
interface Cat { meow(): void; }
interface Dog { bark(): void; }

// User-defined type guard
function isCat(animal: Cat | Dog): animal is Cat {
  // animal is Cat — это type predicate
  return (animal as Cat).meow !== undefined;
}

function makeSound(animal: Cat | Dog) {
  if (isCat(animal)) {
    // animal: Cat (TS поверил твоему type guard)
    animal.meow();
  } else {
    // animal: Dog
    animal.bark();
  }
}
```

**Синтаксис:** `parameterName is Type` — это **type predicate**.

---

## 8. Exhaustiveness Checking

TypeScript может проверить, что ты обработал **все возможные случаи**:

```typescript
type Status = "success" | "error" | "loading";

function handleStatus(status: Status) {
  switch (status) {
    case "success":
      console.log("Успех");
      break;
    case "error":
      console.log("Ошибка");
      break;
    // Забыли "loading"!
  }
}

// С exhaustiveness checking:
function assertNever(x: never): never {
  throw new Error("Unexpected value: " + x);
}

function handleStatus2(status: Status) {
  switch (status) {
    case "success":
      console.log("Успех");
      break;
    case "error":
      console.log("Ошибка");
      break;
    default:
      assertNever(status);  // ❌ Ошибка: Status не присваивается never
  }
}
```

Если добавишь новый вариант в `Status`, TS покажет ошибку в `handleStatus2`. Это **защита от забывчивости**.

---

## 9. Типичные ошибки новичков

### Ошибка 1: Использование `==` вместо `===`

```typescript
// ❌ Плохо
if (x == 5) { ... }

// ✅ Хорошо
if (x === 5) { ... }
```

### Ошибка 2: Забыть `break` в switch

```typescript
// ❌ Плохо — fall-through
switch (day) {
  case "Monday":
    console.log("Понедельник");
  case "Tuesday":  // выполнится и это!
    console.log("Вторник");
    break;
}

// ✅ Хорошо
switch (day) {
  case "Monday":
    console.log("Понедельник");
    break;
  case "Tuesday":
    console.log("Вторник");
    break;
}
```

### Ошибка 3: Falsy trap с `||`

```typescript
// ❌ Плохо
const count = 0;
const display = count || 100;  // display = 100, хотя count = 0

// ✅ Хорошо
const display = count ?? 100;  // display = 0
```

### Ошибка 4: Игнорирование type narrowing

```typescript
// ❌ Плохо
function process(value: string | number) {
  console.log(value.length);  // ❌ Ошибка: number не имеет length
}

// ✅ Хорошо
function process(value: string | number) {
  if (typeof value === "string") {
    console.log(value.length);  // ✅ OK
  }
}
```

---

## 10. Связь с будущими темами курса

| Сейчас (Модуль 0.1) | Будущее |
|---------------------|---------|
| `if/else` | **Pattern matching** в Rust (Этап 4) |
| `switch/case` | **Exhaustiveness checking** (Этап 1) |
| Discriminated unions | **ADT** (Option, Result) в ФП (Этап 1) |
| Type narrowing | **Dependent types** в Lean 4 (Этап 6) |
| Type guards | **Subtype checking** в теории типов (Этап 6) |
| `===` vs `==` | **Soundness** системы типов (Этап 6) |

Type narrowing — это **простейшая форма flow-sensitive typing**, которая изучается в теории типов. То, что ты делаешь сейчас, — это фундамент для понимания **Curry-Howard Isomorphism**.

---

## 11. Вопросы для самопроверки

Ответь на эти вопросы (можно мысленно, можно письменно):

1. Что выведет `console.log(0 == "")`? Почему?
2. Что выведет `console.log([] == false)`? Почему?
3. В чём разница между `||` и `??`? Приведи пример, где `||` даст неправильный результат.
4. Что такое type narrowing? Приведи пример.
5. Что такое discriminated union? Зачем нужен discriminator?
6. Что такое exhaustiveness checking? Как его реализовать?
7. Что выведет этот код?
```typescript
const user = null;
const name = user && user.name;
console.log(name);
```
8. Почему `if (count)` — плохая проверка для числа `count`?

---

## 12. Практическое задание (мини)

Напиши функцию `categorizeNumber(n: number): string`, которая:
- Возвращает `"negative"`, если `n < 0`
- Возвращает `"zero"`, если `n === 0`
- Возвращает `"positive"`, если `n > 0`

**Примеры:**
```typescript
categorizeNumber(-5);  // "negative"
categorizeNumber(0);   // "zero"
categorizeNumber(10);  // "positive"
```

**Дополнительно:** напиши функцию `safeDivide(a: number, b: number): number | "error"`, которая:
- Возвращает результат деления, если `b !== 0`
- Возвращает строку `"error"`, если `b === 0`

---

## 🎯 Что дальше

Когда ты уверенно ответил на все вопросы и выполнил мини-задание, скажи **"готов к части 3"**, и я дам следующую тему: **Циклы и инварианты**.

Если есть вопросы по этой части — задавай, разберём.
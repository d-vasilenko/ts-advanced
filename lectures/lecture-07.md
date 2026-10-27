
**Модуль 0.2: Алгоритмы и структуры данных (база)**

Поздравляю! Ты официально перешел от "учу синтаксис" к "учусь решать задачи". Это фундамент для всех будущих собеседований и системного мышления.

## 📖 Теория Часть 1: Big O нотация и базовые структуры данных

### 🎯 Цель этой части

Научиться оценивать **эффективность** алгоритмов. Понимать, почему один код работает за 1 миллисекунду, а другой — за 100 секунд, даже если оба дают правильный результат.

---

### 1. Что такое Big O нотация?

Big O описывает, **как растет время выполнения (или использование памяти)** алгоритма при увеличении размера входных данных.

**Пример:**
```typescript
// O(1) — константное время
function getFirst(arr: number[]): number {
  return arr[0]; // Всегда 1 операция, независимо от размера массива
}

// O(n) — линейное время
function findMax(arr: number[]): number {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}

// O(n²) — квадратичное время
function hasDuplicate(arr: number[]): boolean {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}
```

**Почему это важно:**
- `O(1)` — мгновенно, даже для миллиарда элементов
- `O(n)` — линейно, для 1 млрд элементов — 1 млрд операций
- `O(n²)` — катастрофически медленно, для 1 млрд элементов — 10¹⁸ операций (это годы!)

---

### 2. Базовые структуры данных

#### Массивы (Arrays)
- **Доступ по индексу**: `O(1)`
- **Поиск**: `O(n)`
- **Вставка в конец**: `O(1)` (амортизированно)
- **Вставка в начало/середину**: `O(n)` (нужно сдвинуть все элементы)

#### Хэш-таблицы (Map, Set, объекты)
- **Доступ по ключу**: `O(1)` в среднем
- **Вставка**: `O(1)`
- **Поиск**: `O(1)`

**Это самый мощный инструмент для оптимизации!** Если ты видишь `O(n²)` — подумай, можно ли использовать хэш-таблицу для сведения к `O(n)`.

#### Стеки (Stack) — LIFO (Last In, First Out)
- **Push** (добавить в конец): `O(1)`
- **Pop** (убрать с конца): `O(1)`
- **Peek** (посмотреть последний): `O(1)`

**Применение:** валидация скобок, undo/redo, обход деревьев (DFS).

#### Очереди (Queue) — FIFO (First In, First Out)
- **Enqueue** (добавить в конец): `O(1)`
- **Dequeue** (убрать с начала): `O(1)` (если использовать linked list)

**Применение:** обход графов (BFS), обработка задач по приоритету.

---

### 3. Базовые алгоритмы

#### Линейный поиск — `O(n)`
```typescript
function linearSearch(arr: number[], target: number): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}
```

#### Бинарный поиск — `O(log n)` (требует отсортированный массив!)
```typescript
function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  
  return -1;
}
```

**Почему `O(log n)`?** На каждом шаге мы делим массив пополам. Для массива из 1 млрд элементов нужно всего ~30 шагов!

---

### 4. Вопросы для самопроверки

1. Какая сложность у этого кода?
```typescript
function sum(arr: number[]): number {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}
```

2. Какая сложность у этого кода?
```typescript
function printPairs(arr: number[]): void {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      console.log(arr[i], arr[j]);
    }
  }
}
```

3. Какую структуру данных ты бы использовал для проверки, есть ли дубликаты в массиве за `O(n)`?

4. Почему бинарный поиск быстрее линейного для больших массивов?

---

### 5. Практическое задание (мини)

#### Задание 1: Анализ сложности
Определи Big O сложность для этих функций:

```typescript
// A
function double(arr: number[]): number[] {
  return arr.map(x => x * 2);
}

// B
function printAllPairs(arr: number[]): void {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      console.log(arr[i], arr[j]);
    }
  }
}

// C
function findMissing(arr: number[]): number {
  const n = arr.length + 1;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = arr.reduce((sum, x) => sum + x, 0);
  return expectedSum - actualSum;
}
```

#### Задание 2: Оптимизация
Дана функция с `O(n²)` сложностью. Оптимизируй её до `O(n)` с использованием хэш-таблицы:

```typescript
function hasPairWithSum(arr: number[], target: number): boolean {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) return true;
    }
  }
  return false;
}
```

**Подсказка:** Если ты знаешь `target` и `arr[i]`, то какое число ты ищешь? Как быстро проверить, есть ли оно в массиве?

---

### 🎯 Что дальше

Когда ты ответишь на 4 вопроса и выполнишь 2 задания, мы разберем их. После этого перейдем к **первым задачам на LeetCode** (уровень Easy).

Жду твои ответы! 🚀
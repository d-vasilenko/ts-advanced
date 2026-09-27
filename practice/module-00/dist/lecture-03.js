function sum(n) {
    let sum = 0;
    let i = 1;
    while (i <= n) {
        sum = sum + i;
        i = i + 1;
    }
    return sum;
}
console.log(sum(4)); // 1 + 2 + 3 + 4 = 10; инватиант это sum всегда равен сумме от 1 до i-1, sum = 0 and i <= 1 на старте
// sum = 1 + 2 + ... + (i - 1) - в переменной sum всегда храниться честный результат сложения, начиная с 1 и заканчивая числом, которое на 1 меньше чем i.
/**
 *
1. В чём разница между `while` и `do-while`? Приведи пример, где `do-while` подходит лучше.
do-while выполниться хотябы один раз, потому, что сначала выполниться тело цикла, а потом будет проверка условия выхода из цикла, while - сначала проверка условия (может не пройти и тело не выполниться) потом тело.
2. Что выведет этот код?
```typescript
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  if (i === 4) break;
  console.log(i);
}
```
0 1 3

3. Сформулируй инвариант цикла для этой функции:
```typescript
function factorial(n: number): number {
  let result = 1;
  let i = 1;
  while (i <= n) {
    result = result * i;
    i = i + 1;
  }
  return result;
}
```
инвариант - в переменной result всегда находиться честное произведение result на (i - 1) и i >= 1

4. Найди вариант (вариант завершения) для этого цикла:
```typescript
let x = 100;
while (x > 1) {
  x = Math.floor(x / 2);
}
```
variant при x = 1.5625 с Math.floor(1.5625) x будет равен 1

5. В чём ошибка в этом коде?
```typescript
const arr = [1, 2, 3, 4, 5];
for (let i = 0; i <= arr.length; i++) {
  console.log(arr[i]);
}
```
i <= arr.length при i = 5 будет arr[5] выход за предел массива undefined

6. Что выведет этот код? Почему?
```typescript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```
3 3 3 это асинхронный код который будет выполняться после того как выполниться синхронный к тому времени переменная i будет равна 3 а так как у var функциональный скоуп она будет равна 3 что и выведеться в консоль три раза.

7. Сформулируй инвариант цикла для функции, которая находит максимум в массиве:
```typescript
function findMax(arr: number[]): number {
  if (arr.length === 0) throw new Error("Empty array");
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}
```
инвариант гарантирует что в массиве arr находиться максимальный эллемент max и что массив arr не пустой

8. Сколько итераций выполнится в этом коде?
```typescript
let count = 0;
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 3; j++) {
    count++;
  }
}

```
5 * 3 = 15 раз
*/
function sumRange(a, b) {
    let sum = 0;
    for (let i = a; i <= b; i++) {
        sum += i;
    }
    return sum;
}
console.log(sumRange(1, 5)); // 15 (1 + 2 + 3 + 4 + 5)
console.log(sumRange(3, 7)); // 25 (3 + 4 + 5 + 6 + 7)
console.log(sumRange(-2, 2)); // 0 (-2 + -1 + 0 + 1 + 2)
// инвариант sum эт сумма чисел от a  до b включительно и i <= b
function gcd(a, b) {
    while (b != 0) {
        let tmp = b;
        b = a % b;
        a = tmp;
    }
    return a;
}
console.log(gcd(12, 8)); // 4
console.log(gcd(17, 13)); // 1
console.log(gcd(100, 25)); // 25
console.log(gcd(0, 5)); // 5
export {};

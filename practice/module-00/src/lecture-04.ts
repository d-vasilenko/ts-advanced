/**
 * 
1. В чем разница между `function foo() {}` и `const foo = () => {}` с точки зрения hoisting (всплытия)?
Первая всплывает в начало скоупа вторая (стрелочная) нет. Если точно, то всплывут обе но стрелочная не будет инициализированна будет находиться в зоне Temporal Dead
2. Что выведет этот код и почему?
   ```typescript
   let x = 10;
   function test() {
     console.log(x);
     let x = 20;
   }
   test();
   ```
будет ошибка, let x всплывет до console.log() но будет находиться в Temporal Dead зоне и  не будет инициализирован внешную переменную console.log не прочитает, потому что runtime увидит локальную переменную всплывшую но она не будет инициализированна.

3. Является ли эта функция чистой? Объясни почему (да или нет, с аргументацией):
   ```typescript
   function getUserAge(user: { name: string, age: number }): number {
     user.age += 1;
     return user.age;
   }
   ```
Нет это не чистая функцию, потому что мутируеться объект параметр (user.age += 1)

4. Является ли эта функция чистой?
   ```typescript
   function getMax(a: number, b: number): number {
     return a > b ? a : b;
   }
   ```
Да это чистая функция, потому, что примитивы в отличии от объектов копируются (передаются по значению), а объекты передаются по ссылке, кстати примитивы храняться на стеке (stack), а в части объектов на стеке храниться ссылка на объект а сам объект храниться в куче (heap) 

5. Как замыкание помогает реализовать инкапсуляцию (сокрытие данных)? Приведи короткий концептуальный пример.
interface Count {
  count(n: number): void;
  get(): number;
}
const counter = function(initial: number): Count {
  let count = initial;
  return {
    count(n) {
      count += n;
    },
    get() {
      return count;
    }
  }
}
 */
interface Count {
  increment(): number;
  getValue(): number;
}
const createCounter = function(): Count {
  let count = 0;
  return {
    increment() {
      count += 1;
      return count;
    },
    getValue() {
      return count;
    }
  };
};

let discountRate = 0.1; // Глобальная переменная


interface Cart {
  total: number;
  items: Array<string>; // можно string[]
}
function applyDiscount(cart: Cart, discountRate: number) {
  return {
    ...cart,
    total: cart.total * (1 - discountRate),
    items: [...cart.items, 'free_gift'],
  }
}
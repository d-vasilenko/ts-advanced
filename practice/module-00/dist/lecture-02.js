/**
1. Что выведет `console.log(0 == "")`? Почему?
Выведет true  '' пустая строка приведется к 0;
2. Что выведет `console.log([] == false)`? Почему?
Выведет [] пустой массив не лож выведеться false;
3. В чём разница между `||` и `??`? Приведи пример, где `||` даст неправильный результат.
let count: number = 0;
const current: number = count || 100; в current будет 100 потому что 0 вриведется в false;
let count: number = 0;
const current: number = count ?? 200; ?? проверяет на null и undefined если будут фолси значения (тут например 0) вернуться они.
4. Что такое type narrowing? Приведи пример.
ну это когда например объединение типа и для разных значений из объединения нужна разная логика
важно обрабатывать never
type status = 'success' | 'error';
switch (status) {
  case 'success':
    console.log('Success);
    break;
  case 'error':
    console.log('Error');
    break;
  default:
    const _exhaustive: never = status;
    throw new Error(`Error status is ${_exhaustive})`;
}
5. Что такое discriminated union? Зачем нужен discriminator?
это поле в объекте по которому разделяеться логика как в 4 вопросе
6. Что такое exhaustiveness checking? Как его реализовать?
я уже ответил в 4 вопросе это нужно для того что бы не передать избыточный юнион.
7. Что выведет этот код?
```typescript
const user = null;
const name = user && user.name;
console.log(name);
```
null
8. Почему `if (count)` — плохая проверка для числа `count`?
потому что count может быть 0 а это false значение и ветка if не выполнеться
*/
function categorizeNumber(n) {
    if (n < 0)
        return 'negative';
    if (n === 0)
        return 'zero';
    return 'positive';
}
function safeDivide(a, b) {
    if (b === 0)
        return 'error';
    return a / b;
}
export {};
/**
 * Повторный вопрос: Что такое type narrowing? Приведи пример, где TypeScript автоматически сужает тип внутри if блока.
 * это механизм сужения типа на основе проверок
 * function someFn(value: string | number | null | undefined): string {
 *  if (typeof value === 'string') return `str: ${value}`;
 *  if (typeof value === 'number') return `num: ${value}`;
 *  if (value === null || value === undefined) return 'empty'
 * }
 *
 * Повторный вопрос: Почему discriminator в discriminated union должен быть литеральным типом ("circle"), а не просто string?
 * потому что именно по этому литералу происходит проверка и разделение логики.
 *
 * Повторный вопрос: Что такое тип never? Почему присваивание const _exhaustive: never = status работает как проверка полноты?
 * never это пустое множество. Потому что туда попадает значение которое не обрабатываеться логикой.
 *
 * Повторный вопрос: Почему TypeScript не может сузить тип, если discriminator — string, а не "circle"?
 * Потому что string может быть любой строкой которую не возможно сузить по значению, а 'circle' это конкретный литерал по которому можно сузить тип.
 *
 * Повторный вопрос: Что произойдёт, если добавить "loading" в union Status, но не обработать его в switch? Почему TypeScript покажет ошибку?
 * Выброситься исключение потому что сработает блок default.
 *
 * Как работает [] == false? Объясни все 4 шага приведения типов (boolean → number, object → primitive, string → number, final comparison).
 * 1 -> false приведется к 0, [] приведется к "" -> "" == 0 -> 0 == 0 true
 *
 * Повторный вопрос: Что произойдёт на этапе компиляции TypeScript, если добавить "loading" в union, но не обработать его в switch? Какая именно ошибка будет показана?
 * в индетификатор с типом never попадет значение типа литерала и компилятор выбросит ошибку type .. is not assignable to type 'never'.
 *
 * Повторный вопрос: Объясни Шаг 2 подробнее: как именно массив [] приводится к строке ""? Что такое ToPrimitive?
 * Объект приводится к примитиву через ToPrimitive для массива (массив это обьект) вызывается метод toSting() - > который приводит пустой массив к пустой строке.
 */

/**
1. Что произойдет, если ошибка возникнет в блоке `try`, но блока `catch` нет?
по всей видимости выброситься исключение, объясни точнее что будет.
я понял exception propagation, если catch нет в локальном скоупе ошибка поднимаеться выше в вызывающую функцию, если там тоже нет catch то еще выще и так до глобального скоупа если там нет то программа закончиться крахом

2. Почему в TypeScript переменная `error` в блоке `catch` имеет тип `unknown`, и как правильно получить из неё `message`?
потому что может быть неизвестная ошибка. Можно проверить через instanceof Error и вывести error.message

3. В чем разница между `return "error"` и `throw new Error("error")` с точки зрения потока выполнения программы?
Первый вариант просто вернет string выполнение программы не остановиться, а во воторм выброситься исключение и начьнеться поиск ближайшего блока catch он выполниться и программа продолжит выполнение если его нет ошибка дайдет до global scope в выплнение закончиться крахом.

4. Выполнится ли блок `finally`, если в блоке `try` произойдет `return` или `throw`?
finally выполниться ВСЕГДА
 */

const parseNumber = function(input: string): number {
  const errorMsg = "Некорректный ввод: ожидалось число";
  const tmpInput = input.trim();
  if (tmpInput.length === 0) throw new Error(errorMsg);
  const returnNum = Number(tmpInput);
  if (Number.isNaN(returnNum)) {
      throw new Error(errorMsg);
  }
  return returnNum; 
};

// console.log(parseNumber('49'));
// console.log(parseNumber('3.14'));
// console.log(parseNumber('abc'));
console.log(parseNumber(' '));

export {}
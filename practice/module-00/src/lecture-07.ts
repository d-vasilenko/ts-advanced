/**
 * Ответы на вопросы
 * 1 сложность O(n) - нужно пройтись по всем эллементам массива
 * 
 * 2 сложность O(n^2) - вложенный цикл
 * 
 * 3 я бы использовал Set() ))) ну а вообще, я бы собрал бы хеш например {} ключи эллементы, значения количиство вхождений
 * 
 * 4 потому, что сложность O(log n) чем больше данных тем он эффективнее, количество шагов растет логорифмически
 * 
 * A O(n); B O(n^2); C O(n)
 */

// #### Задание 2: Оптимизация
// Дана функция с `O(n²)` сложностью. Оптимизируй её до `O(n)` с использованием хэш-таблицы:


// function hasPairWithSum(arr: number[], target: number): boolean {
//   for (let i = 0; i < arr.length; i++) {
//     for (let j = i + 1; j < arr.length; j++) {
//       if (arr[i] + arr[j] === target) return true;
//     }
//   }
//   return false;
// }

function myHasPairWithSum(arr: number[], target: number): boolean {
  const seen = new Set<number>();
  for (const el of arr) {
    let complement = target - el;
    if (seen.has(complement)) {
      return true;
    } else {
      seen.add(el);
    }
  }
  return false;
}

// ==========================================
// tests
// ==========================================
function runTests() {
  const tests = [
    {
      name: "Стандартная пара (в середине)",
      arr: [1, 2, 3, 4, 5],
      target: 7,
      expected: true, // 3 + 4
    },
    {
      name: "Пары не существует",
      arr: [1, 2, 3, 4, 5],
      target: 10,
      expected: false,
    },
    {
      name: "Отрицательные числа",
      arr: [5, -2, 3, 8],
      target: 3,
      expected: true, // 5 + (-2)
    },
    {
      name: "Одинаковые элементы дают сумму",
      arr: [4, 2, 4],
      target: 8,
      expected: true, // 4 + 4 (разные индексы)
    },
    {
      name: "Одинаковые элементы НЕ дают сумму (нужны два разных)",
      arr: [4],
      target: 8,
      expected: false,
    },
    {
      name: "Пустой массив",
      arr: [],
      target: 5,
      expected: false,
    },
    {
      name: "Целевая сумма равна нулю",
      arr: [10, -5, 5, 2],
      target: 0,
      expected: true, // -5 + 5
    }
  ];

  let passed = 0;
  let failed = 0;

  console.log("🚀 Запуск тестов для hasPairWithSum...\n");

  for (const test of tests) {
    try {
      const result = myHasPairWithSum(test.arr, test.target);
      if (result === test.expected) {
        console.log(`✅ PASS: ${test.name}`);
        passed++;
      } else {
        console.log(`❌ FAIL: ${test.name}`);
        console.log(`   Ожидалось: ${test.expected}, Получено: ${result}`);
        console.log(`   Входные данные: arr=[${test.arr}], target=${test.target}`);
        failed++;
      }
    } catch (error) {
      console.log(`💥 ERROR: ${test.name}`);
      console.log(`   Исключение: ${error instanceof Error ? error.message : String(error)}`);
      failed++;
    }
  }

  console.log(`\n📊 Итог: Пройдено ${passed} из ${tests.length} тестов.`);
  if (failed === 0) {
    console.log("🎉 Отличная работа! Все тесты пройдены.");
  } else {
    console.log("⚠️ Есть ошибки. Проверь логику и попробуй снова.");
  }
}

// Запускаем тесты
runTests();
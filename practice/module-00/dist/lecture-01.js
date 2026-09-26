const a = 20;
const b = 'some string';
const c = true;
const userInputString = 'let input = "42"';
const userInputNum = Number.parseInt(userInputString.split('"')[1], 10);
if (!Number.isNaN(userInputNum)) {
    console.log(userInputNum);
    console.log(typeof userInputNum);
}
console.log(a + userInputNum);
export {};

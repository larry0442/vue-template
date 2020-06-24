/**
 * @method 小数精确相乘
 * @param {Number} num1 0.1
 * @param {Number} num2 0.3
 * @return {number} 0.03
 * * */
export function multiply(num1, num2) {
  let mutiple = 0;
  const str1 = num1.toString();
  const str2 = num2.toString();
  try {
    mutiple += str1.split('.')[1].length;
  } catch (e) {
    mutiple += 0;
  }
  try {
    mutiple += str2.split('.')[1].length;
  } catch (e) {
    mutiple += 0;
  }
  return (Number(str1.replace('.', '')) * Number(str2.replace('.', ''))) / (10 ** mutiple);
}

/**
 * @method 小数精确相加
 * @param {Number} num1 0.1
 * @param {Number} num2 0.3
 * @return {number} 0.4
 * * */
export function add(num1, num2) {
  let decimalLength1 = 0;
  let decimalLength2 = 0;
  try {
    decimalLength1 = num1.toString().split('.')[1].length;
  } catch (error) {
    decimalLength1 = 0;
  }
  try {
    decimalLength2 = num2.toString().split('.')[1].length;
  } catch (error) {
    decimalLength2 = 0;
  }
  const multiple = 10 ** Math.max(decimalLength1, decimalLength2);
  return (multiply(num1, multiple) + multiply(num2, multiple)) / multiple;
}

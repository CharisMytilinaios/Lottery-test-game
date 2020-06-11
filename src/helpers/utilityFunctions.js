
const arrayShuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const factorial = (num) => {
  let rval = 1;
  for (let i = 2; i <= num; i++)
    rval = rval * i;
  return rval;
}

const nCk = (n, k) => {
  return factorial(n) / ( factorial(n - k) * factorial(k) );
}

export { arrayShuffle, nCk }

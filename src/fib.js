function fibonacci(n) {
  let a = 1;
  let b = 1;

  while (n-- > 1) {
    let t = a;
    a = b;
    b += t;
  }

  return b;
}

module.exports = {
  fibonacci
};

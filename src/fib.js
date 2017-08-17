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

function benchmark(num) {
  var last = 0;
  for (var i = 0; i < num; i++) {
    last = fibonacci(i);
  }

  return last;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    fibonacci,
    benchmark
  };
}

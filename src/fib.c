int fibonacci(int n) {
  int a = 1;
  int b = 1;

  while (n-- > 1) {
    int t = a;
    a = b;
    b += t;
  }

  return b;
}

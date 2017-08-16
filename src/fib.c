#include <webassembly.h>

export double fibonacci(double n) {
  double a = 1;
  double b = 1;

  while (n-- > 1) {
    double t = a;
    a = b;
    b += t;
  }

  return b;
}

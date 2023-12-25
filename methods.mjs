import chalk from "chalk";

function bisectionMethod(func, a, b, tolerance = 0.001, maxIterations = 1000) {
  let c, fA, fB, fC;

  for (let i = 0; i < maxIterations; i++) {
    c = (a + b) / 2;

    fC = func(c);

    if (Math.abs(fC) < tolerance) {
      console.log(
        `${chalk.blue("Bisection method:")} Root found at ${chalk.red.italic(
          `x = ${c.toFixed(3)}`
        )} with tolerance ${chalk.blue(tolerance)} after ${chalk.green(
          i + 1
        )} iterations.`
      );
      return c;
    }

    fA = func(a);
    fB = func(b);

    if (fA * fC < 0) {
      b = c;
    } else if (fB * fC < 0) {
      a = c;
    } else {
      console.log(
        `${chalk.red(
          "Bisection method failed to converge."
        )} Choose a different initial interval.`
      );
      return null;
    }
  }

  console.log(
    `${chalk.yellow("Root approximation")} at ${chalk.red.italic(
      `x = ${c.toFixed(3)}`
    )} using ${chalk.blue(
      "Bisection Method"
    )} after reaching maximum iterations.`
  );
  return c;
}

function secantMethod(func, a, b, tolerance = 0.001, maxIterations = 1000) {
  let xn = a;
  let xnMinus1 = b;

  for (let iteration = 0; iteration < maxIterations; iteration++) {
    let fXn = func(xn);
    let fXnMinus1 = func(xnMinus1);

    if (Math.abs(fXn) < tolerance) {
      console.log(
        `${chalk.blue("Secant Method:")} Root found at ${chalk.red.italic(
          `x = ${xn.toFixed(3)}`
        )} with tolerance ${chalk.blue(tolerance)} after ${chalk.green(
          iteration + 1
        )} iterations.`
      );
      return xn;
    }

    let xnPlus1 = xn - (fXn * (xn - xnMinus1)) / (fXn - fXnMinus1);

    xnMinus1 = xn;
    xn = xnPlus1;
  }

  console.log(
    `${chalk.yellow("Root approximation")} at ${chalk.blue(
      `x = ${xn.toFixed(3)}`
    )} using ${chalk.blue("Secant Method")} after reaching maximum iterations.`
  );
  return xn;
}

function iterationMethod(func, a, b, tolerance = 0.001, maxIterations = 1000) {
  let xi;
  let iterations = 0;

  let x0 = (a + b) / 2;
  if (func(x0) === x0) {
    xi = x0;
  } else {
    xi = b;
  }

  do {
    let xiPrev = xi;

    xi = func(xiPrev);

    iterations++;

    if (!isFinite(xi) || isNaN(xi)) {
      console.log(`${chalk.red("Iteration method failed to converge.")}`);
      return null;
    }

    if (Math.abs(xi - xiPrev) < tolerance) {
      console.log(
        `${chalk.blue("Iteration Method:")} Root found at ${chalk.red.italic(
          `x = ${xi.toFixed(4)}`
        )} with tolerance ${chalk.blue(tolerance)} after ${chalk.green(
          iterations
        )} iterations.`
      );
      return xi;
    }

    if (iterations >= maxIterations) {
      console.log(
        `${chalk.red("Maximum iterations reached.")} ${chalk.yellow(
          "Root approximation"
        )} at ${chalk.red(`x = ${xi.toFixed(4)}`)} after ${chalk.green(
          iterations
        )} iterations using ${chalk.blue("Iteration Method")}.`
      );
      return xi;
    }
  } while (true);
}

function newtonRaphsonMethod(func, funcDerivative, a, b, tolerance = 0.001, maxIterations = 1000) {
  let xi;
  let iterations = 0;

  let x0 = (a + b) / 2;

  do {
    let fX0 = func(x0);
    let fPrimeX0 = funcDerivative(x0);

    xi = x0 - fX0 / fPrimeX0;

    iterations++;

    if (Math.abs(func(xi)) < tolerance) {
      console.log(
        `${chalk.blue(
          "Newton Raphson method:"
        )} Root found at ${chalk.red.italic(
          `x = ${xi.toFixed(3)}`
        )} with tolerance ${chalk.blue(tolerance)} after ${chalk.green(
          iterations
        )} iterations.`
      );
      return xi;
    }

    x0 = xi;

    if (iterations >= maxIterations) {
      console.log(
        `${chalk.red("Maximum iterations reached.")} ${chalk.yellow(
          "Root approximation"
        )} at ${chalk.red(`x = ${xi.toFixed(3)}`)} after ${chalk.green(
          iterations
        )} iterations using  ${chalk.blue("Newton Raphson")} Method.`
      );
      return xi;
    }
  } while (true);
}

function falsePositionMethod( func, a, b, tolerance = 0.001, maxIterations = 1000 ) {
  let x1, fA, fB, fX1;

  for (let i = 0; i < maxIterations; i++) {
    fA = func(a);
    fB = func(b);

    x1 = (a * fB - b * fA) / (fB - fA);

    fX1 = func(x1);

    if (Math.abs(fX1) < tolerance) {
      console.log(
        `${chalk.blue(
          "False Position method:"
        )} Root found at ${chalk.red.italic(
          `x = ${x1.toFixed(3)}`
        )} with tolerance ${chalk.blue(tolerance)} after ${chalk.green(
          i + 1
        )} iterations.`
      );
      return x1;
    }

    if (fX1 * fA < 0) {
      b = x1;
    } else {
      a = x1;
    }
  }

  console.log(
    `${chalk.yellow("Root approximation")} at ${chalk.red.italic(
      `x = ${x1.toFixed(3)}`
    )} using ${chalk.blue(
      "False Position"
    )} method after reaching maximum iterations.`
  );
  return x1;
}

console.log(`${chalk.red("a)")}`);
bisectionMethod((x) => x ** 3 - x - 1, 0, 3);
bisectionMethod((x) => x - Math.cos(x), 0, 3);
bisectionMethod((x) => Math.exp(-x) - x, 0, 3);

console.log(`${chalk.red("b)")}`);
falsePositionMethod((x) => x ** 3 - 5 * x + 1, 0, 3);
falsePositionMethod((x) => x * Math.exp(x) - 2, 0, 3);
falsePositionMethod((x) => Math.cos(x) - 3 * x + 1, 0, 3);
falsePositionMethod((x) => 2 * x - Math.log(x) - 7, 0, 3);

console.log(`${chalk.red("c)")}`);
bisectionMethod((x) => x ** 10 - 1, 0, 1.3);
falsePositionMethod((x) => x ** 10 - 1, 0, 1.3);

console.log(`${chalk.red("d)")}`);
secantMethod((x) => x - Math.exp(-x), 0, 3);
secantMethod((x) => x ** 3 + x ** 2 + x + 7, 0, 3);

console.log(`${chalk.red("e)")}`);
iterationMethod((x) => x ** 3 - 9 * x + 1, -3, 6);
iterationMethod((x) => 0.3 + Math.sin(x) - x, 0, 3);
iterationMethod((x) => Math.exp(x) - 5 * x, 0, 3);

console.log(`${chalk.red("f)")}`);
newtonRaphsonMethod((x) => x ** 2 + 4 * Math.sin(x), (x) => 2 * x + 4 * Math.cos(x), 0, 3);
newtonRaphsonMethod((x) => Math.cos(x) - x * Math.exp(x), (x) => -Math.sin(x) - x * Math.exp(x) - Math.exp(x), 0, 3);

function calculate(times) {
  let sum = 0;
  let mins = 0;
  let secs = 0;
  for (time of times) {
    sum += time;
  }

  mins = Math.floor(sum / 60);
  secs = sum % 60;

  if (secs < 10) secs = `0${secs}`;

  return `${mins}:${secs}`;
}


let num1 = 50;

let num2 = 41;

let num3 = 42;


console.log(calculate([num1, num2, num3]));

#!/usr/bin/env node

import minimist from "minimist";

function identifyTargetDate() {
  const argv = minimist(process.argv.slice(2));
  const today = new Date();

  const year = argv.y || today.getFullYear();
  const month = argv.m || today.getMonth() + 1;

  return { year: year, month: month };
}

function outputCal(year, month) {
  console.log(`      ${month}月 ${year}`);
  console.log("日 月 火 水 木 金 土");

  const firstDate = new Date(year, month - 1, 1);
  const firstDayOfWeek = firstDate.getDay();

  const lastDate = new Date(year, month, 0);
  const lastDay = lastDate.getDate();

  print("   ".repeat(firstDayOfWeek));

  for (let day = 1; day <= lastDay; day++) {
    const rjustedDay = String(day).padStart(2, " ");
    print(rjustedDay + " ");

    if (isSaturday(firstDayOfWeek, day)) {
      print("\n");
    }
  }

  print("\n");
}

function print(text) {
  process.stdout.write(text);
}

function isSaturday(firstDayOfWeek, day) {
  return (firstDayOfWeek + day) % 7 === 0;
}

const target = identifyTargetDate();
outputCal(target.year, target.month);

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

  process.stdout.write("   ".repeat(firstDayOfWeek));

  for (let day = 1; day <= lastDay; day++) {
    const rjustedDay = String(day).padStart(2, " ");
    process.stdout.write(rjustedDay + " ");

    if ((firstDayOfWeek + day) % 7 === 0) {
      process.stdout.write("\n");
    }
  }

  process.stdout.write("\n");
}

const target = identifyTargetDate();
const year = target.year;
const month = target.month;

outputCal(year, month);

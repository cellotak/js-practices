#!/usr/bin/env node

import minimist from "minimist";

main();

function main() {
  const target = identifyTargetDate();
  const year = target.year;
  const month = target.month;

  const errors = [];

  if (isInvalidMonth(month)) {
    errors.push("指定された月の値は無効です。1～12の範囲で入力して下さい");
  }

  if (isInvalidYear(year)) {
    errors.push("指定された西暦の値は無効です。1以上の値を入力して下さい。");
  }

  if (errors.length > 0) {
    for (const error of errors) {
      console.log(error);
    }
    return;
  }

  outputCal(year, month);
}

function identifyTargetDate() {
  const argv = minimist(process.argv.slice(2));
  const today = new Date();

  const year = argv.y ?? today.getFullYear();
  const month = argv.m ?? today.getMonth() + 1;

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
    print(formatDay(day));

    if (isSaturday(firstDayOfWeek, day)) {
      print("\n");
    }
  }

  print("\n");
}

function isInvalidMonth(month) {
  return month < 1 || month > 12;
}

function isInvalidYear(year) {
  return year < 1;
}

function print(text) {
  process.stdout.write(text);
}

function isSaturday(firstDayOfWeek, day) {
  return (firstDayOfWeek + day) % 7 === 0;
}

function formatDay(day) {
  return String(day).padStart(2, " ") + " ";
}

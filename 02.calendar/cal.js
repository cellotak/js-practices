#!/usr/bin/env node

import minimist from "minimist";

function main() {
  const targetYearAndMonth = parseTargetYearAndMonth();

  const errorMessages = validateYearMonth(targetYearAndMonth);

  if (errorMessages.length > 0) {
    for (const message of errorMessages) {
      console.error(message);
    }
    process.exit(1);
  }

  outputCal(targetYearAndMonth);
}

function parseTargetYearAndMonth() {
  const argv = minimist(process.argv.slice(2));
  const today = new Date();

  const year = argv.y ?? today.getFullYear();
  const month = argv.m ?? today.getMonth() + 1;

  return { year, month };
}

function validateYearMonth(targetYearAndMonth) {
  const errorMessages = [];

  const isInvalidMonth =
    targetYearAndMonth.month < 1 || targetYearAndMonth.month > 12;
  if (isInvalidMonth) {
    errorMessages.push(
      "指定された月の値は無効です。1～12の範囲で入力して下さい",
    );
  }

  const isInvalidYear = targetYearAndMonth.year < 1;
  if (isInvalidYear) {
    errorMessages.push(
      "指定された西暦の値は無効です。1以上の値を入力して下さい。",
    );
  }

  return errorMessages;
}

function outputCal(targetYearAndMonth) {
  console.log(`      ${targetYearAndMonth.month}月 ${targetYearAndMonth.year}`);
  console.log("日 月 火 水 木 金 土");

  const firstDate = new Date(
    targetYearAndMonth.year,
    targetYearAndMonth.month - 1,
    1,
  );
  const firstDayOfWeek = firstDate.getDay();

  const lastDate = new Date(
    targetYearAndMonth.year,
    targetYearAndMonth.month,
    0,
  );
  const lastDay = lastDate.getDate();

  process.stdout.write("   ".repeat(firstDayOfWeek));

  for (let day = 1; day <= lastDay; day++) {
    const isSaturday = (firstDayOfWeek + day) % 7 === 0;
    const paddedDay = String(day).padStart(2, " ");

    if (isSaturday || day === lastDay) {
      process.stdout.write(paddedDay);
    } else {
      process.stdout.write(`${paddedDay} `);
    }

    if (isSaturday) {
      process.stdout.write("\n");
    }
  }

  process.stdout.write("\n");
}

main();

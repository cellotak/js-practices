#!/usr/bin/env node

import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const today = new Date();

const year = argv.y || today.getFullYear();
const month = argv.m || today.getMonth() + 1;

console.log(`      ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");

const firstDate = new Date(year, month - 1, 1);
const firstDayOfWeek = firstDate.getDay();

const lastDate = new Date(year, month, 0);
const lastDay = lastDate.getDate();

console.log(`対象月の1日の曜日の数値: ${firstDayOfWeek}`);
console.log(`対象月の末日: ${lastDay}`);

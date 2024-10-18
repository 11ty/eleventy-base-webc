import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getHolidayDescriptions = function() {
  const csvFilePath = path.join(__dirname, 'syukujitsu_desc.csv');

  if (!fs.existsSync(csvFilePath)) {
    console.error(`CSV file not found: ${csvFilePath}`);
    return {};
  }

  const fileContent = fs.readFileSync(csvFilePath, 'utf8');

  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    delimiter: ','
  });

  const holidayDescriptions = {};
  records.forEach((record, index) => {
    if (record['国民の祝日・休日名称'] && record['説明']) {
      holidayDescriptions[record['国民の祝日・休日名称']] = record['説明'];
    } else {
      console.warn(`Invalid record at index ${index}:`, record);
    }
  });

  return holidayDescriptions;
}

const getJapaneseHolidays = function() {
  const csvFilePath = path.join(__dirname, 'syukujitsu.csv');

  // 检查文件是否存在
  if (!fs.existsSync(csvFilePath)) {
    console.error(`CSV file not found: ${csvFilePath}`);
    return { holidays: [] }; // 返回空数组以防止错误
  }

  const fileContent = fs.readFileSync(csvFilePath, 'utf8');

  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    delimiter: ','
  });

	const holidayDescriptions = getHolidayDescriptions();

  const holidays = records.map(record => ({
    date: record['国民の祝日・休日月日'],
    name: record['国民の祝日・休日名称'],
    description: holidayDescriptions[record['国民の祝日・休日名称']] || ''
  }));

  return holidays;
}

const japanese_holidays = getJapaneseHolidays();
// console.log("Holidays loaded:", japanese_holidays.filter(h => h.date.startsWith('2024')).slice(0, 2));

export default {
	holidays: japanese_holidays
};

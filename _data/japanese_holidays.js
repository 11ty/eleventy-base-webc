import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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

	const holidayDescriptions = {
		'元日': '元日とは・・・',
		'成人の日': '成人の日とは・・・',
		'建国記念の日': '建国記念の日とは・・・'
	};

  const holidays = records.map(record => ({
    date: record['国民の祝日・休日月日'],
    name: record['国民の祝日・休日名称'],
    description: holidayDescriptions[record['国民の祝日・休日名称']] || ''
  }));

  return holidays;
}
const japanese_holidays = getJapaneseHolidays();
console.log("xxx", japanese_holidays);
export default {
	holidays: japanese_holidays
};

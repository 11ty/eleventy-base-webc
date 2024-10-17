import japaneseHolidays from './japanese_holidays.js';
import { Lunar, Solar } from 'lunar-javascript';

console.log("calendar.js 中导入的祝日数据:", japaneseHolidays);

const calendarGenerator = function(year) {
  const months = [
    "一月", "二月", "三月", "四月", "五月", "六月",
    "七月", "八月", "九月", "十月", "十一月", "十二月"
  ];

  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

  // 将节假日数据转换为更易于查找的格式
  const holidays = {};
  japaneseHolidays.holidays.forEach(holiday => {
    const [y, m, d] = holiday.date.split('/');
    if (y === year.toString()) {
      const formattedDate = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
      holidays[formattedDate] = holiday.name;
    }
  });

  console.log("处理后的节假日数据:", holidays);

  function getLunarDate(date) {
    const lunar = Lunar.fromDate(date);
    return `${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}（${lunar.getJieQi()}）`;
  }

  function getSixWeekday(date) {
    const lunar = Lunar.fromDate(date);
    return lunar.getJieQi(); // 这里返回的是节气,我们可以根据需要修改为六曜
  }

  function generateCalendarData() {
    const calendarData = {
      year: year,
      months: [],
      weekdays: weekdays
    };

    for (let month = 0; month < 12; month++) {
      const monthData = {
        name: months[month],
        days: []
      };

      const firstDay = new Date(year, month, 1);
      const startingDayOfWeek = firstDay.getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      // 添加上个月的剩余天数
      for (let i = 0; i < startingDayOfWeek; i++) {
        monthData.days.push({
          date: "",
          weekday: weekdays[i],
          isCurrentMonth: false
        });
      }

      // 添加当前月的天数
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateString = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

        monthData.days.push({
          date: day,
          weekday: weekdays[date.getDay()],
          isWeekend: date.getDay() === 0 || date.getDay() === 6,
          isCurrentMonth: true,
          lunar: getLunarDate(date),
          holiday: holidays[dateString] || "",
          sixWeekday: getSixWeekday(date)
        });
      }

      calendarData.months.push(monthData);
    }

    return calendarData;
  }

  return generateCalendarData();
}

const currentYear = new Date().getFullYear();
const calendarData = calendarGenerator(currentYear);

console.log("生成的日历数据:", calendarData);

export default {
  calendarCurrentYear: calendarData
};

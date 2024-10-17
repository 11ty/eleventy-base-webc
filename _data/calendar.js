import japaneseHolidays from './japanese_holidays.js';

const calendarGenerator = function(year) {
  const months = [
    "一月", "二月", "三月", "四月", "五月", "六月",
    "七月", "八月", "九月", "十月", "十一月", "十二月"
  ];

  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

  // 将节假日数据转换为更易于查找的格式
  const holidays = {};
  japaneseHolidays.holidays.forEach(holiday => {
    const [y, m, d] = holiday.date.split('-');
    if (y === year.toString()) {
      holidays[holiday.date] = holiday.name;
    }
  });

  function getLunarDate(date) {
    // 这里需要实现农历转换逻辑
    return "初一"; // 示例返回值
  }

  function getSixWeekday(date) {
    // 这里需要实现六曜计算逻辑
    return "大安"; // 示例返回值
  }

  function generateCalendarData() {
    const calendarData = [];

    for (let month = 0; month < 12; month++) {
      const monthData = {
        name: months[month],
        days: []
      };

      const daysInMonth = new Date(year, month + 1, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateString = date.toISOString().split('T')[0];

        monthData.days.push({
          date: day,
          weekday: weekdays[date.getDay()],
          isWeekend: date.getDay() === 0 || date.getDay() === 6,
          lunar: getLunarDate(date),
          holiday: holidays[dateString] || "",
          sixWeekday: getSixWeekday(date)
        });
      }

      calendarData.push(monthData);
    }

    return {
      year: year,
      months: calendarData,
      weekdays: weekdays
    };
  }

  return generateCalendarData();
}

const calendarCurrentYear = calendarGenerator(new Date().getFullYear());
export default {
	calendarCurrentYear: calendarCurrentYear
};

import japaneseHolidays from './japanese_holidays.js';
import { Solar } from 'lunar-javascript';

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
    const solar = Solar.fromDate(date);
    const lunar = solar.getLunar();
    return `${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`;
  }

  function getSixWeekday(date) {
    const sixWeekdays = ["先", "友引", "先負", "仏滅", "大安", "赤口"];
    const baseDate = new Date(1873, 0, 1); // 明治6年1月1日,六曜计算的基准日期
    const diffDays = Math.floor((date - baseDate) / (24 * 60 * 60 * 1000));
    return sixWeekdays[diffDays % 6];
  }

  function getDayClasses(day) {
    const classes = ['day'];
    if (day.holiday) classes.push('holiday');
    if (day.weekday === '土') classes.push('saturday');
    if (day.weekday === '日') classes.push('sunday');
    if (!day.isCurrentMonth) classes.push('not-current-month');
    if (day.isToday) classes.push('today');
    return classes.join(' ');
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
      const prevMonth = new Date(year, month - 1, 0);
      const daysInPrevMonth = prevMonth.getDate();
      for (let i = 0; i < startingDayOfWeek; i++) {
        const prevMonthDay = daysInPrevMonth - startingDayOfWeek + i + 1;
        monthData.days.push({
          date: prevMonthDay,
          weekday: weekdays[i],
          isCurrentMonth: false,
          classes: getDayClasses({
            weekday: weekdays[i],
            isCurrentMonth: false,
          })
        });
      }

      // 添加当前月的天数
      const today = new Date();
      const isToday = (date) =>
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateString = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

        monthData.days.push({
          date: day,
          weekday: weekdays[date.getDay()],
          isWeekend: date.getDay() === 0 || date.getDay() === 6,
          isCurrentMonth: true,
          isToday: isToday(date),
          lunar: getLunarDate(date),
          holiday: holidays[dateString] || "",
          sixWeekday: getSixWeekday(date),
          classes: getDayClasses({
            weekday: weekdays[date.getDay()],
            holiday: holidays[dateString] || "",
            isCurrentMonth: true,
            isToday: isToday(date)
          })
        });
      }

      // 添加下个月的开始几天
      const remainingDays = 7 - (monthData.days.length % 7);
      if (remainingDays < 7) {
        for (let i = 1; i <= remainingDays; i++) {
          const nextMonthDate = new Date(year, month + 1, i);
          monthData.days.push({
            date: i,
            weekday: weekdays[nextMonthDate.getDay()],
            isCurrentMonth: false,
            classes: getDayClasses({
              weekday: weekdays[nextMonthDate.getDay()],
              isCurrentMonth: false,
            })
          });
        }
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

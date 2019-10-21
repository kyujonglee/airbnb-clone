import React from 'react';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import koKR from 'rc-calendar/lib/locale/ko_KR';
import 'rc-calendar/assets/index.css';

const Calendar = () => {
  const cn = window.location.search.indexOf('cn') !== -1;
  const formatStr = 'MM월 DD일';
  return (
    <RangeCalendar
      format={formatStr}
      locale={cn ? zhCN : koKR}
      showDateInput={false}
      showToday={false}
      renderFooter={() => <span>저장</span>}
    />
  );
};

export default Calendar;

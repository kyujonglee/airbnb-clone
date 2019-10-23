import React from 'react';
import styled from 'styled-components';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import koKR from 'rc-calendar/lib/locale/ko_KR';
import 'rc-calendar/assets/index.css';
import { useRoomDispatch } from '../contexts/RoomsContext';

const Save = styled.span`
  cursor: pointer;
  color: ${props => props.theme.airbnbGreen};
  font-weight: 600;
  font-size: 1rem;
`;

const Calendar = ({ close, date, setDate }) => {
  const dispatch = useRoomDispatch();

  const onSelect = moments => {
    setDate({
      startDate: moments[0]._d,
      endDate: moments[1]._d
    });
  };
  const onChange = moments => {
    if (moments.length === 1) {
      setDate({
        ...date,
        startDate: moments[0]._d,
        endDate: null
      });
    }
  };

  const save = () => {
    dispatch({
      type: 'SET_CHECK',
      checkIn: date.startDate,
      checkOut: date.endDate
    });
    close();
  };
  return (
    <RangeCalendar
      format={'MM월 DD일'}
      locale={koKR}
      showDateInput={false}
      showToday={false}
      renderFooter={() => <Save onClick={save}>저장</Save>}
      onChange={onChange}
      onSelect={onSelect}
      showClear
    />
  );
};

export default Calendar;

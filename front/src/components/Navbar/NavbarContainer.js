import React, { useState, useCallback } from 'react';
import { usePersonnelState } from '../../contexts/PersonnelContext';
import { useRoomState } from '../../contexts/RoomsContext';
import { parsePrice, parseDate } from '../../util';
import NavbarPresenter from './NavbarPresenter';

const NavbarContainer = () => {
  const { adult, child, baby } = usePersonnelState();
  const initState = {
    date: false,
    personnel: false,
    price: false
  };
  const [click, setClick] = useState(initState);
  const { checkIn, checkOut, priceStart, priceEnd } = useRoomState();
  const MIN_PRICE = 0;
  const MAX_PRICE = 1000000;
  const [date, setDate] = useState({
    startDate: null,
    endDate: null
  });

  const printDate = () => {
    if (date.startDate && date.endDate)
      return `${parseDate(date.startDate)} - ${parseDate(date.endDate)}`;
    if (date.startDate)
      return date.startDate && `${parseDate(date.startDate)} - 체크아웃`;
    if (date.endDate)
      return date.endDate && `체크인 - ${parseDate(date.endDate)}`;
    if (checkIn && checkOut)
      return `${parseDate(checkIn)} - ${parseDate(checkOut)}`;
    return '날짜';
  };

  const printPrice = () => {
    if (MAX_PRICE !== priceEnd && MIN_PRICE !== priceStart)
      return `₩${parsePrice(priceStart)} - ₩${parsePrice(priceEnd)}`;
    if (MAX_PRICE !== priceEnd) return `최대 ₩ ${parsePrice(priceEnd)}`;
    if (MIN_PRICE !== priceStart) return `₩ ${parsePrice(priceStart)}+`;
    return '가격';
  };

  const pricePersonnel = () => {
    let str = '';
    if (adult !== 0 || child !== 0) str += `게스트 ${adult + child}명`;
    if (baby !== 0) str += ` 유아 ${baby}명`;
    return str || '인원';
  };

  const clickTarget = name => setClick({ ...initState, [name]: true });
  const nonClick = useCallback(() => setClick({ ...initState }), [initState]);
  const activeDate =
    date.startDate || date.endDate || checkIn || checkOut || click.date;
  const activePersonnel =
    click.personnel || !(adult === 0 && child === 0 && baby === 0);
  const activePrice =
    priceStart !== MIN_PRICE || priceEnd !== MAX_PRICE || click.price;
  return (
    <NavbarPresenter
      date={date}
      setDate={setDate}
      printPrice={printPrice}
      printDate={printDate}
      pricePersonnel={pricePersonnel}
      click={click}
      clickDate={clickTarget.bind(null, 'date')}
      clickPersonnel={clickTarget.bind(null, 'personnel')}
      clickPrice={clickTarget.bind(null, 'price')}
      nonClick={nonClick}
      activeDate={activeDate}
      activePersonnel={activePersonnel}
      activePrice={activePrice}
    />
  );
};

export default NavbarContainer;

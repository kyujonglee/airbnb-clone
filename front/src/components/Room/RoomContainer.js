import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo';
import { useRoomState, useRoomDispatch } from '../../contexts/RoomsContext';
import {
  usePersonnelState,
  usePersonnelDispatch
} from '../../contexts/PersonnelContext';
import RoomPresenter from './RoomPresenter';
import { toast } from 'react-toastify';

const CREATE_RESERVATION_QUERY = gql`
  mutation createReservation(
    $checkIn: String!
    $checkOut: String!
    $roomId: Int!
    $adult: Int
    $child: Int
    $baby: Int
  ) {
    createReservation(
      checkIn: $checkIn
      checkOut: $checkOut
      roomId: $roomId
      adult: $adult
      child: $child
      baby: $baby
    )
  }
`;

const RoomContainer = ({
  id,
  title,
  content,
  rating,
  imgPath,
  bed,
  bathroom,
  bedroom
}) => {
  const [click, setClick] = useState(false);
  const [createReservationMutation] = useMutation(CREATE_RESERVATION_QUERY);
  const { checkIn, checkOut } = useRoomState();
  const { adult, child, baby } = usePersonnelState();
  const rDispatch = useRoomDispatch();
  const pDispatch = usePersonnelDispatch();

  const isPerson = adult !== 0 || child !== 0 || baby !== 0;
  const createReservation = async () => {
    try {
      if (checkIn < new Date() || !isPerson) {
        throw Error();
      }
      const result = await createReservationMutation({
        variables: {
          checkIn,
          checkOut,
          roomId: id,
          adult,
          child,
          baby
        }
      });
      if (result) {
        toast.success('예약에 성공하셨습니다');
        rDispatch({ type: 'RESET' });
        pDispatch({ type: 'RESET' });
      }
    } catch (error) {
      toast.error(
        '예약에 실패하셨습니다. \n인원과 날짜를 선택했는지 확인해주세요.'
      );
    }
  };
  return (
    <RoomPresenter
      createReservation={createReservation}
      id={id}
      title={title}
      content={content}
      rating={rating}
      imgPath={imgPath}
      bed={bed}
      bathroom={bathroom}
      bedroom={bedroom}
      click={click}
      setClick={setClick}
    />
  );
};

export default RoomContainer;

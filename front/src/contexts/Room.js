import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import Modal from './Modal';
import Button from './Button';
import Confirm from './Confirm';
import { useMutation } from 'react-apollo';
import { useRoomState, useRoomDispatch } from '../contexts/RoomsContext';
import {
  usePersonnelState,
  usePersonnelDispatch
} from '../contexts/PersonnelContext';
import { toast } from 'react-toastify';

const Container = styled.div`
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  width: 700px;
  padding: 0.2rem;
  margin-top: 1rem;
`;

const RoomImage = styled.img`
  width: 30%;
`;

const Column = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  justify-content: space-between;
`;

const Row = styled.div`
  display: flex;
  &:first-child {
    flex-direction: column;
  }
  &:last-child {
    justify-content: space-between;
    align-items: center;
  }
`;

const Title = styled.span`
  font-size: 1.2rem;
  color: ${props => props.theme.textColor};
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Content = styled.span`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 0.5rem;
`;

const RatingBox = styled.div``;

const Star = styled.span`
  color: ${props => props.theme.airbnbGreen};
`;

const Rating = styled.span`
  color: rgba(0, 0, 0, 0.7);
`;

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

const Room = ({
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
    <Container>
      <RoomImage src={imgPath} />
      <Column>
        <Row>
          <Title>{title}</Title>
          <Content>
            {'침대' && `bed ${bed}개 `}
            {'욕실' && `bathroom ${bathroom}개 `}
            {'침실' && `bedroom ${bedroom}개 `}
          </Content>
          <Content>{content}</Content>
        </Row>
        <Row>
          <RatingBox>
            <Star>★</Star>
            <Rating>({rating})</Rating>
          </RatingBox>
          <Button onClick={() => setClick(true)} text={'예약'} />
          <Modal show={click} onClick={() => setClick(false)}>
            <Confirm
              title={'예약하시겠습니까?'}
              message={`${title}`}
              onConfirm={() => {
                createReservation();
                setClick(false);
              }}
              onDeny={() => setClick(false)}
            />
          </Modal>
        </Row>
      </Column>
    </Container>
  );
};

export default Room;

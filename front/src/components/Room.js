import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import Button from './Button';
import Confirm from './Confirm';

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
            <Confirm title={'예약하시겠습니까?'} message={`${title}`} />
          </Modal>
        </Row>
      </Column>
    </Container>
  );
};

export default Room;

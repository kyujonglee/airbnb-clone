import React from 'react';
import styled from 'styled-components';
import StarRatingComponent from 'react-star-rating-component';
import Button from './Button';

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
  & span {
    margin-bottom: 0.5rem;
  }
`;

const Title = styled.span`
  font-size: 1.2rem;
  color: ${props => props.theme.textColor};
  font-weight: 600;
`;

const Content = styled.span`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.7);
`;

const Room = ({ title, content, rating, imgPath, bed, bathroom, bedroom }) => {
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
          <StarRatingComponent
            editing={false}
            starCount={5}
            value={rating}
            renderStarIcon={() => <span>★</span>}
            starColor={
              '#914569'
            } /* color of selected icons, default `#ffb400` */
            emptyStarColor={'#ced4da'}
          />
          <Button text={'예약'} />
        </Row>
      </Column>
    </Container>
  );
};

export default Room;

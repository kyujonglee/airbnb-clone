import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import Navbar from '../components/Navbar';
import { useQuery } from 'react-apollo';
import Room from '../components/Room';

const Container = styled.div`
  background-color: white;
  width: 100%;
  min-height: calc(100vh - 6vh);
`;

const Title = styled.span`
  display: block;
  font-size: 1.8rem;
  color: ${props => props.theme.textColor};
`;

const RoomContainer = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
`;

const ROOMS_QUERY = gql`
  {
    findRooms {
      rating
      id
      price
      content
      imgPath
      bedroom
      bed
      bathroom
      maximumGuest
    }
  }
`;

const Rooms = () => {
  const { data, loading, error } = useQuery(ROOMS_QUERY);
  if (error) return 'error';
  if (loading) return 'loading';
  const { findRooms: rooms } = data;
  return (
    rooms &&
    rooms.length && (
      <Container>
        <Navbar />
        <RoomContainer>
          <Title>숙소 {rooms.length}개 </Title>
          {rooms.map(room => (
            <Room
              key={room.id}
              id={room.id}
              price={room.price}
              imgPath={room.imgPath}
              bed={room.bed}
              bathroom={room.bathroom}
              bedroom={room.bedroom}
            />
          ))}
        </RoomContainer>
      </Container>
    )
  );
};

export default Rooms;

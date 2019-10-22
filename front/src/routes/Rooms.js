import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import Navbar from '../components/Navbar';
import { useQuery } from 'react-apollo';
import Room from '../components/Room';
import Loader from '../components/Loader';
import { useRoomState } from '../contexts/RoomsContext';
import { PersonnelProvider } from '../contexts/PersonnelContext';

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
  query findRooms(
    $checkIn: String
    $checkOut: String
    $priceEnd: Int
    $priceStart: Int
  ) {
    findRooms(
      checkIn: $checkIn
      checkOut: $checkOut
      priceStart: $priceStart
      priceEnd: $priceEnd
    ) {
      rating
      id
      content
      imgPath
      bedroom
      bed
      title
      bathroom
      maximumGuest
    }
  }
`;

const Rooms = () => {
  const state = useRoomState();
  const { data, loading, error } = useQuery(ROOMS_QUERY, {
    variables: { ...state }
  });
  if (error) return 'error';
  if (loading) return <Loader />;
  const { findRooms: rooms } = data;
  return (
    rooms &&
    rooms.length && (
      <Container>
        <PersonnelProvider>
          <Navbar />
        </PersonnelProvider>
        <RoomContainer>
          <Title>숙소 {rooms.length}개 </Title>
          {rooms.map(room => (
            <Room
              key={room.id}
              id={room.id}
              rating={room.rating}
              imgPath={room.imgPath}
              bed={room.bed}
              title={room.title}
              content={room.content}
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

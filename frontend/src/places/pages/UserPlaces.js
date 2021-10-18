import React,{ useEffect, useState} from 'react';
import { useParams } from 'react-router';

import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';


const UserPlaces = (props) => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedPlaces, setLoadedPlaces ] = useState();
    const userId = useParams().userId;
    

    useEffect(()=> {
      const fetchPlaces = async () => {
        try{
          const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
          setLoadedPlaces(responseData.places);
        }catch(err){
          console.log(err);
        };
      }
      fetchPlaces();
    },[sendRequest, userId]);

    const placeDeleteHandler = (deletePlaceId) => {
      setLoadedPlaces(prevPlaces => {
        prevPlaces.filter(place => place.id !== deletePlaceId)
      })
    }

  return  (
    <React.Fragment>
      <ErrorModal error={error} onClear = {clearError} />
      { isLoading && <div className="center"><LoadingSpinner /></div> }
      {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace = {placeDeleteHandler} /> }
    </React.Fragment>
  ) 
};

export default UserPlaces;
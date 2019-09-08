import { gatherCities, isLoading, gotError } from '../actions';
import { getCityDetails, getCityImages, getCityScores } from '../api/cityCalls';

export const cityThunk = (locations) => {
  return async (dispatch) => {
      try {
          dispatch(isLoading(true));
          const cities = await Promise.all(locations.map(async city => {
              let details = await getCityDetails(city);
              return details
          }));
          dispatch(isLoading(false));
          // dispatch(gatherCities(cities));
          return cities;
      } catch (error) {
      dispatch(gotError(error.message));
    }
  }
}

  export const scoreThunk = (locations) => {
  return async (dispatch) => {
      try {
          dispatch(isLoading(true));
          const cities = await Promise.all(locations.map(async city => {
              let image = await getCityImages(city);
              let scores = await getCityScores(city);
              return {...image, ...scores }
          }));
          dispatch(isLoading(false));
          dispatch(gatherCities(cities));
          return cities;
      } catch (error) {
      dispatch(gotError(error.message));
    }
  }
}
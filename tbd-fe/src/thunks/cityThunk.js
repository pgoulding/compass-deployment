import { gatherCities, isLoading, gotError } from '../actions';
import { getCityDetails, getCityImages } from '../api/cityCalls';

export const cityThunk = (locations) => {
    return async (dispatch) => {
        try {
            dispatch(isLoading(true));
            const cities = await Promise.all(locations.map(async city => {
                let image = await getCityImages(city);
                let details = await getCityDetails(city);
                return {...image, ...details }
            }));
            dispatch(isLoading(false));
            dispatch(gatherCities(cities));
            return cities;
        } catch (error) {
        dispatch(gotError(error.message));
      }
    }
  }
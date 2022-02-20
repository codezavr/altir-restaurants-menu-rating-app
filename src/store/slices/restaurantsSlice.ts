import { createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';
import { RESTAURANTS_DATA } from '../../data';

export type RestaurantMenuItem = {
    id: number,
    name: string;
    description: string;
    image: string;
    rating: number;
}

export type Restaurant = {
    id: number;
    name: string;
    description: string;
    image: string;
    menuItems: RestaurantMenuItem[]
}

export type Restaurants = Restaurant[];

export interface RestaurantsState {
    restaurants: Restaurants,
}

const initialState: RestaurantsState = {
    restaurants: RESTAURANTS_DATA
}

export const RestaurantsSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {
        setMenuItemRating: (state, { payload: { restaurantId, menuItemId, rating } }) => {
            return ({
                ...state,
                restaurants: state.restaurants
                    .map((restaurant: Restaurant) => restaurant.id === +restaurantId ? {
                        ...restaurant, menuItems: restaurant.menuItems.map((menuItem: RestaurantMenuItem) => {
                            return menuItem.id === menuItemId ? { ...menuItem, rating: rating } : menuItem;
                        })
                    } : restaurant)
            })
        },
    }
})

export const getRestaurantsState = (state: RootState) => state.restaurants;
export const getRestaurants = createSelector(getRestaurantsState, (restaurantsState => restaurantsState.restaurants));

export const setMenuItemRating = RestaurantsSlice.actions.setMenuItemRating;

export default RestaurantsSlice.reducer

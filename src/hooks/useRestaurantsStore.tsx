import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useAppDispatch } from '../store/store';
import { getRestaurants, setMenuItemRating } from '../store/slices/restaurantsSlice';

export const useRestaurantsStore = () => {

    const dispatch = useAppDispatch();

    const restaurantSetMenuItemRating = useCallback(
        (restaurantId: string | undefined,
         menuItemId: number,
         rating: number | null) => dispatch(setMenuItemRating({ restaurantId, menuItemId, rating })),
        [dispatch],
    );

    return {
        restaurantSetMenuItemRating,
        restaurants: useSelector(getRestaurants),
    };
};

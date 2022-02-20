import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useRestaurantsStore } from '../../hooks/useRestaurantsStore';
import styled from 'styled-components';
import { Grid } from '@mui/material';
import RestaurantMenuCard from '../../components/RestaurantMenuCard/RestaurantMenuCard';
import { Restaurant, RestaurantMenuItem } from '../../store/slices/restaurantsSlice';

const RoundedImage = styled.div`
  background-size: cover;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  margin: 0 auto;
  flex-grow: 1;
  flex-shrink: 0;
  box-shadow: 0 3px 25px -5px rgb(34 60 80 / 48%);
  border: 5px solid #b53f3f;
`

const CardData = styled.div`
  display: flex;
  flex-direction: column;
`

const CardTitle = styled.div`
  font-weight: bold;
`

const CardDescription = styled.div`
`

export function RestaurantPage() {
    const { restaurantId } = useParams();
    const { restaurants } = useRestaurantsStore()

    const [currentRestaurant, setCurrentRestaurant] = useState<Restaurant>({} as Restaurant);

    useEffect(() => {
        const foundRestaurant = restaurantId && restaurants.find((restaurant: Restaurant) => restaurant.id === +restaurantId);
        if (foundRestaurant) {
            setCurrentRestaurant(foundRestaurant);
        }
    }, [restaurants, restaurantId]);

    return (
        <>
            <Grid container spacing={ 4 } sx={ { mb: 6 } }>
                <Grid item md={ 3 } xs={ 12 }>
                    <RoundedImage style={ { backgroundImage: `url(${ currentRestaurant.image })` } }/>
                </Grid>
                <Grid item md={ 9 } xs={ 12 }>
                    <CardData>
                        <CardTitle>
                            <h2>{ currentRestaurant.name }</h2>
                        </CardTitle>
                        <CardDescription>{ currentRestaurant.description }</CardDescription>
                    </CardData>
                </Grid>
            </Grid>

            <Grid container spacing={ 4 }>
                {
                    currentRestaurant && currentRestaurant.menuItems ? currentRestaurant.menuItems.map((menuItem: RestaurantMenuItem, index: number) => {
                        return (
                            <Grid item md={ 4 } key={ index }>
                                <RestaurantMenuCard
                                    restaurantId={ restaurantId }
                                    restaurantMenuId={ menuItem.id }
                                    name={ menuItem.name }
                                    image={ menuItem.image }
                                    rating={ menuItem.rating }
                                    description={ menuItem.description }
                                />
                            </Grid>
                        )
                    }) : null
                }
            </Grid>
        </>
    );
}

export default RestaurantPage;

import React from 'react';
import Card from '../../components/RestaurantCard/RestaurantCard';
import { Grid, Grow } from '@mui/material';
import { Restaurant, Restaurants } from '../../store/slices/restaurantsSlice';

type HomePageProps = { restaurants: Restaurants };

export function HomePage({ restaurants }: HomePageProps) {

    return (
        <>
            <h1>List of restaurants</h1>

            <Grid container spacing={ 4 }>
                {
                    restaurants && restaurants.length ?
                        restaurants.map((restaurant: Restaurant, index: number) => {

                            return <Grow
                                in={ true }
                                key={ index }
                                style={ { transformOrigin: '0 0 0' } }
                                { ...{ timeout: (index + 1) * 1000 } }
                            >
                                <Grid item md={ 4 } sm={ 6 } xs={ 12 }>
                                    <Card title={ restaurant.name }
                                          image={ restaurant.image }
                                          id={ restaurant.id }/>
                                </Grid>
                            </Grow>
                        }) : null
                }
            </Grid>

        </>
    );
}

export default HomePage;

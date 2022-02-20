import React from 'react';
import './App.css';
import { useRestaurantsStore } from './hooks/useRestaurantsStore';
import RestaurantPage from './pages/RestaurantPage';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { AppBar, Container, createTheme, Link, ThemeProvider, Toolbar } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
    const { restaurants } = useRestaurantsStore();

    const theme = createTheme({
        palette: {
            primary: {
                main: '#b53f3f',
            },
            secondary: {
                main: '#f50057',
            },
            background: {
                default: '#ffffff',
            },
        },
    });

    return (
        <>
            <ThemeProvider theme={ theme }>
                <AppBar position="static" sx={ { mb: 5 } }>
                    <Toolbar>
                        <Container maxWidth="lg">

                                <Link
                                    underline="none"
                                    variant="button"
                                    color="#fff"
                                    href="/"
                                    sx={{ my: 1.5, mx: 1.5 }}
                                >
                                    Home
                                </Link>
                        </Container>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="lg">
                    <Routes>
                        <Route path="/" element={ <HomePage restaurants={ restaurants }/> }/>
                        <Route path="/restaurants/:restaurantId" element={ <RestaurantPage/> }/>
                    </Routes>
                </Container>
            </ThemeProvider>
        </>
    );
}

export default App;

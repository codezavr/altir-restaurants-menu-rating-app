import React, { useCallback } from 'react';
import { Backdrop, Box, Card, CardContent, CardMedia, Fade, Modal, Rating, Typography } from '@mui/material';
import styled from 'styled-components';
import { useRestaurantsStore } from '../../hooks/useRestaurantsStore';

type RestaurantMenuCardProps = {
    restaurantId: string | undefined;
    restaurantMenuId: number;
    name: string;
    description: string;
    image: string;
    rating: number;
}

const StyledCard = styled(Card)`
  position: relative;
  cursor: pointer;
`

const StyledRating = styled(Rating)`
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 10px;
  padding: 2px 5px;
  background: #fff;
`

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 400,
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
    outline: 'none',
};

export function RestaurantMenuCard({ restaurantId, restaurantMenuId, name, image, rating, description }: RestaurantMenuCardProps) {

    const { restaurantSetMenuItemRating } = useRestaurantsStore();

    const [openModal, setOpenModal] = React.useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleChangeRating = useCallback(
        (restaurantId: string | undefined, restaurantMenuId: number, newValue: number | null) => {
            restaurantSetMenuItemRating(
                restaurantId,
                restaurantMenuId,
                newValue
            );
        }, [restaurantSetMenuItemRating]);

    return (<>
        <StyledCard onClick={ handleOpenModal }>
            <CardMedia
                component="img"
                alt={ name }
                height="220"
                image={ image }
            />
            <CardContent>
                <Typography variant="h6">
                    { name }
                </Typography>
            </CardContent>

            <StyledRating value={ rating } readOnly/>
        </StyledCard>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={ openModal }
            onClose={ handleCloseModal }
            closeAfterTransition
            BackdropComponent={ Backdrop }
            BackdropProps={ {
                timeout: 500,
            } }
        >
            <Fade in={ openModal }>
                <Box sx={ style }>
                    <CardMedia
                        component="img"
                        alt={ name }
                        height="220"
                        image={ image }
                        sx={{ marginBottom: 1 }}
                    />
                    <Typography variant="h6" sx={{ marginBottom: 1 }}>
                        { name }
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
                        { description }
                    </Typography>
                    <Box component="div" sx={ { display: 'flex', alignItems: 'center' } }>
                        <Box component="span" sx={{ fontWeight: 'bold', marginRight: 1 }}>
                            Rate:
                        </Box>
                        <Rating
                            onChange={ (event: React.SyntheticEvent<Element, Event>, newRating: number | null) => {
                                handleChangeRating(restaurantId, restaurantMenuId, newRating)
                            } }
                            value={ rating }/>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    </>)
}

export default RestaurantMenuCard;

import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

type RestaurantCardProps = {
    id: number;
    title: string;
    image: string;
}

const CardWrapper = styled.div`
  position: relative;
  background: #ccc;
  color: #fff;
  border-radius: 10px;
  overflow: hidden;
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-size: contain;
  min-height: 200px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.25);
    z-index: 1;
  }
`

const Title = styled.h2`
  position: relative;
  color: #fff;
  text-transform: uppercase;
  z-index: 2;
`

const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`

const Card = ({ title, image, id }: RestaurantCardProps) => (
    <CardWrapper>
        <StyledLink to={ { pathname: `/restaurants/${ id }`, } }>
            <CardHeader style={ { backgroundImage: `url(${ image })` } }>
                <Title>{ title }</Title>
            </CardHeader>
        </StyledLink>
    </CardWrapper>
)

export default Card

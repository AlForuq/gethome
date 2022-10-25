import React from 'react'
import { Categories } from '../Category'
import { Filter } from '../Filter'
import { Carousel } from './Courosel'
import { Recomandation } from './Recomandation'
import { Container } from './style'
import { WhyChooseUs } from './WhyChooseUs'

export const Home = () => {
  return (
    <Container>
      <Filter />
      <Carousel />
      <Recomandation />
      <WhyChooseUs/>
      <Categories/>
    </Container>
  )
}

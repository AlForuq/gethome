import React, { useRef, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import { HouseCard } from '../../HouseCard'
import { ArrowLeft, ArrowRight, Cards, Container, Wrapper } from './style'
import {useHttp} from '../../../Hooks/useHttp'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

export const Recomandation = () => {
  const navigate = useNavigate()
  const { request } = useHttp()
  const [item, setItem] = useState()

  const onClick = (id) => {
    navigate(`/properties/${id}`);
  }

  useQuery('', () => {
    return request({ url: "v1/houses/me", token: true })
   
  },
    {
      onSuccess: (res) => {
       const list = res?.data?.map((value) => (
         <HouseCard key={value?.id} onClick={() => onClick(value?.id)} info={value} />
       ));
        setItem(list)
      }
    })


  const slider = useRef()

  // const item = [
  //   <HouseCard margin />,
  //   <HouseCard margin />,
  //   <HouseCard margin />,
  //   <HouseCard margin />,
  //   <HouseCard margin />,
  //   <HouseCard margin />,
  //   <HouseCard margin />,
  //   <HouseCard margin />,
  // ];
  
  return (
    <Container className='nocopy' >
      <div className='title center'>Recommendation</div>
      <div className='description center'>
        The Houses that You Want and dream!!!
      </div>

      <Wrapper>
        <Cards>
          <AliceCarousel
            ref={slider}
            items={item}
            arrows={true}
            autoWidth
            mouseTracking
          />

          <ArrowLeft onClick={() => slider.current?.slidePrev()} >
            &lang;
          </ArrowLeft>
          
          <ArrowRight onClick={() => slider.current?.slideNext()} >
            &rang;
          </ArrowRight>
        </Cards>
      </Wrapper>
    </Container>
    
  )
}

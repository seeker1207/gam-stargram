import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import React from 'react';
import { Image } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import styled from 'styled-components';

const SwiperWrapper = styled.div`
  .swiper-slide {
    display: flex;
    justify-content: center !important;
    align-items: center !important;
    height: auto;
  }
  img.ui.image {
    height: 100%;
    width: 100%;
    object-fit: cover;
    max-height: 50vh;
  }
`;

function PhotoCarousel({ filenames } : { filenames: string[] }) {
  return (
    <SwiperWrapper>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        grabCursor
        navigation
      >
        { filenames && filenames.map((filename) => (
          <SwiperSlide key={uuid()}>
            <Image src={`http://localhost:3065/${filename}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperWrapper>
  );
}

export default PhotoCarousel;

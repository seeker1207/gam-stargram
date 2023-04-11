## :video_game: 겜스타그램
### 겜스타그램은 인스타그램의 컨셉을 차용하여 react(Next.js)로 구현해본 개인 프로젝트입니다.

- 기술스택
  - 프론트엔드: React, next.js, styled-component, SWR, semantic-UI
  - 백엔드: express, TypeORM, passport
  - 빌드 도구: yarn berry (pnp)

- 구현 과정
  - 프론트의 경우 next.js를 통한 SSR 구현 및 이미지 렌더링 최적화
  - semantic-UI를 통해 전반적인 마크업을 렌더링하고 styled-component 로 세세한 조정을 하였음.
  - 백엔드의 경우 TypeORM 의 orm 맵핑 을 이용해 기본적인 CRUD 의 쿼리를 직접 생성하지 않고 자동적으로 쿼리를 생성해 데이터 조작을 제어하였음.
  - node-module 폴더가 생성되고 패키지를 탐색하는 기존 방식에서 벗어나 PnP 방식의 yarn berry로 빌드하여 보다 빠른 빌드를 가능하게 하였음.
  
- 결과 및 성과
    - Webpack과 babel을 통해 react 코드가 어떻게 native한 js코드로 변환되고 번들링 되는지 알수 있었습니다.
    - yarn berry를 통해 기존의 node_module 방식에서 pnp 방식으로 패키지를 관리하여 보다 효율적으로 프론트엔드 환경을 빌드하는 방법을 배울 수 있었습니다.
    - Next.js를 통해 SSR의 개념을 실습 할수 있었으며, 그와 더불어 화면에 보여지는 이미지를 최적화하는 방식도 학습할 수 있었습니다.
    - 백엔드의 경우 express로 구현하고 typeORM을 통해 엔티티를 관리하고 이를 이용해 API를 구현하면서 node.js환경의 백엔드 환경에 대해서도 학습할수 있었습니다.
- 구현화면
<img width="987" alt="image" src="https://user-images.githubusercontent.com/33423594/199413935-edec3e3f-19fe-4422-817f-0ff19af07640.png">
<img width="1045" alt="image" src="https://user-images.githubusercontent.com/33423594/199414019-94a4befc-f4be-48df-84e3-555505914905.png">
<img width="848" alt="image" src="https://user-images.githubusercontent.com/33423594/199414127-7b01cbb8-54d4-45c0-ac25-f8ed885c6932.png">
<img width="997" alt="image" src="https://user-images.githubusercontent.com/33423594/199414073-33eb7580-dde8-47a4-b602-7e5c5f0cbada.png">

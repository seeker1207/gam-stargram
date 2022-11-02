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

- 구현화면
<img width="987" alt="image" src="https://user-images.githubusercontent.com/33423594/199413935-edec3e3f-19fe-4422-817f-0ff19af07640.png">
<img width="1045" alt="image" src="https://user-images.githubusercontent.com/33423594/199414019-94a4befc-f4be-48df-84e3-555505914905.png">
<img width="848" alt="image" src="https://user-images.githubusercontent.com/33423594/199414127-7b01cbb8-54d4-45c0-ac25-f8ed885c6932.png">
<img width="997" alt="image" src="https://user-images.githubusercontent.com/33423594/199414073-33eb7580-dde8-47a4-b602-7e5c5f0cbada.png">

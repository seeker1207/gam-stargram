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

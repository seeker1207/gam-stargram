import styled from 'styled-components';

export const MenuWrapper = styled.div`
  cursor: pointer;

  span {
    margin-left: 5px;
    color: #6435c9;
    font-weight: bold;
    font-size: large;
  }
`;

export const LoginMenuWrapper = styled.div`
  @media all and (max-width:800px) {
    display: none;
  }
  display: flex;
  align-items: center;
`;

export const SearchBarWrapper = styled.div`
  @media all and (max-width:580px){
    display: none;
  }
  display: flex;
  align-items: center;
`;

export const LogoWrapper = styled.div`
  @media all and (max-width:1250px) {
    display: none;
  }
  .small.image {
    width: 200px;
  }
  
`;

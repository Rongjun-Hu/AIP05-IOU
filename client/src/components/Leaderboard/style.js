import styled from 'styled-components';

export const Wrapper = styled.div`
    overflow: hidden;
    width: 1060px;
    margin: 0 auto;
    border: none;
`;

export const table = styled.div`
  cursor: pointer;
  height: 50vh;
  width: 100%;
  background-color:  #1a1aff;
  color:  #1a1aff;
  font-family: 'Galada', cursive;
  overflow: hidden;
  text-align: center;
`;

export const tr = styled.div`
   border-bottom: 1px solid #C1C3D1;
   color: #666B85;
   font-size:16px;
   font-weight:normal;
   text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
`;

export const th = styled.div`
  color:#fff;;
  background: #1b1e24;
  border-bottom: 4px solid #9ea7af;
  font-size:23px;
  font-weight: 100;
  padding: 24px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  vertical-align:middle;
  text-align: center;
`;

export const td = styled.div`
    background:#FFFFFF;
    padding:20px;
    text-align: center;
    vertical-align: middle;
    font-weight:300;
    font-size:18px;
    border-right: 1px solid #C1C3D1;
`;

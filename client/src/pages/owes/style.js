import styled from 'styled-components';

export const Wrapper = styled.div`
    overflow: hidden;
    width: 1120px;
    margin: 0 auto;
    padding-bottom: 100px;
`;


export const Header = styled.div`
     width: 630px;
     margin: 50px 0 20px 0;
`;

export const MyButton = styled.button`
        background-color: white;
        color: black;
        border: 1px solid #5599FF;
        width: 90px;
        height: 30px;
        &.left{
            float: left;
        }
        &.right{
            float: right;
        }
        margin-left: 5px;
`;

export const Div = styled.div`
        margin-top: 10px;
        margin-bottom: 10px;
`

export const Head = styled.div`
     margin: 50px 0 20px 0;
     font-size: 34px;
     line-height: 44px; 
     font-weight: bold;
     color: #333;
`;

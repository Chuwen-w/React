import React from 'react';
import styled from 'styled-components'


const Section = styled.section`
  background: grey;
  height: 700px;
  display:block;
  background-size:contain;
`;
const Content = styled.div`
 width:100%;
 height:100px;
`;
const Left = styled.div`
  padding-left:220px;
  padding-top:143px;
`;
const Title = styled.p`
  font-size: 55px;
  color:black;
  font-weight:400;
`;
const Desc = styled.p`
   wight:450px;
   font-size:20px;
   color:black;
   line-height:30px;
   margin-top:50px;
`;
const Button = styled.a`
   display: flex;
   justify-content:center;
   align-items: center;
   border-radius:18px;
   margin-top:58px;
   width:170px;
   height:70px;
   font-size:25px;
   text-align:center;
   text-decoration:none;
   color: white;
   cursor:pointer;
   background: linear-gradient(90deg,#6e5efe,#5E66FF);
   box-shadow:0 15px 14px rgb(0 0 0/12%);
`;

const Home = () => {
    return (
       <Section>
           <Content>
               <Left>
                   <Title>
                       Welcome to our website
                   </Title>
                   <Desc>

                       Claim your stock from now!
                   </Desc>
                   <Button href=''>
                       <span>sign up</span>
                   </Button>
               </Left>
           </Content>
       </Section>
    )
}

export default Home

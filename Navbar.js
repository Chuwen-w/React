import React from 'react';
import styled from'styled-components/macro';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import Home from "./Home";
import PriceHistory from"./PriceHistory";
import Quote from"./Quote";
import Stock from"./Stock"



const NavbarContainer = styled.div`
 width:100%;
 height:70px;
 z-index:20;
 background:black;
`;
const NavbarWrap = styled.div`
  width: 1000px;
  height:100%;
  margin:0 auto;
  z-index:20;
  display:flex;
  position: relative;
  align-items:center;
  justify-content:space-between;
`;
const Logo = styled.div`
width:120px;
height:22px;
background:red;
background-size: 100% 100%;
cursor: pointer;
`;
const Nav = styled.div`
 flex:1;
 position: relative;
 padding-left:50px;
`;
const NavLink = styled(Link)`
  color:green;
  padding:0 15px;
  font-size:15px;
  line-height: 70px;
  font-weight: 700;
  text-decoration:none;
`;
const Search = styled.div`
  right: 230px;
  position: absolute;
`;
const SearchWrap = styled.div`
  wight: 200px;
  height:35px;
  position: relative;
  box-sizing: border-box;
  background: blue;
  line-height:30px;
  padding-left:30px;
  border-radius: 20px;
`;
const Input = styled.input`
  color:black;
  height:20px;
  width:150px;
  border: transparent;
  outline: none;

  &##placeholder{
      color:yellow;
  }
`;
const ButtonContainer = styled.div`
  display:flex;
  align-items: center;
  justify-content:flex-end;
`;
const Button = styled.div`
 width: 110px;
 color: white;
 cursor:pointer;
 height:35px;
 font-size:15px;
 box-sizing: border-box;
 background: darkgreen;
 text-align:center;
 line-height:36px;
 border-radius:20px;
`;



const Navbar = () => {
    return (
        <Router>
        <div>
        <NavbarContainer>
            <NavbarWrap>
                <Logo>
                </Logo>
                <Nav>
                    <NavLink to="/Home">Home</NavLink>
                    <NavLink to="/Stock">Stock</NavLink>
                    <NavLink to="/Quote">Quote</NavLink>
                    <NavLink to="/PriceHistory">Price History</NavLink>
                </Nav>
                <Search>
                    <SearchWrap>
                        <Input type="text" placeholder="Symbol/Name"/>
                    </SearchWrap>
                </Search>
                <ButtonContainer>
                    <Button css={`color:white;background:black`}>SIGN UP</Button>
                    <Button>LOG IN</Button>
                </ButtonContainer>
            </NavbarWrap>
        </NavbarContainer>

        <Switch>
            <Router path="/Stock">
                <Stock/>
            </Router>
            <Router path="/Quote">
                <Quote/>
            </Router>
            <Router path="/PriceHistory">
                <PriceHistory/>
            </Router>
            <Router path="/">
                <Home />
            </Router>
        </Switch>
        </div>
        </Router>
    )
}

export default Navbar

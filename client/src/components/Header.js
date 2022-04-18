// Home.js, Planning.js 에서 불러옴

import React from "react";
import styled from "styled-components"; // CSS 많이 없어서 여기서 바로 적용

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  height: 10vh;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
`;

const Fav = styled.img`
  margin: 0 0.69vw 0 2.08vw;
  width: 1.81vw;
  height: auto;
`;

const ATag = styled.a`
  text-decoration: none;
  font-weight: 700;
  font-size: 1.53vw;
  line-height: 3vh;
`;

const Menu = styled(ATag)`
  font-size: 1.53vw;
  line-height: 1.32vw;
  margin: 0 0.76vw;
  padding: 0.9vw 1.88vw;
`;

function Header() {
  return (
    <Wrapper>
      <Logo>
        <Fav src="favicon.png" />
        <ATag href="/">Y-BOX</ATag>
      </Logo>
      <div>
        <Menu href="/about">About</Menu>
        <Menu href="/subscription">Subscription</Menu>
        <Menu href="/workshop">Workshop</Menu>
        <Menu href="/contactus">Contact Us</Menu>
      </div>
    </Wrapper>
  );
}

export default Header;

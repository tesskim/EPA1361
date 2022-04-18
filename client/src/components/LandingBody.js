import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Body = styled.div`
  background-image: url("./background.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 90vh;
  position: relative;
  width: 100vw;
`;

const Title = styled.span`
  display: inline-block;
  width: 50vw;
  font-family: "Nunito";
  font-style: normal;
  font-weight: 700;
  font-size: 2.7vw;
  line-height: 4.3vw;
  position: absolute;
  top: 20%;
  left: 25%;
`;

const Wrapper = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 25%;
`;

const Btn = styled.button`
  background-color: transparent;
  border: 0.14vw solid;
  border-radius: 0.69vw;
  border-color: white;
  padding: 0.97vw 1.67vw;
  font-weight: 500;
  font-size: 1.53vw;
  line-height: 2.5vw;
  &:hover {
    background-color: white;
    color: black;
  }
  margin-right: 2.78vw;
`;

const Input = styled.input`
  background: #2b2b2b;
  border: 1px solid white;
  border-radius: 0.69vw;
  padding: 0.76vw;
  width: 21.18vw;
  font-weight: 400;
  font-size: 1.53vw;
  line-height: 2.64vw;
  margin-right: 1.39vw;
`;

class LandingBody extends React.Component {
  // button click시 showing 값 false -> true
  state = {
    showing: false,
  };
  invitation = () => {
    this.setState((current) => ({
      showing: !current.showing,
    }));
  };

  render() {
    const { showing } = this.state;
    return (
      <Body>
        <Title>
          Presenting Y-BOX, A digital creative facilitation toolbox that uses AI
          to empower your ideas.
        </Title>
        <Wrapper>
          <Btn onClick={this.invitation}>I have an invitation code</Btn>
          {/* button click시 code input 할 수 있는 공간 띄우기 */}
          {showing ? (
            <div>
              <Input type="text" placeholder=" Enter your invitation code" />
              <Link to="/session">
                <Btn>Enter</Btn>
              </Link>
            </div>
          ) : (
            <Link to="/planning">
              <Btn>I want to start a new session</Btn>
            </Link>
          )}
        </Wrapper>
      </Body>
    );
  }
}

export default LandingBody;

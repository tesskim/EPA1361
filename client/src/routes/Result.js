import { Link } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

const Title = styled.span`
  display: inline-block;
  width: 757px;
  text-align: center;
  font-family: "Nunito";
  font-style: normal;
  font-weight: 700;
  font-size: 42px;
  line-height: 57px;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 196.45px;
`;

const Results = styled.div`
  margin: 115.47px 400px 0 400px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Result = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  margin: 10px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SixpIcon = styled.img`
  width: 23.28px;
  height: 23.28px;
  margin-right: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 151px;
`;

const Button = styled.button`
  width: 219.58px;
  height: 55.25px;
  background-color: transparent;
  border: 2px solid;
  border-radius: 10px;
  border-color: white;
  padding: 14px 24px;
  font-weight: 700;
  font-size: 19.8333px;
  line-height: 23px;
  &:hover {
    background-color: white;
    color: black;
  }
  justify-content: center;
  align-items: center;
  margin: 0 10px;
`;

function ResultPage() {
  const [amountIdea, setAmountIdea] = useState("000");
  const [amountTime, setAmountTime] = useState("00");

  return (
    <div style={{ width: "100%", height: "100%", position: "fixed" }}>
      <Title>
        Congratulations!
        <br /> You generated {amountIdea} ideas in {amountTime} minutes
      </Title>
      <Results>
        <Result>
          <SixpIcon src="Place.png" />
          Place | 0 topics | 00 ideas
        </Result>
        <Result>
          <SixpIcon src="Product.png" />
          Product | 0 topics | 00 ideas
        </Result>
        <Result>
          <SixpIcon src="Packaging.png" />
          Packaging | 0 topics | 00 ideas
        </Result>
        <Result>
          <SixpIcon src="Price.png" />
          Price | 0 topics | 00 ideas
        </Result>
        <Result>
          <SixpIcon src="Proposition.png" />
          Proposition | 0 topics | 00 ideas
        </Result>
        <Result>
          <SixpIcon src="Promotion.png" />
          Promotion | 0 topics | 00 ideas
        </Result>
      </Results>
      <ButtonWrapper>
        <Link to="../Pdf">
          <Button>Download PDF</Button>
        </Link>
        <Link to="../">
          <Button>Exit</Button>
        </Link>
      </ButtonWrapper>
    </div>
  );
}

export default ResultPage;

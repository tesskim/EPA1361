import { Link } from "react-router-dom";
import styled from "styled-components";

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Btn = styled.button`
  background-color: transparent;
  border: 2px solid;
  border-radius: 10px;
  border-color: white;
  padding: 16px 40px;
  font-weight: 700;
  font-size: 19.8333px;
  line-height: 23px;
  &:hover {
    background-color: white;
    color: black;
  }
  margin: 50px 20px 0 20px;
`;

function Pdf() {
  return (
    <div style={{ width: "100%", height: "100%", position: "fixed" }}>
      <BtnWrapper>
        <Btn>Download</Btn>
        <Link to="../">
          <Btn>Exit</Btn>
        </Link>
      </BtnWrapper>
    </div>
  );
}
export default Pdf;

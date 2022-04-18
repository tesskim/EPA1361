import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import styles from "./PlanningBody.module.css";

const Box = styled(motion.div)`
  height: 24.42vw;
  width: 45.25vw;
  border: 1px solid #ffffff;
  border-radius: 40px;
  display: flex;
  align-items: center;
  font-size: 28px;
  flex-direction: column;
`;

const box = {
  entry: (isBack) => ({
    x: isBack ? -500 : 500,
    opacity: 0,
    scale: 1,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: (isBack) => ({
    x: isBack ? 500 : -500,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  }),
};

const PrevNextBtn = styled.button`
  background-color: transparent;
  border: 2px solid;
  border-radius: 10px;
  border-color: white;
  padding: 14px 24px;
  font-weight: 500;
  font-size: 22px;
  line-height: 36px;
  margin-top: 70.5px;
  &:hover {
    background-color: white;
    color: black;
  }
`;

const TypeBtn = styled(PrevNextBtn)`
  padding: 12px 20px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  margin-top: 20px;
`;

function PlanningBody() {
  const [visible, setVisible] = useState(1); // 1번 질문부터 시작
  const [back, setBack] = useState(false); // next prev 제어
  const [category, setCategory] = useState(0); // 4번 질문 select category
  const [keyword, setKeyword] = useState(0); // 4번 질문 select keyword

  const nextPlease = () => {
    // next button click시 visible값이 1-> 2-> 3-> 4
    setBack(false);
    setVisible((prev) => (prev === 4 ? 4 : prev + 1));
  };
  const prevPlease = () => {
    // prev button click시 visible값이 4->3->2->1
    setBack(true);
    setVisible((prev) => (prev === 1 ? 1 : prev - 1));
  };
  const onChange = (event) => {
    setCategory(event.target.value);
    setKeyword(event.target.value);
  };

  // category, keyword random으로 골라줌
  const random = () => {
    setCategory(Math.floor(Math.random() * (7 - 1) + 1));
    setKeyword(Math.floor(Math.random() * (7 - 1) + 7));
  };

  return (
    <div>
      <span className={styles.title}>Let's start planning a session</span>
      <div className={styles.wrapper}>
        {/* prev, next button click시 motion 발생 */}
        <AnimatePresence exitBeforeEnter custom={back}>
          <Box
            custom={back}
            variants={box}
            initial="entry"
            animate="center"
            exit="exit"
            key={visible}
          >
            {/* 총 질문 페이지 4개, 각 input 값을 submit해서 session에 반영하는 것 필요 */}
            {/* 1번 질문 */}
            {visible === 1 ? (
              <Box>
                <div className={styles.subtitle}>
                  When it will be held for what reason?
                </div>
                <div className={styles.contents__title}>
                  <label className={styles.label} htmlFor="text">
                    Title
                  </label>
                  <input className={styles.input} placeholder={" Type"} />
                </div>
              </Box>
            ) : null}

            {/* 2번 질문 */}
            {visible === 2 ? (
              <Box>
                <div className={styles.subtitle}>
                  What is the goal of today’s game?
                </div>
                <div className={styles.contents__goal}>
                  <label className={styles.label} htmlFor="text">
                    Goal
                  </label>
                  <input className={styles.input} placeholder={" Type"} />
                </div>
                <div className={styles.contents__type}>
                  <label className={styles.label} htmlFor="text">
                    Type
                  </label>
                  <div className={styles.wrapper__type}>
                    <TypeBtn>We want to develop a new product</TypeBtn>
                    <TypeBtn>We want to improve an existing product</TypeBtn>
                  </div>
                </div>
              </Box>
            ) : null}

            {/* 3번 질문 */}
            {visible === 3 ? (
              <Box>
                <div className={styles.subtitle}>
                  Set your own pace of brainstorming
                </div>
                <div className={styles.contents__speed}>
                  <div className={styles.wrapper__img}>
                    <img className={styles.img} alt="fast" src="fast.png" />
                    <img className={styles.img} alt="slow" src="slow.png" />
                  </div>
                  <input
                    className={styles.range}
                    type="range"
                    id="slider"
                    min="1"
                    max="5"
                  />
                </div>
              </Box>
            ) : null}

            {/* 4번 질문 */}
            {visible === 4 ? (
              <Box>
                <div className={styles.subtitle}>
                  Select a category and a keyword to start with
                </div>
                <div className={styles.contents__selector}>
                  <select
                    name="category"
                    className={styles.select}
                    value={category}
                    onChange={onChange}
                  >
                    <option value="0">Category</option>
                    <option value="1">Place</option>
                    <option value="2">Product</option>
                    <option value="3">Price</option>
                    <option value="4">Packaging</option>
                    <option value="5">Proposition</option>
                    <option value="6">Promotion</option>
                  </select>

                  {/* sixp의 value에 따라 keyword가 바뀌는 코드가 필요함 */}
                  <select
                    name="keyword"
                    className={styles.select}
                    value={keyword}
                    onChange={onChange}
                  >
                    <option value="0">Keyword</option>
                    <option value="7">color</option>
                    <option value="8">creative</option>
                    <option value="9">dispensing</option>
                    <option value="10">new shape</option>
                    <option value="11">portioning</option>
                    <option value="12">vending machine</option>
                  </select>

                  <button className={styles.random} onClick={random}>
                    random
                  </button>
                </div>
              </Box>
            ) : null}
          </Box>
        </AnimatePresence>
        <div className={styles.wrapper__button}>
          {/* 1번 질문일때 prev 안뜸 */}
          {visible === 1 ? (
            <PrevNextBtn onClick={prevPlease} style={{ visibility: "hidden" }}>
              prev
            </PrevNextBtn>
          ) : (
            <PrevNextBtn onClick={prevPlease}>prev</PrevNextBtn>
          )}
          {visible === 4 ? (
            <Link to="/session">
              <PrevNextBtn>Start a Session</PrevNextBtn>
            </Link>
          ) : (
            <PrevNextBtn onClick={nextPlease}>next</PrevNextBtn>
          )}
        </div>
        {/* wrapper__button */}
      </div>
      {/* wrapper */}
    </div>
  );
}

export default PlanningBody;

import { useState, useEffect, useCallback} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import styles from "./SessionContent.module.css";
import styled from "styled-components";
import Axios from "axios";

const Card = styled(motion.div)`
  display: flex;
  position: absolute;
  right: 0;
  width: 294.67px;
  height: 509.29px;
  background: white;
  box-shadow: 0px 8px 10px 12px rgba(0, 0, 0, 0.3);
  border-radius: 11.3333px;
  /* transition: 0.3s ease-out; */
`;

const card = {
  entry: (isBack) => ({
    x: 0,
    opacity: 1,
    scale: 0,
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
    x: isBack ? 0 : -30,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  }),
};

const Btn = styled.button`
  width: 188px;
  height: 45px;
  background-color: transparent;
  border: 2px solid #ffffff;
  border-radius: 20.724px;
  font-weight: 600;
  font-size: 22px;
  line-height: 36px;
`;

function SessionContent() {
  // const callApi = async () => {
  //   const response = await fetch("/api/cards");
  //   const body = await response.json();
  //   console.log(body);
  //   return body;
  // };
  
 

  const [visible, setVisible] = useState(0); // 1번부터 428번 카드로 임의 지정
  const [back, setBack] = useState(false); // prev next button 작동
  const [sixp, setSixp] = useState("Place"); //  현재는 sixp = Packaging, cluster = color가 default이지만
  const [cluster, setCluster] = useState(); //  "./PlanningBody.js" 에서 보내서  sixp, cluster 변수에 받을 것
  const [color, setColor] = useState("#FF79A5"); // bar color
  const [cardsOpen, setCardsOpen] = useState(false);
  const [title, setTitle] = useState();
  const [idea, setIdea] = useState("");
  const [ideas, setIdeas] = useState([]);
  const [pin, setPin] = useState(false); // innerHTML 변경 기능
  const [CardList, setCardList] = useState([{number:'', wnh:'', sixp:'', cluster:'', text:'', Keyword:''}]);
  const [show_overlay, setOverlay] = useState(true);

  const nextPlease = () => {
    setBack(false);
    setVisible((prev) => (prev + 1) % CardList.length);
  };
  const prevPlease = () => {
    setBack(true);
    setVisible((prev) => {
      if (prev === 0){
        return CardList.length -1;
      } else {
        return (prev - 1) % CardList.length;
      }
    });
  };

  const changeSixp = (event) => {
    setSixp(event.target.value);
    console.log(sixp, "inside")
  };

  // 사용자가 sixp와 cluster 선택시, bar color에 적용되어야 함.
  const colorChange = (event) => {
    if (sixp === "Place") setColor("#892E8D");
    else if (sixp === "Product") setColor("#FF8C12");
    else if (sixp === "Price") setColor("#FF604E");
    else if (sixp === "Packaging") setColor("#FF79A5");
    else if (sixp === "Promotion") setColor("#37BF3D");
    else if (sixp === "Proposition") setColor("#1898E3");
  };



  const cardPlease = (event) => {
    
    setCluster(event.target.value);

    setCluster((state) => {
      console.log(state);
      cardCalling(sixp, state);
      return state;
    });
    colorChange();
    
    console.log("cardPlease", cluster)
    console.log("sixp", sixp)
  };


  useEffect(() => {
    console.log("useEffect", cluster)
  }, [cluster]);

  const cardCalling = useCallback(async(sp, cl)=> {
    Axios.get("http://localhost:3001/api/get", {params: {sp: sp, cl: cl}}).then((response) => {
      console.log(response.data);
//      console.log(sp)
      setCardList(response.data);
    });
  }, []);

  

  const startBtn = () => {
    setCardsOpen((prev) => !prev);
  };
  const onChange = (event) => {
    setTitle(event.target.value);
  };
  const onChanges = (event) => setIdea(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (idea === "") {
      return;
    }
    setIdeas((currentArray) => [idea, ...currentArray]);
    setIdea("");
  };

  const onClick = () => setPin((prev) => !prev);

  const onoff = () => {
    if (show_overlay === true){
      setOverlay(false);

      setOverlay((state) => {
      console.log(state);
      return state;
      });
    } else {
        setOverlay(true);

        setOverlay((state) => {
        console.log(state);
        return state;
        });
    }
  }


  return (
    <div className={styles.wrapper}>
      <div className={styles.title__wrapper}>
        <input
          className={styles.title__input}
          type="text"
          placeholder="Objective of the session"
          value={title}
          onChange={onChange}
        />
        <button className={styles.title__edit}>
          <FontAwesomeIcon icon={faPen} />
        </button>
      </div>
      {/* start button click 시 category와 cluster selector 뜸 */}
      <div className={styles.select__wrapper}>
        {!cardsOpen ? (
          <button className={styles.button__start} onClick={startBtn}>
            Start a session
          </button>
        ) : (
          <div className={styles.selector}>
            <select
              className={styles.select__sixp}
              onChange={changeSixp}
              value={sixp}
            >
              <option value="Place">Place</option>
              <option value="Product">Product</option>
              <option value="Price">Price</option>
              <option value="Packaging">Packaging</option>
              <option value="Promotion">Promotion</option>
              <option value="Proposition">Proposition</option>
            </select>
            {/* sip에 따라 그에 맞는 cluster button 불러오도록 설정 */}
            {sixp === "Place" ? (
              <div className={styles.select__cluster}>
                <button value="family" className={styles.clusterplace} onClick={cardPlease}>
                  family
                </button>
                <button value="new channel" className={styles.clusterplace} onClick={cardPlease}>
                  new channel
                </button>
                <button value="on the go" className={styles.clusterplace} onClick={cardPlease}>
                  on the go
                </button>
                <button value="own distribution" className={styles.clusterplace} onClick={cardPlease}>
                  own distribution
                </button>
                <button value="people" className={styles.clusterplace} onClick={cardPlease}>
                  people
                </button>
                <button value="sampling" className={styles.clusterplace} onClick={cardPlease}>
                  sampling
                </button>
              </div>
            ) : (
              ""
            )}
            {sixp === "Product" ? (
              <div className={styles.select__cluster}>
                <button value="color" className={styles.clusterproduct} onClick={cardPlease}>
                  color
                </button>
                <button value="creative" className={styles.clusterproduct} onClick={cardPlease}>
                  creative
                </button>
                <button value="functional food" className={styles.clusterproduct} onClick={cardPlease}>
                  functional food
                </button>
                <button value="ingredients" className={styles.clusterproduct} onClick={cardPlease}>
                  ingredients
                </button>
                <button value="new format" className={styles.clusterproduct} onClick={cardPlease}>
                  new format
                </button>
                <button value="shelf life" className={styles.clusterproduct} onClick={cardPlease}>
                  shelf life
                </button>
              </div>
            ) : (
              ""
            )}
            {sixp === "Price" ? (
              <div className={styles.select__cluster}>
                <button value="cheaper" className={styles.clusterprice} onClick={cardPlease}>
                  cheaper
                </button>
                <button value="flexible" className={styles.clusterprice} onClick={cardPlease}>
                  flexible
                </button>
                <button value="for free" className={styles.clusterprice} onClick={cardPlease}>
                  for free
                </button>
                <button value="more expensive" className={styles.clusterprice} onClick={cardPlease}>
                  more expensive
                </button>
                <button value="saving" className={styles.clusterprice} onClick={cardPlease}>
                  saving
                </button>
                <button value="rent" className={styles.clusterprice} onClick={cardPlease}>
                  rent
                </button>
              </div>
            ) : (
              ""
            )}
            {sixp === "Packaging" ? (
              <div className={styles.select__cluster}>
                <button value="color" className={styles.clusterpackaging} onClick={cardPlease}>
                  color
                </button>
                <button value="creative" className={styles.clusterpackaging} onClick={cardPlease}>
                  creative
                </button>
                <button value="dispensing" className={styles.clusterpackaging} onClick={cardPlease}>
                  dispensing
                </button>
                <button value="new shape" className={styles.clusterpackaging} onClick={cardPlease}>
                  new shape
                </button>
                <button value="portioning" className={styles.clusterpackaging} onClick={cardPlease}>
                  portioning
                </button>
                <button value="vending machine" className={styles.clusterpackaging} onClick={cardPlease}>
                  vending machine
                </button>
              </div>
            ) : (
              ""
            )}
            {sixp === "Promotion" ? (
              <div className={styles.select__cluster}>
                <button value="communication" className={styles.clusterpromotion} onClick={cardPlease}>
                  communication
                </button>
                <button value="contest" className={styles.clusterpromotion} onClick={cardPlease}>
                  contest
                </button>
                <button value="education" className={styles.clusterpromotion} onClick={cardPlease}>
                  education
                </button>
                <button value="partnering" className={styles.clusterpromotion} onClick={cardPlease}>
                  partnering
                </button>
                <button value="promotion" className={styles.clusterpromotion} onClick={cardPlease}>
                  promotion
                </button>
                <button value="use" className={styles.clusterpromotion} onClick={cardPlease}>
                  use
                </button>
              </div>
            ) : (
              ""
            )}
            {sixp === "Proposition" ? (
              <div className={styles.select__cluster}>
                <button value="branding" className={styles.clusterproposition} onClick={cardPlease}>
                  branding
                </button>
                <button value="claims" className={styles.clusterproposition} onClick={cardPlease}>
                  claims
                </button>
                <button value="creative" className={styles.clusterproposition} onClick={cardPlease}>
                  creative
                </button>
                <button value="emotions" className={styles.clusterproposition} onClick={cardPlease}>
                  emotions
                </button>
                <button value="health" className={styles.clusterproposition} onClick={cardPlease}>
                  health
                </button>
                <button value="new moments" className={styles.clusterproposition} onClick={cardPlease}>
                  new moments
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        )}

        {/* card and idea board */}
        <div className={styles.boards__wrapper}>
          {/* card board */}
          <div className={styles.cards__board}>
            {!cardsOpen ? null : (
              <AnimatePresence custom={back}>
                <Card
                  custom={back}
                  variants={card}
                  initial="entry"
                  animate="center"
                  exit="exit"
                  key={visible}
                >
                  {/* 데이터 베이스에 의해 바뀌어야할 부분 : bar 색상, wnh, sixp, cluster, text 내용, icon 이미지 */}
                  
                  <div className={styles.card__bar } style={{backgroundColor: color}}>
                    <div className={styles.card__wnh}>{CardList[visible].wnh}</div>
                    <div className={styles.card__sixp}>{CardList[visible].sixp}</div>
                    <div className={styles.card__cluster}>{CardList[visible].cluster}</div>
                    <img
                      className={styles.card__number}
                      src="number1.png"
                      alt={visible}
                    />
                  </div>

                  <img className={styles.card__icon} src = {`${CardList[visible].sixp}.png`} />
      
                  <img className={styles.card__emoji} src="emoji.png" />
                  <span className={styles.card__text}>{CardList[visible].text}</span>
                </Card>
              </AnimatePresence>
            )}
          </div>
          {/* idea board */}
          <div className={styles.idea__wrapper}>
            <div className={styles.idea__board}>
              <div>
                <span className={styles.subtitle}>IdeaBoard</span>
                <ul className={styles.ul}>
                  {ideas.map((item, index) => (
                    <li key={index} className={styles.li}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card__face card__face--back">
                <div className="card__content"></div>
              </div>
                
              
            </div>

            <div className={styles.input__wrapper}>
              <form onSubmit={onSubmit}>
                <input
                  className={styles.input__idea}
                  onChange={onChanges}
                  value={idea}
                  type="text"
                  placeholder=" Type your idea"
                />
                <button className={styles.input__send}>Send</button>
              </form>
            </div>
            <div className={styles.idea__board_inspiration} style={{display: show_overlay === true ? 'none' : 'block'}}>
              <iframe src={`https://www.bing.com/images/search?q=${CardList[visible].Keyword}`} width="100%" height="100%" />
            </div>

            
          </div>  
          <button className={styles.inspiration} onClick={onoff}>Need Inspiration?</button>
        </div>
      </div>
      {!cardsOpen ? null : (
        <div className={styles.wrapper__pin}>
          <button className={styles.button__arrow} onClick={prevPlease}>
            &lt;
          </button>
          <Btn onClick={onClick}>{pin ? "Pinned📌" : "Pin this card"}</Btn>
          {/* next button click 할 때마다, 해당 카드를 result table(DB)에 넣을 수 있는지 */}
          <button className={styles.button__arrow} onClick={nextPlease}>
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}

export default SessionContent;

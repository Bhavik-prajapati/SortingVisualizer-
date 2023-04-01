import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [arr, setArr] = useState([]);
  const [speed, setSpeed] = useState(50);
  const [isvisible, isVisible] = useState(true);

  // -----------range-------------

  const handleSliderChange = (event) => {
    setSpeed(event.target.value);
    console.log("handle speed " + speed);
  };

  // -----------range-------------

  // -----------theme-------------

  const [color, setColor] = useState("#000000"); // default color is black

  const handleColorChange = (event) => {
    setColor(event.target.value);
    document.documentElement.style.setProperty("--primary", event.target.value);
  };

  const inputStyle = {
    backgroundColor: color,
    border: `1px solid ${color === "#ffffff" ? "black" : color}`, // set border color to black if color is white
    borderRadius: "50%",
    width: "50px",
    height: "50px",
  };

  const barStyle = {
    backgroundColor: color,
    border: `2px solid ${color === "#ffffff" ? "black" : color}`, // set border color to black if color is white
  };

  const btnstyle = {
    backgroundColor: color,
    border: `2px solid ${color === "#ffffff" ? "black" : color}`, // set border color to black if color is white
    color: `${color === "#ffffff" ? "black" : "white"}`,
  };

  const valuestyle = {
    color: `${color === "#ffffff" ? "black" : "white"}`,
  };

  // -----------theme-------------

  // -------togglebtn

  const [isOn, setIsOn] = useState(false);
  const handleToggle = () => {
    setIsOn(!isOn);
  };

  // -------togglebtn

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const arr = [];
    for (let i = 0; i < 50; i++) {
      arr.push(Math.floor(Math.random() * 300) + 5);
    }
    setArr(arr);
  };

  async function bubbleSort() {
    console.log("bubble speed " + speed);
    const len = arr.length;
    let swapped;
    do {
      swapped = false;

      for (let i = 0; i < len - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          await new Promise((resolve) => setTimeout(resolve, speed));
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          setArr([...arr]);
          swapped = true;
        }
      }
    } while (swapped);
  }

  return (
    <div className="container">
      <div className="array">
        {arr.map((value, idx) => (
          <div
            className="bar"
            key={idx}
            style={{
              ...barStyle,
              height: `${value}px`,
              width: "25px",
              // width: `${100 / arr.length}`,
            }}
          >
            <p id="value" style={valuestyle}>
              {isOn ? `${value}` : " "}
            </p>
          </div>
        ))}
      </div>

      <hr />

      <input
        type="range"
        min="100"
        max="200"
        step="1"
        value={speed}
        onChange={handleSliderChange}
      />

      <hr />

      <div className="btns">
        <button style={btnstyle} id="resetArray" onClick={resetArray}>
          Generate New Array
        </button>
        <button style={btnstyle} onClick={bubbleSort} id="bubblesort">
          BubbleSort
        </button>
      </div>

      <div className="themes">
        <input
          type="color"
          id="color-picker"
          name="color-picker"
          style={inputStyle}
          value={color}
          onChange={handleColorChange}
        />
      </div>

      {/* -----toggle btn */}

      <button
        id="textbtn"
        className={`toggle-button ${isOn ? "on" : "off"}`}
        onClick={handleToggle}
      >
        {isOn ? "TEXT ON💡" : "TEXT OFF🌩️"}
      </button>

      {/* -----toggle btn */}
    </div>
  );
}

export default App;

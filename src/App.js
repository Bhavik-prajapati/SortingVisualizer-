import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [arr, setArr] = useState([]);
  const [speed, setSpeed] = useState(50);
  const [isvisible, isVisible] = useState(true);

  const [disabledButton, setDisabledButton] = useState(null);

  const [highlighted, setHighlighted] = useState([]);

  // -----------range-------------

  const handleSliderChange = (event) => {
    setSpeed(event.target.value);
    console.log("handle speed " + speed);
  };

  // -----------range-------------

  // -----------theme-------------

  const [color, setColor] = useState("#402626"); // default color is black

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

  // ----algos
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
      let i = 0;

      while (i < len - 1) {
        let j = i + 1;
        let bar1 = document.getElementById(`bar${i}`);
        let bar2 = document.getElementById(`bar${j}`);

        bar1.style.backgroundColor = "red";
        bar2.style.backgroundColor = "red";

        if (arr[i] > arr[j]) {
          await new Promise((resolve) => setTimeout(resolve, speed));
          let temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          setArr([...arr]);
          swapped = true;
        }

        bar1.style.backgroundColor = "#0077FF";
        bar2.style.backgroundColor = "#0077FF";

        i++;
      }
    } while (swapped);
  }

  async function selectionSort() {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      let minIdx = i;
      for (let j = i + 1; j < len; j++) {
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        await new Promise((resolve) => setTimeout(resolve, speed));
        let temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
        setArr([...arr]);
        highlightBars(i, minIdx);
      }
    }
  }

  function highlightBars(bar1, bar2) {
    const bars = document.querySelectorAll(".bar");
    bars[bar1].style.backgroundColor = "yellow";
    bars[bar2].style.backgroundColor = "yellow";
    setTimeout(() => {
      bars[bar1].style.backgroundColor = "#6b5b95";
      bars[bar2].style.backgroundColor = "#6b5b95";
    }, speed);
  }

  async function partition(low, high) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        await new Promise((resolve) => setTimeout(resolve, speed));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        setArr([...arr]);
        highlightBars([i, j]);
      }
    }
    await new Promise((resolve) => setTimeout(resolve, speed));
    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    setArr([...arr]);
    highlightBars([i + 1, high]);
    return i + 1;
  }

  const highlightBar = (index) => {
    const bars = document.getElementsByClassName("bar");
    bars[index].style.backgroundColor = "yellow";
  };

  const unhighlightBar = (index) => {
    const bars = document.getElementsByClassName("bar");
    bars[index].style.backgroundColor = "0077FF";
  };

  async function quickSort() {
    const partition = async (start, end) => {
      const pivotIndex = Math.floor((start + end) / 2);
      const pivotValue = arr[pivotIndex];
      let i = start;
      let j = end;

      while (i <= j) {
        while (arr[i] < pivotValue) {
          i++;
        }
        while (arr[j] > pivotValue) {
          j--;
        }

        if (i <= j) {
          // highlight bars being swapped
          highlightBar(i);
          highlightBar(j);

          await new Promise((resolve) => setTimeout(resolve, speed));
          let temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          setArr([...arr]);

          // unhighlight bars after swap
          unhighlightBar(i);
          unhighlightBar(j);

          i++;
          j--;
        }
      }

      return i;
    };

    const sort = async (start, end) => {
      if (start < end) {
        const index = await partition(start, end);
        await sort(start, index - 1);
        await sort(index, end);
      }
    };

    await sort(0, arr.length - 1);
  }

  async function mergeSort() {
    const merge = async (arr, l, m, r) => {
      const n1 = m - l + 1;
      const n2 = r - m;

      let bar1 = document.getElementById(`bar${n1}`);
      let bar2 = document.getElementById(`bar${n2}`);

      bar1.style.backgroundColor = "red";
      bar2.style.backgroundColor = "red";

      const L = new Array(n1);
      const R = new Array(n2);

      for (let i = 0; i < n1; i++) {
        L[i] = arr[l + i];
      }
      for (let j = 0; j < n2; j++) {
        R[j] = arr[m + 1 + j];
      }

      let i = 0;
      let j = 0;
      let k = l;

      while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
          await new Promise((resolve) => setTimeout(resolve, speed));
          arr[k] = L[i];
          i++;
          bar1.style.backgroundColor = "#0077FF";
        } else {
          await new Promise((resolve) => setTimeout(resolve, speed));
          arr[k] = R[j];
          j++;
          bar2.style.backgroundColor = "#0077FF";
        }
        setArr([...arr]);
        k++;
      }

      while (i < n1) {
        await new Promise((resolve) => setTimeout(resolve, speed));
        arr[k] = L[i];
        setArr([...arr]);
        i++;
        k++;
        bar1.style.backgroundColor = "red";
      }

      while (j < n2) {
        await new Promise((resolve) => setTimeout(resolve, speed));
        arr[k] = R[j];
        setArr([...arr]);
        j++;
        k++;
        bar2.style.backgroundColor = "red";
      }

      bar1.style.backgroundColor = "#0077FF";
      bar2.style.backgroundColor = "#0077FF";
    };

    const mergeSortHelper = async (arr, l, r) => {
      if (l < r) {
        const m = Math.floor((l + r) / 2);
        await mergeSortHelper(arr, l, m);
        await mergeSortHelper(arr, m + 1, r);
        await merge(arr, l, m, r);
      }
    };

    const len = arr.length;
    const start = 0;
    const end = len - 1;

    const bar1 = document.getElementById(`bar${start}`);
    const bar2 = document.getElementById(`bar${end}`);
    bar1.style.backgroundColor = "red";
    bar2.style.backgroundColor = "red";

    await mergeSortHelper(arr, start, end);

    bar1.style.backgroundColor = "#0077FF";
    bar2.style.backgroundColor = "#0077FF";
  }

  async function insertionSort() {
    const len = arr.length;
    for (let i = 1; i < len; i++) {
      let current = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > current) {
        await new Promise((resolve) => setTimeout(resolve, speed));
        arr[j + 1] = arr[j];
        setArr([...arr]);
        document.getElementById(`bar${j + 1}`).style.backgroundColor = "red";
        j--;
      }
      arr[j + 1] = current;
      setArr([...arr]);
      document.getElementById(`bar${j + 1}`).style.backgroundColor = "#0077FF";
    }
  }

  //---------algos

  return (
    <div className="container">
      <h1 style={{ textTransform: "uppercase" }}>sorting visualizer</h1>

      <div className="array">
        {arr.map((value, idx) => (
          <div
            className={`bar ${highlighted.includes(idx) ? "highlighted" : ""}`}
            key={idx}
            id={`bar${idx}`}
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
        <button style={btnstyle} onClick={selectionSort} id="selectionSort">
          selectionSort
        </button>
        <button style={btnstyle} onClick={quickSort} id="quickSort">
          quickSort
        </button>
        <button style={btnstyle} onClick={insertionSort} id="insertionSort">
          insertionSort
        </button>
        <button style={btnstyle} onClick={mergeSort} id="mergeSort">
          mergeSort
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

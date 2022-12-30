import React from "react";
import ItemColorPicker from "../ItemColorPicker/ItemColorPicker";
import { useState } from "react";
import "./ChartVisualSettings.scss";
import GraphLinks from "../GraphLinks/GraphLinks";

function ChartVisualSettings({ showToast }) {
  let colorProfileArr = "";
  if (localStorage.getItem("colorProfile")) {
    colorProfileArr = JSON.parse(localStorage.getItem("colorProfile"));
  }

  const [housingColor, setHousingColor] = useState(
    colorProfileArr ? colorProfileArr[0] : "rgba(255, 99, 132, 0.5)"
  );
  const [utilitiesColor, setUtilitiesColor] = useState(
    colorProfileArr ? colorProfileArr[1] : "rgba(54, 162, 235, 0.5)"
  );
  const [personalColor, setPersonalColor] = useState(
    colorProfileArr ? colorProfileArr[2] : "rgba(255, 206, 86, 0.5)"
  );
  const [miscColor, setMiscColor] = useState(
    colorProfileArr ? colorProfileArr[3] : "rgba(75, 192, 192, 0.5)"
  );
  const [entertainmentColor, setEntertainmentColor] = useState(
    colorProfileArr ? colorProfileArr[4] : "rgba(153, 102, 255, 0.5)"
  );
  const [transportationColor, setTransportationColor] = useState(
    colorProfileArr ? colorProfileArr[5] : "rgba(255, 159, 64, 0.5)"
  );
  const [foodColor, setFoodColor] = useState(
    colorProfileArr ? colorProfileArr[6] : "rgba(40, 255, 225, 0.5)"
  );
  const [barIncomeColor, setBarIncomeColor] = useState(
    colorProfileArr ? colorProfileArr[7] : "rgba(245, 151, 39, 0.5)"
  );
  const [barSpendingColor, setBarSpendingColor] = useState(
    colorProfileArr ? colorProfileArr[8] : "rgba(39, 185, 245, 0.5)"
  );
  const [lineIncomeColor, setLineIncomeColor] = useState(
    colorProfileArr ? colorProfileArr[9] : "rgba(255, 102, 144, 0.5)"
  );
  const [lineSpendingColor, setLineSpendingColor] = useState(
    colorProfileArr ? colorProfileArr[10] : "rgb(53, 170, 245, 0.5)"
  );

  const [selectedGraph, setSelectedGraph] = useState("pie");
  const updateSelectedGraph = (graphName) => {
    setSelectedGraph(graphName);
  };

  const applyButtonHandler = () => {
    localStorage.setItem(
      "colorProfile",
      JSON.stringify([
        housingColor,
        utilitiesColor,
        personalColor,
        miscColor,
        entertainmentColor,
        transportationColor,
        foodColor,
        barIncomeColor,
        barSpendingColor,
        lineIncomeColor,
        lineSpendingColor,
      ])
    );
    showToast("Your preferences have been saved!");
  };

  const resetButtonHandler = () => {
    localStorage.removeItem("colorProfile");
    showToast("Your preferences have been reset!");
    setTimeout(() => {
      window.location.reload();
    }, 3200);
  };

  return (
    <div className="settings__colorpicker">
      <h3 className="settings__colorpicker-title">Visual Settings</h3>
      <div className="settings__colorpicker-chart-selector">
        <GraphLinks
          updateSelectedGraph={updateSelectedGraph}
          selectedGraph={selectedGraph}
        />
      </div>
      {selectedGraph === "pie" && (
        <>
          <ItemColorPicker
            name="Housing"
            color={housingColor}
            handleChangeComplete={({ rgb }) =>
              setHousingColor(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`)
            }
          />
          <ItemColorPicker
            name="Utilities"
            color={utilitiesColor}
            handleChangeComplete={({ rgb }) =>
              setUtilitiesColor(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`)
            }
          />
          <ItemColorPicker
            name="Personal"
            color={personalColor}
            handleChangeComplete={({ rgb }) =>
              setPersonalColor(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`)
            }
          />
          <ItemColorPicker
            name="Misc"
            color={miscColor}
            handleChangeComplete={({ rgb }) =>
              setMiscColor(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`)
            }
          />
          <ItemColorPicker
            name="Entertainment"
            color={entertainmentColor}
            handleChangeComplete={({ rgb }) =>
              setEntertainmentColor(
                `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`
              )
            }
          />
          <ItemColorPicker
            name="Transportation"
            color={transportationColor}
            handleChangeComplete={({ rgb }) =>
              setTransportationColor(
                `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`
              )
            }
          />
          <ItemColorPicker
            name="Food"
            color={foodColor}
            handleChangeComplete={({ rgb }) =>
              setFoodColor(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`)
            }
          />
        </>
      )}
      {selectedGraph === "bar" && (
        <>
          <ItemColorPicker
            name="Income"
            color={barIncomeColor}
            handleChangeComplete={({ rgb }) =>
              setBarIncomeColor(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`)
            }
          />
          <ItemColorPicker
            name="Spending"
            color={barSpendingColor}
            handleChangeComplete={({ rgb }) =>
              setBarSpendingColor(
                `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`
              )
            }
          />
        </>
      )}
      {selectedGraph === "line" && (
        <>
          <ItemColorPicker
            name="Income"
            color={lineIncomeColor}
            handleChangeComplete={({ rgb }) =>
              setLineIncomeColor(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`)
            }
          />
          <ItemColorPicker
            name="Spending"
            color={lineSpendingColor}
            handleChangeComplete={({ rgb }) =>
              setLineSpendingColor(
                `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`
              )
            }
          />
        </>
      )}
      <div className="settings__colorpicker-buttons">
        <button
          className="settings__colorpicker-reset-button"
          onClick={resetButtonHandler}
        >
          Reset
        </button>
        <button
          className="settings__colorpicker-apply-button"
          onClick={applyButtonHandler}
        >
          apply
        </button>
      </div>
    </div>
  );
}

export default ChartVisualSettings;

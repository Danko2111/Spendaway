import { useState } from "react";
import { GithubPicker } from "react-color";
import "./CategoryColorPicker.scss";

const CategoryColorPicker = ({ color, name, handleChangeComplete }) => {
  const [pickerVis, setPickerVis] = useState("");
  const updatePickerVis = () => {
    if (pickerVis === "") {
      setPickerVis("--show");
    } else {
      setPickerVis("");
    }
  };

  let colors = [
    "rgba(255, 99, 132, 0.5)",
    "rgba(54, 162, 235, 0.5)",
    "rgba(255, 206, 86, 0.5)",
    "rgba(75, 192, 192, 0.5)",
    "rgba(153, 102, 255, 0.5)",
    "rgba(255, 159, 64, 0.5)",
    "rgba(40, 255, 225, 0.5)",
  ];
  return (
    <div className="category">
      <div className="category__title">{name}</div>
      <div
        className={`category__color`}
        style={{ backgroundColor: color }}
        onClick={updatePickerVis}
      >
        {" "}
        <div className={`category__color-picker${pickerVis}`}>
          <GithubPicker
            onChangeComplete={(e) => {
              handleChangeComplete(e);
              updatePickerVis();
            }}
            colors={colors}
            triangle="hide"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryColorPicker;

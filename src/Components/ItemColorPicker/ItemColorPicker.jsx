import { useState } from "react";
import { GithubPicker } from "react-color";
import "./ItemColorPicker.scss";

const ItemColorPicker = ({ color, name, handleChangeComplete }) => {
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
    "rgba(245, 151, 39, 0.5)",
    "rgba(39, 185, 245, 0.5)",
    "rgba(255, 102, 144, 0.5)",
    "rgb(53, 170, 245, 0.5)",
  ];
  return (
    <div className="item">
      <div className="item__title">{name}</div>
      <div
        className={`item__color`}
        style={{ backgroundColor: color }}
        onClick={updatePickerVis}
      >
        {" "}
        <div className={`item__color-picker${pickerVis}`}>
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

export default ItemColorPicker;

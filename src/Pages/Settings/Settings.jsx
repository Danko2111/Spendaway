import NavBlock from "../../Components/NavBlock/NavBlock";
import "./Settings.scss";
import CategoryColorPicker from "../../Components/CategoryColorPicker/CategoryColorPicker";
import { useState } from "react";

const Settings = () => {
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
      ])
    );
  };

  return (
    <div className="settings">
      <NavBlock />
      <div className="settings__content">
        <div className="settings__user-details">
          <h3 className="settings__user-details-title">User Settings</h3>
        </div>
        <div className="settings__colorpicker">
          <h3 className="settings__colorpicker-title">Visual Settings</h3>
          <CategoryColorPicker
            name="Housing"
            color={housingColor}
            handleChangeComplete={({ rgb }) =>
              setHousingColor(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`)
            }
          />
          <CategoryColorPicker
            name="Utilities"
            color={utilitiesColor}
            handleChangeComplete={({ rgb }) =>
              setUtilitiesColor(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`)
            }
          />
          <CategoryColorPicker
            name="Personal"
            color={personalColor}
            handleChangeComplete={({ rgb }) =>
              setPersonalColor(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`)
            }
          />
          <CategoryColorPicker
            name="Misc"
            color={miscColor}
            handleChangeComplete={({ rgb }) =>
              setMiscColor(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`)
            }
          />
          <CategoryColorPicker
            name="Entertainment"
            color={entertainmentColor}
            handleChangeComplete={({ rgb }) =>
              setEntertainmentColor(
                `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`
              )
            }
          />
          <CategoryColorPicker
            name="Transportation"
            color={transportationColor}
            handleChangeComplete={({ rgb }) =>
              setTransportationColor(
                `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`
              )
            }
          />
          <CategoryColorPicker
            name="Food"
            color={foodColor}
            handleChangeComplete={({ rgb }) =>
              setFoodColor(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`)
            }
          />
          <div className="settings__colorpicker-apply">
            <button
              className="settings__colorpicker-apply-button"
              onClick={applyButtonHandler}
            >
              apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

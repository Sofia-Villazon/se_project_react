import { useState, useContext, useEffect } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../hooks/contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  return (
    <div className="toggle-switch">
      <label htmlFor="toggle-switch" className="toggle-switch__label">
        <input
          id="toggle-switch"
          type="checkbox"
          className="toggle-switch_checkbox toggle-switch__checkbox_hidden"
          onChange={handleSwitchChange}
        />
        <span className="toggle-switch__temp-value">F</span>
        <span className="toggle-switch__temp-value">C</span>
        <div className="toggle-switch__checkbox toggle-switch__checkbox_visible">
          <span className="toggle-switch__temp-value toggle-switch__temp-value_white">
            F
          </span>
          <span className="toggle-switch__temp-value toggle-switch__temp-value_white">
            C
          </span>
        </div>
        {/* <span className="toggle-switch__checkbox toggle-switch__checkbox_visible" /> */}
      </label>
    </div>
  );
}

export default ToggleSwitch;

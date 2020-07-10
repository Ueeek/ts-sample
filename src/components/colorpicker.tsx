import React from "react";
import { Color } from "../models/color";

interface Props {
  color: Color;
  onColorUpdated: (color: Color) => void;
}

interface PropsColorSlider {
  value: number;
  onValueUpdated: (newValue: number) => void;
}

const updateColor = (props: Props, colorId: keyof Color) => (value: number) => {
  props.onColorUpdated({
    ...props.color,
    [colorId]: value,
  });
};

const ColorSliderComponent = (props: PropsColorSlider) => {
  return (
    <div>
      <input
        type="range"
        min="0"
        max="255"
        value={props.value}
        onChange={(event) => props.onValueUpdated(+event.target.value)}
      />
      {props.value}
    </div>
  );
};

export const ColorPicker = (props: Props) => {
  return (
    <>
      {(Object.keys(props.color) as (keyof Color)[]).map((field) => (
        <ColorSliderComponent
          key={field}
          value={props.color[field]}
          onValueUpdated={updateColor(props, field)}
        />
      ))}
    </>
  );
};

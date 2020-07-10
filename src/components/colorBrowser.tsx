import React from "react"
import {Color} from "../models/color"

interface Props{
  color: Color,
}

export const ColorBrowser = (props: Props)=>{
  const divStyle: React.CSSProperties ={
    width:"11rem",
    height:"7em",
    backgroundColor: `rgb(${props.color.red},${props.color.green},${props.color.blue})`
  };
  return <div style={divStyle}/>
};

import React,{StatelessComponent,CSSProperties} from "react";

const classNames = require("./sidebar.css");

interface Props{
  isVisible: boolean;
}

const divStyle = (props:Props): CSSProperties => ({
  width:(props.isVisible)? "23rem":"0rem"
});

export const SidebarComponent:StatelessComponent<Props> = (props) => (
  <div id="myDidenav" className={classNames.sideNav} style={divStyle(props)}>
    {props.children}
  </div>
);

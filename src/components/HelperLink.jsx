import React from "react";

const HelperLink = (props) => {
  const style = props.black
    ? { color: "black", cursor: "text", textDecoration: "none" }
    : {};
  if (props.noMargin) {
    style.margin = "0px 0px";
  }
  return (
    <span style={style} className="helper-link">
      {props.children}
    </span>
  );
};

export default HelperLink;

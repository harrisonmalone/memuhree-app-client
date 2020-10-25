import React from "react";

const HelperLink = (props) => {
  const style = props.black ? { color: "black", cursor: "none", textDecoration: "none" } : {}
  return <span style={style} className="helper-link">{props.children}</span>;
};

export default HelperLink;

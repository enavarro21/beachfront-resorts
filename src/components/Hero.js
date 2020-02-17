import React from "react";

// Option for changing the class name every time Hero is rendered
export default function Hero({ children, hero }) {
  return <header className={hero}>{children}</header>;
}

Hero.defaultProps ={
  hero: "defaultHero"
};
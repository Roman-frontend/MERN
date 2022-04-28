import React, { useEffect } from "react";
import App from "./App";

export function MountDomEffect() {
  useEffect(() => {
    console.log("Mounted App Componnent");
  }, []);

  return <App />;
}

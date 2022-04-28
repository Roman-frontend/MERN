import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import { MountDomEffect } from "./MountDomEffect";
import * as serviceWorker from "./serviceWorker";

const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(<MountDomEffect />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// For study of hydrate
// import { hydrateRoot } from 'react-dom/client';
// const container = document.getElementById('root');
// const root = hydrateRoot(container, <MountDomEffect />);

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

require("shopify_app");

import React from "react";
import ReactDOM from "react-dom";
import { AppProvider } from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";

import WebVitals from "./WebVitals";
import "@shopify/polaris/styles.css";

const root = document.getElementById("root");

ReactDOM.render(
  <AppProvider i18n={en}>
    <WebVitals
      self={root.dataset.self}
      benchmark={JSON.parse(root.dataset.benchmark)}
    />
  </AppProvider>,
  root
);

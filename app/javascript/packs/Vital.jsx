import React from "react";
import { Card } from "@shopify/polaris";

function Vital(props) {
  return (
    <Card sectioned>
      <Card.Section title={props.origin}>[TODO]</Card.Section>
      {props.other.map((item) => (
        <Card.Section title={item} subdued={true} key={item}>
          [TODO]
        </Card.Section>
      ))}
    </Card>
  );
}

export default Vital;

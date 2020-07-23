import React from "react";
import { Badge, Card, Stack, Subheading } from "@shopify/polaris";

function status(metric, value) {
  var label = "critical";
  switch (metric) {
    //
    // Using thresholds from: https://web.dev/vitals/#core-web-vitals
    //
    case "largest_contentful_paint":
      if (value <= 2500) {
        label = "success";
      } else if (value > 2500 && value <= 4000) {
        label = "warning";
      }
      break;
    case "first_input_delay":
      if (value <= 100) {
        label = "success";
      } else if (value > 100 && value <= 300) {
        label = "warning";
      }
      break;
    case "cumulative_layout_shift":
      if (value <= 0.1) {
        label = "success";
      } else if (value > 0.1 && value <= 0.25) {
        label = "warning";
      }
  }
  return label;
}

function VitalHeader(props) {
  return (
    <Stack>
      <Stack.Item fill>
        <Subheading>{props.origin}</Subheading>
      </Stack.Item>
      <Stack.Item>
        <Badge status={status(props.metric, props.p75)}>
          {props.p75}
          {props.metric != "cumulative_layout_shift" && "ms"} @ P75
        </Badge>
      </Stack.Item>
    </Stack>
  );
}

function VitalGraph(props) {
  const classNames = ["bar_good", "bar_ni", "bar_poor"];
  return (
    <div className={"stacked_graph"}>
      {props.data.map((value, i) => {
        return (
          <span
            style={{ flexGrow: Math.round(value.density * 100) }}
            className={classNames[i]}
            key={props.metric + classNames[i]}
          >
            {Math.round(value.density * 100)}%
          </span>
        );
      })}
    </div>
  );
}

function CoreVital(props) {
  const { error, isLoaded, data } = props.state;
  const metric = props.metric;

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Card sectioned>
        <Card.Section
          title={
            <VitalHeader
              metric={metric}
              origin={data[0].origin}
              p75={data[0]["metrics"][metric]["percentiles"]["p75"]}
            />
          }
        >
          <VitalGraph
            metric={metric}
            data={data[0]["metrics"][metric]["histogram"]}
          />
        </Card.Section>
        {/* TODO */}
        {/* {props.sites.other.map((item) => (
          <Card.Section title={item} subdued={true} key={item}>
            [TODO]
          </Card.Section>
        ))} */}
      </Card>
    );
  }
}

export default CoreVital;

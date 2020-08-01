import React from "react";
import {
  Badge,
  Card,
  Stack,
  Subheading,
  TextStyle,
  Tooltip,
} from "@shopify/polaris";

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
  const { origin, metric, p75 } = props,
    metricName = metric
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  return (
    <Stack>
      <Stack.Item fill>
        <Subheading>{origin}</Subheading>
      </Stack.Item>
      <Stack.Item>
        <Tooltip
          content={`75% of user experiences see ${metricName} of less than ${p75}`}
          preferredPosition={"above"}
        >
          <Badge status={status(metric, p75)}>
            {p75}
            {metric != "cumulative_layout_shift" && "ms"} @ P75
          </Badge>
        </Tooltip>
      </Stack.Item>
    </Stack>
  );
}

function VitalGraph(props) {
  const { data, metric } = props,
    classNames = ["good", "ni", "poor"];

  return (
    <div className="stacked_graph">
      <span className="p75"></span>
      {data.map((value, i) => {
        let density = Math.round(value.density * 100);
        return (
          <div
            style={{ flexGrow: density }}
            className={"bar_" + classNames[i]}
            key={metric + classNames[i]}
          >
            <Tooltip
              content={`${density}% of user experiences are ${classNames[
                i
              ].toLocaleUpperCase()}`}
            >
              <span>{density}%</span>
            </Tooltip>
          </div>
        );
      })}
    </div>
  );
}

function CoreVitalCard(props) {
  const { metric, origin, data, subdued } = props;
  if (data.status != 200) {
    return (
      <Card.Section title={<Subheading>{origin}</Subheading>} subdued={subdued}>
        <TextStyle variation="subdued">
          Chrome UX Report does not currently have enough data for this origin.
        </TextStyle>
      </Card.Section>
    );
  }

  const rum = data.resp.record.metrics[metric];
  return (
    <Card.Section
      title={
        <VitalHeader
          metric={metric}
          origin={origin}
          p75={rum.percentiles.p75}
        />
      }
      subdued={subdued}
    >
      <VitalGraph metric={metric} data={rum.histogram} />
    </Card.Section>
  );
}

function CoreVital(props) {
  const { loading, self, cruxData } = props.state;
  const metric = props.metric;

  if (loading) {
    // TODO
    return <div>Loading...</div>;
  } else {
    let selfResp = cruxData.find((resp) => resp.origin === self),
      benchmarkResp = cruxData.filter((resp) => resp.origin != self);

    return (
      <Card sectioned>
        <CoreVitalCard
          metric={metric}
          origin={self}
          data={selfResp}
          subdued={false}
          key={metric + "-" + self}
        />
        {benchmarkResp.map((b) => {
          return (
            <CoreVitalCard
              metric={metric}
              origin={b.origin}
              data={b}
              subdued={true}
              key={metric + "-" + b.origin}
            />
          );
        })}
      </Card>
    );
  }
}

export default CoreVital;

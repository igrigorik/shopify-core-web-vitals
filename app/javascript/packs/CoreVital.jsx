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
  const { origin, metric, p75 } = props;
  return (
    <Stack>
      <Stack.Item fill>
        <Subheading>{origin}</Subheading>
      </Stack.Item>
      <Stack.Item>
        <Badge status={status(metric, p75)}>
          {p75}
          {metric != "cumulative_layout_shift" && "ms"} @ P75
        </Badge>
      </Stack.Item>
    </Stack>
  );
}

function VitalGraph(props) {
  const { data, metric } = props,
    classNames = ["bar_good", "bar_ni", "bar_poor"];
  return (
    <div className={"stacked_graph"}>
      {data.map((value, i) => {
        return (
          <span
            style={{ flexGrow: Math.round(value.density * 100) }}
            className={classNames[i]}
            key={metric + classNames[i]}
          >
            {Math.round(value.density * 100)}%
          </span>
        );
      })}
    </div>
  );
}

function CoreVitalCard(props) {
  const { metric, origin, data, subdued } = props;
  return (
    <Card.Section
      title={
        <VitalHeader
          metric={metric}
          origin={origin}
          p75={data.percentiles.p75}
        />
      }
      subdued={subdued}
    >
      <VitalGraph metric={metric} data={data.histogram} />
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
          data={selfResp.resp.record.metrics[metric]}
          subdued={false}
          key={metric + "-" + self}
        />
        {benchmarkResp.map((b) => {
          return (
            <CoreVitalCard
              metric={metric}
              origin={b.origin}
              data={b.resp.record.metrics[metric]}
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

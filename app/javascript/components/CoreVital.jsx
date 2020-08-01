import React from "react";
import {
  Badge,
  Card,
  Stack,
  Subheading,
  TextStyle,
  Tooltip,
} from "@shopify/polaris";

function interpret_cwv(metric, p75) {
  let result = { badge: "critical" };

  // Using thresholds from: https://web.dev/vitals/#core-web-vitals
  switch (metric) {
    // bar_tip: X% of user experiences are GOOD with LCP of <2500ms
    //          X% of user experiences NEED IMPROVEMENT with FID of >100ms and <300ms
    //          X% of user experiences are POOR with LCP of >4000ms

    case "largest_contentful_paint":
      result.p75_tip = `This site does not meet Web Vitals recommendation for LCP:
                         75th percentile exceeds recommended <2500ms threshold`;
      if (p75 <= 2500) {
        result.badge = "success";
        result.p75_tip = `This site meets Web Vitals recommendation for LCP:
                          75% of user experiences have LCP of <2500ms;`;
      } else if (p75 > 2500 && p75 <= 4000) {
        result.badge = "warning";
      }
      break;
    case "first_input_delay":
      result.p75_tip = `This site does not meet Web Vitals recommendation for FID:
      75th percentile exceeds recommended <100ms threshold`;
      if (p75 <= 100) {
        result.badge = "success";
        result.p75_tip = `This site meets Web Vitals recommendation for FID:
        75% of user experiences have LCP of <100ms;`;
      } else if (p75 > 100 && p75 <= 300) {
        result.badge = "warning";
      }
      break;
    case "cumulative_layout_shift":
      result.p75_tip = `This site does not meet Web Vitals recommendation for CLS:
      75th percentile exceeds recommended <0.1 threshold`;
      if (p75 <= 0.1) {
        result.badge = "success";
        result.p75_tip = `This site meets Web Vitals recommendation for CLS:
                          75% of user experiences have CLS of <0.1;`;
      } else if (p75 > 0.1 && p75 <= 0.25) {
        result.badge = "warning";
      }
  }
  return result;
}

function VitalHeader(props) {
  const { origin, metric, p75 } = props,
    metricName = metric
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()),
    metricResult = interpret_cwv(metric, p75);

  return (
    <Stack>
      <Stack.Item fill>
        <Subheading>{origin}</Subheading>
      </Stack.Item>
      <Stack.Item>
        <Tooltip content={metricResult.p75_tip} preferredPosition={"above"}>
          <Badge status={metricResult.badge}>
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
    classNames = ["good", "ni", "poor"],
    metricResult = {
      largest_contentful_paint: [
        "are GOOD with LCP of <2500ms",
        "NEED IMPROVEMENT with LCP of >2500ms and <4000ms",
        "are POOR with LCP of >400ms",
      ],
      first_input_delay: [
        "are GOOD with FID of <100ms",
        "NEED IMPROVEMENT with FID of >100ms and <250ms",
        "are POOR with FID of >250ms",
      ],
      cumulative_layout_shift: [
        "are GOOD with CLS of <0.1",
        "NEED IMPROVEMENT with CLS of >0.1 and <0.25",
        "are POORwith CLS of >0.25",
      ],
    };

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
              content={`${density}% of user experiences ${metricResult[metric][i]}`}
            >
              <span className="density">{density}%</span>
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

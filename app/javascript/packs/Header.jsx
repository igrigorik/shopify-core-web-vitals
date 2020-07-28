import React, { useCallback, useState } from "react";
import { Card, Link, Button, Collapsible, Stack } from "@shopify/polaris";

function CollapsibleOriginList(props) {
  const [active, setActive] = useState(false);
  const handleToggle = useCallback(() => setActive((active) => !active), []);

  // TODO, probably makes more sense to wire up own component instead of Card.Section
  // https://github.com/Shopify/polaris-react/blob/master/src/components/Card/components/Section/Section.tsx
  return (
    <Stack vertical>
      <Button
        onClick={handleToggle}
        ariaExpanded={active}
        ariaControls="benchmark-origins"
        fullWidth
      >
        Customize benchmark stores
      </Button>
      <Collapsible
        open={active}
        id="benchmark-origins"
        transition={{ duration: "150ms", timingFunction: "ease" }}
      >
        <Card sectioned>
          {props.benchmark.map((origin) => {
            return (
              <Card.Section
                title={origin}
                key={"list-" + origin}
                actions={[
                  {
                    content: "Delete",
                    destructive: true,
                    onAction: (e) => {
                      props.onChange(origin);
                    },
                  },
                ]}
              />
            );
          })}
        </Card>
      </Collapsible>
    </Stack>
  );
}

function Header(props) {
  return (
    <Card
      title="Essential user experience metrics for a healthy store"
      sectioned
    >
      <p>
        Optimizing quality of user experience is critical to the success of
        every storefront.{" "}
        <Link
          url="https://blog.chromium.org/2020/05/introducing-web-vitals-essential-metrics.html"
          external={true}
          monochrome={true}
        >
          Core Web Vitals
        </Link>{" "}
        are a set of metrics and thresholds that capture the core user
        experience needs of fast loading experience, interactivity, and visual
        stability.
      </p>
      <br />
      <p>
        Core Web Vitals are part of the upcoming{" "}
        <Link
          url="https://webmasters.googleblog.com/2020/05/evaluating-page-experience.html"
          external={true}
          monochrome={true}
        >
          page experience signal
        </Link>{" "}
        for Google Search, are widely available across popular Google web
        developer tools, and can be tracked by every site owner both in{" "}
        <Link
          url="https://web.dev/vitals-tools/"
          external={true}
          monochrome={true}
        >
          development and in production
        </Link>
        .
      </p>
      <br />
      <p>
        This report provides a view into how real-world Google Chrome users
        experience your Shopify-powered storefront, as captured by the{" "}
        <Link
          url="https://developers.google.com/web/tools/chrome-user-experience-report"
          external={true}
          monochrome={true}
        >
          Chrome UX Report
        </Link>
        , and enables you to benchmark your site against a custom list of
        competitors.
      </p>
      <br />
      <CollapsibleOriginList
        benchmark={props.benchmark}
        onChange={props.onChange}
      />
    </Card>
  );
}

export default Header;

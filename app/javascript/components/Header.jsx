import React, { useCallback, useState } from "react";
import {
  Card,
  Link,
  Button,
  Collapsible,
  Stack,
  TextField,
} from "@shopify/polaris";

const URL_regex = /(?<origin>https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4})\b[-a-zA-Z0-9@:%_\+.~#?&//=]*/;

function CollapsibleOriginList(props) {
  const [active, setActive] = useState(false);
  const handleToggle = useCallback(() => setActive((active) => !active), []);

  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorValue, setErrorValue] = useState("");

  const [textFieldValue, setTextFieldValue] = useState("");
  const handleTextFieldChange = useCallback((value) => {
    setErrorValue(""); // input changed, reset any errors
    let result = value.match(URL_regex);
    if (result) setDisabled(false);
    else setDisabled(true);

    // this may be aggressive UX with auto chomp on beyond TLD, we'll see..
    setTextFieldValue(result?.groups.origin ?? value);
  }, []);

  const handleAdd = () => {
    let newOrigin = textFieldValue;
    if (props.benchmark.includes(newOrigin)) {
      setTextFieldValue("");
      return;
    }

    setLoading(true);
    props.fetchData([newOrigin]).then((resp) => {
      if (resp[0].status == 200) {
        props.addBenchmark(newOrigin, resp);
        setTextFieldValue("");
      } else {
        setErrorValue(`Chrome UX Report does not have data for ${newOrigin}.`);
      }
      setLoading(false);
    });
  };

  const addButton = (
    <Button disabled={disabled} loading={loading} onClick={handleAdd}>
      Check if site is available in Chrome UX Report
    </Button>
  );

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
                      props.removeBenchmark(origin);
                    },
                  },
                ]}
              />
            );
          })}
          <Card.Section subdued={true}>
            <TextField
              label="Add another comparison site:"
              value={textFieldValue}
              onChange={handleTextFieldChange}
              error={errorValue}
              placeholder="https://www.example.com"
              helpText="Provide full URL (e.g. https://www.example.com) of the site you would like to add to the benchmark."
            />
            {addButton}
          </Card.Section>
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
        addBenchmark={props.addBenchmark}
        removeBenchmark={props.removeBenchmark}
        fetchData={props.fetchData}
      />
    </Card>
  );
}

export default Header;

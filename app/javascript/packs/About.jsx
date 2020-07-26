import React from "react";
import { MediaCard, Link, TextContainer } from "@shopify/polaris";

function About(props) {
  return (
    <MediaCard
      title="Essential user experience metrics for a healthy store"
      primaryAction={{
        content: "Customize benchmark stores",
        onAction: () => {},
      }}
      secondaryAction={{
        content: "Learn more about Web Vitals",
        external: true,
        url: "https://web.dev/vitals/",
      }}
      description={
        <>
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
          <br />
          <br />
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
          <br />
          <br />
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
        </>
      }
      size="small"
    >
      <img
        alt=""
        width="100%"
        height="100%"
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
        src="https://webdev.imgix.net/vitals/web-vitals.svg"
      />
    </MediaCard>
  );
}

export default About;

import React from "react";
import { MediaCard, Link, TextContainer } from "@shopify/polaris";

function About(props) {
  return (
    <MediaCard
      title="Core Web Vitals"
      primaryAction={{
        content: "Customize benchmark sites",
        onAction: () => {},
      }}
      secondaryAction={{
        content: "Learn about Core Web Vitals on web.dev",
        external: true,
        url: "https://web.dev/vitals/#core-web-vitals",
      }}
      description={
        <>
          Delivering fast loading, responsive, and visually stable user
          experience is critical to every shop's long-term success on the web.
          Core Web Vitals are a set of metrics and thresholds—defined by
          Google's{" "}
          <Link
            url="https://blog.chromium.org/2020/05/introducing-web-vitals-essential-metrics.html"
            external={true}
            monochrome={true}
          >
            Web Vitals program
          </Link>
          — that capture these core user experience needs.
          <br />
          <br />
          Core Web Vitals are{" "}
          <Link
            url="https://developers.google.com/web/fundamentals/performance/speed-tools"
            external={true}
            monochrome={true}
          >
            field measurable
          </Link>
          , have supporting lab diagnostic metric equivalents and{" "}
          <Link
            url="https://web.dev/vitals-tools/"
            external={true}
            monochrome={true}
          >
            tooling
          </Link>
          , and part of the{" "}
          <Link
            url="https://webmasters.googleblog.com/2020/05/evaluating-page-experience.html"
            external={true}
            monochrome={true}
          >
            page experience signal
          </Link>{" "}
          for Google Search.
        </>
      }
      // popoverActions={[{ content: "Dismiss", onAction: () => {} }]} // TODO
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

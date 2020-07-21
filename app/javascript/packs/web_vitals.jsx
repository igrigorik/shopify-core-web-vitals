import React from "react";
import About from "./About";
import Vital from "./Vital";

import {
  Layout,
  Page,
  Link,
  TextContainer,
  TextStyle,
  Subheading,
  Stack,
} from "@shopify/polaris";

export default class WebVitals extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      sites: null,
    };
  }

  render() {
    return (
      <Page forceRender={false} titleHidden={false} fullWidth={true}>
        <Layout>
          <Layout.Section>
            <About />
          </Layout.Section>
          <Layout.AnnotatedSection
            title="Largest Contentful Paint (LCP)"
            description={
              <TextContainer>
                <p>
                  Tracks the render time of the largest content element (image
                  or text) visible to the user when the page is loading.
                </p>
                <Subheading>
                  <Link url="https://web.dev/lcp" external={true}>
                    web.dev/lcp
                  </Link>
                </Subheading>
              </TextContainer>
            }
          >
            <Vital origin={this.props.origin} other={this.props.other} />
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection
            title="First Input Delay (FID)"
            description={
              <TextContainer>
                <p>Tracks ...</p>
                <Subheading>
                  <Link url="https://web.dev/fid" external={true}>
                    web.dev/fid
                  </Link>
                </Subheading>
              </TextContainer>
            }
          >
            <Vital origin={this.props.origin} other={this.props.other} />
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection
            title="Cumulative Layout Shift (CLS)"
            description={
              <TextContainer>
                <p>Tracks ...</p>
                <Subheading>
                  <Link url="https://web.dev/cls" external={true}>
                    web.dev/cls
                  </Link>
                </Subheading>
              </TextContainer>
            }
          >
            <Vital origin={this.props.origin} other={this.props.other} />
          </Layout.AnnotatedSection>

          <Layout.Section>
            <Stack>
              <Stack.Item fill></Stack.Item>
              <Stack.Item>
                <TextStyle variation="subdued">
                  Powered by{" "}
                  <Link
                    url="https://developers.google.com/web/tools/chrome-user-experience-report"
                    external={true}
                    monochrome={true}
                  >
                    Chrome User Experience Report
                  </Link>
                </TextStyle>
              </Stack.Item>
            </Stack>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }
}

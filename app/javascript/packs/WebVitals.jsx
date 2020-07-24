import React from "react";
import About from "./About";
import CoreVital from "./CoreVital";

import {
  Layout,
  Page,
  Link,
  TextContainer,
  TextStyle,
  Subheading,
  Stack,
} from "@shopify/polaris";

const API_KEY = "AIzaSyDhSWG0ZzIbgxRsokw129YdjfQ8Kuxas4I";

export default class WebVitals extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign(
      {
        loading: true,
        cruxData: [],
      },
      props
    );
  }

  fetchData(origins) {
    Promise.all(
      origins.map((origin) => {
        return fetch(
          "https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=" +
            API_KEY,
          {
            method: "post",
            body: JSON.stringify({ origin: origin }),
          }
        )
          .then((response) => {
            return response.json().then((resp) => ({
              status: response.status,
              origin: origin,
              resp,
            }));
          })
          .catch((error) => {
            return {
              status: 0,
              error,
              origin,
            };
          });
      })
    ).then((cruxData) => {
      this.setState(
        {
          loading: false,
          cruxData,
        },
        (error) => {
          this.setState({
            loading: false,
            error,
          });
        }
      );
    });
  }

  componentDidMount() {
    this.fetchData([].concat(this.props.self).concat(this.props.benchmark));
  }

  render() {
    return (
      <Page forceRender={false} titleHidden={false} fullWidth={true}>
        <Layout>
          <Layout.Section>
            <About />
          </Layout.Section>

          {/* Render LCP */}
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
            <CoreVital metric={"largest_contentful_paint"} state={this.state} />
          </Layout.AnnotatedSection>

          {/* Render FID */}
          <Layout.AnnotatedSection
            title="First Input Delay (FID)"
            description={
              <TextContainer>
                <p>Tracks ... [TODO]</p>
                <Subheading>
                  <Link url="https://web.dev/fid" external={true}>
                    web.dev/fid
                  </Link>
                </Subheading>
              </TextContainer>
            }
          >
            <CoreVital metric={"first_input_delay"} state={this.state} />
          </Layout.AnnotatedSection>

          {/* Render CLS */}
          <Layout.AnnotatedSection
            title="Cumulative Layout Shift (CLS)"
            description={
              <TextContainer>
                <p>Tracks ... [TODO]</p>
                <Subheading>
                  <Link url="https://web.dev/cls" external={true}>
                    web.dev/cls
                  </Link>
                </Subheading>
              </TextContainer>
            }
          >
            <CoreVital metric={"cumulative_layout_shift"} state={this.state} />
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

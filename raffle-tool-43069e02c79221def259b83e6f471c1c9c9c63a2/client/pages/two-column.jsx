import { Card, Layout, Page } from "@shopify/polaris";

const TwoColumn = () => (
  <Page>
    <Layout>
      <Layout.Section oneHalf>
        <Card>
          <div>Put content here</div>
          <a href="https://polaris.shopify.com/components/structure/layout">
            See Polaris docs
          </a>
        </Card>
      </Layout.Section>
      <Layout.Section oneHalf>
        <Card>Put content here</Card>
      </Layout.Section>
    </Layout>
  </Page>
);
export default TwoColumn;

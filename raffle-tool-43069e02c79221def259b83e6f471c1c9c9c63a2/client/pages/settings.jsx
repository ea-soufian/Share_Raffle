import {
  Heading,
  Page,
  FormLayout,
  Layout,
  Card,
  TextField,
  Tag,
  Banner,
  Stack,
  ButtonGroup,
  Button,
  Select,
  ResourceList,
  ResourceItem,
  Thumbnail,
  TextStyle,
} from "@shopify/polaris";

import { LocationMajor, LocationsMinor } from "@shopify/polaris-icons";

// const [ installDate, setInstallDate ] = useState (' DATUMM ')

const Index = () => (
  <Page>
    <Layout>
      <Layout.AnnotatedSection // Regions
        title="Locations"
        description="Manage the places you have raffles."
      >
        <Card>
          <ResourceList
            resourceName={{ singular: "customer", plural: "customers" }}
            items={[
              {
                id: 341,
                url: "customers/341",
                name: "Mae Jemison",
                location: "Decatur, USA",
              },
              {
                id: 256,
                url: "customers/256",
                name: "Ellen Ochoa",
                location: "Los Angeles, USA",
              },
            ]}
            renderItem={(item) => {
              const { id, url, name, location } = item;
              const media = (
                <Thumbnail
                  source={LocationsMinor}
                  size="small"
                  alt="Location"
                />
              );

              return (
                <ResourceItem
                  id={id}
                  url={url}
                  media={media}
                  accessibilityLabel={`View details for ${name}`}
                >
                  <h3>
                    <TextStyle variation="strong">{name}</TextStyle>
                  </h3>
                  <div>{location}</div>
                </ResourceItem>
              );
            }}
          />
        </Card>

        <Card sectioned>
          <FormLayout>
            <TextField
              label="Creation date"
              // value={installDate}
              value="TODAY"
              onChange={() => {}}
            />
            <TextField label="Product tag" onChange={() => {}} />

            <Stack>
              <Tag onRemove={() => {}}>Raffle</Tag>
            </Stack>
          </FormLayout>
        </Card>
      </Layout.AnnotatedSection>

      <Layout.AnnotatedSection // Automatically create campaigns from product tag
        title="Automatically create campaigns from product tag"
        description="Create raffles automatically from products tagged with *"
      >
        <Card sectioned>
          <FormLayout>
            <TextField label="Product creation date" onChange={() => {}} />
            <Banner>
              This will create drafts for products that were created after the
              specified date{" "}
            </Banner>

            <TextField label="Product tag" onChange={() => {}} />
            <Stack>
              <Tag onRemove={() => {}}>Raffle</Tag>
              <Tag onRemove={() => {}}>Limited</Tag>
              <Tag onRemove={() => {}}>Hype</Tag>
            </Stack>
          </FormLayout>
        </Card>
      </Layout.AnnotatedSection>

      <Layout.AnnotatedSection // Custom fields for raffle
        // title="Custom fields for raffle information"
        title="Raffle listings"
        description="Metafield code [namespace and key] that hold information about the raffles."
      >
        <Card title="Online store dashboard" sectioned>
          <FormLayout>
            <ButtonGroup segmented>
              <Button disabled>Blog Posts</Button>
              <Button disabled outline>
                Pages
              </Button>
            </ButtonGroup>

            <TextField label="Product ID" onChange={() => {}} />
            <TextField label="Product ID" onChange={() => {}} />
            <TextField label="Product information (JSON)" onChange={() => {}} />
            <TextField label="Start date and time" onChange={() => {}} />
            <TextField label="End date and time" onChange={() => {}} />
            <TextField label="Region or location" onChange={() => {}} />
          </FormLayout>
        </Card>
      </Layout.AnnotatedSection>
    </Layout>
  </Page>
);

export default Index;

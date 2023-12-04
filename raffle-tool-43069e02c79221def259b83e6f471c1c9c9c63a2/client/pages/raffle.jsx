import React from "react";
import { gql } from "apollo-boost";

import firebase from "firebase/app";
// import "firebase/firestore";


import {
  Avatar,
  TextStyle,
  Page,
  Layout,
  Card,
  ResourceItem,
  ResourceList,
  Stack,
  DisplayText,
  Heading,
  Thumbnail,
  TextContainer,
  Badge,
  ButtonGroup,
  Button,
} from "@shopify/polaris";

export default class App extends React.Component {
  render() {
    return (
      <Page
        title="Air Jordan 1 High OG CO JP (Neutral Grey/Metallic Silver-White)"
        // subtitle="(Neutral Grey/Metallic Silver-White)"
        subtitle={<Badge>2100 entries</Badge>}
        breadcrumbs={[{ content: "Raffle overview", url: "/raffles" }]}

        // primaryAction={[
        //   {
        //     content: "Back",
        //     onAction: () => console.log('clicked')
        //   }
        // ]}

        thumbnail={
          <Thumbnail
            source="https://cdn.shopify.com/s/files/1/0269/6917/8190/products/Jordan-1-Japan.jpg"
            alt="Black leather pet collar"
            size="large"
          />
        }
      >
        <Card title="Raffle details">
          <Card.Section>
            <Stack spacing="loose" vertical>
              <TextStyle>2100 total entries</TextStyle>
              <p>
                Two-step authentication adds an extra layer of security when
                logging in to your account. A special code will be required each
                time you log in, ensuring only you can access your account.
              </p>
              <Stack distribution="trailing">
                <ButtonGroup>
                  <Button plain>Go to product</Button>
                  <Button>Pick Winners</Button>
                </ButtonGroup>
              </Stack>
            </Stack>
          </Card.Section>

          <Card.Section title="Product variations"></Card.Section>

          <ResourceList
            resourceName={{ singular: "customer", plural: "customers" }}
            items={[
              {
                id: 32554209804366,
                product_id: 4810435821646,
                title: "US7.0,EU40.0,UK6.0",
                price: "160.00",
                sku: "DC1788-029-US7.0",
                position: 1,
                inventory_policy: "deny",
                compare_at_price: null,
                fulfillment_service: "manual",
                inventory_management: "shopify",
                option1: "US7.0,EU40.0,UK6.0",
                option2: null,
                option3: null,
                created_at: "2020-08-18T17:01:29+02:00",
                updated_at: "2020-08-18T17:01:29+02:00",
                taxable: true,
                barcode: null,
                grams: 1000,
                image_id: null,
                weight: 1000,
                weight_unit: "g",
                inventory_item_id: 34767717138510,
                inventory_quantity: 1,
                old_inventory_quantity: 1,
                tax_code: "",
                requires_shipping: true,
              },
              {
                id: 32554209902670,
                product_id: 4810435821646,
                title: "US7.5,EU40.5,UK6.5",
                price: "160.00",
                sku: "DC1788-029-US7.5",
                position: 2,
                inventory_policy: "deny",
                compare_at_price: null,
                fulfillment_service: "manual",
                inventory_management: "shopify",
                option1: "US7.5,EU40.5,UK6.5",
                option2: null,
                option3: null,
                created_at: "2020-08-18T17:01:29+02:00",
                updated_at: "2020-08-18T17:01:29+02:00",
                taxable: true,
                barcode: null,
                grams: 1000,
                image_id: null,
                weight: 1000,
                weight_unit: "g",
                inventory_item_id: 34767717171278,
                inventory_quantity: 3,
                old_inventory_quantity: 3,
                tax_code: "",
                requires_shipping: true,
              },
              {
                id: 32554209968206,
                product_id: 4810435821646,
                title: "US8.0,EU41.0,UK7.0",
                price: "160.00",
                sku: "DC1788-029-US8.0",
                position: 3,
                inventory_policy: "deny",
                compare_at_price: null,
                fulfillment_service: "manual",
                inventory_management: "shopify",
                option1: "US8.0,EU41.0,UK7.0",
                option2: null,
                option3: null,
                created_at: "2020-08-18T17:01:29+02:00",
                updated_at: "2020-08-18T17:01:29+02:00",
                taxable: true,
                barcode: null,
                grams: 1000,
                image_id: null,
                weight: 1000,
                weight_unit: "g",
                inventory_item_id: 34767717204046,
                inventory_quantity: 4,
                old_inventory_quantity: 4,
                tax_code: "",
                requires_shipping: true,
              },
              {
                id: 32554210033742,
                product_id: 4810435821646,
                title: "US8.5,EU42.0,UK7.5",
                price: "160.00",
                sku: "DC1788-029-US8.5",
                position: 4,
                inventory_policy: "deny",
                compare_at_price: null,
                fulfillment_service: "manual",
                inventory_management: "shopify",
                option1: "US8.5,EU42.0,UK7.5",
                option2: null,
                option3: null,
                created_at: "2020-08-18T17:01:29+02:00",
                updated_at: "2020-08-18T17:01:29+02:00",
                taxable: true,
                barcode: null,
                grams: 1000,
                image_id: null,
                weight: 1000,
                weight_unit: "g",
                inventory_item_id: 34767717269582,
                inventory_quantity: 5,
                old_inventory_quantity: 5,
                tax_code: "",
                requires_shipping: true,
              },
              {
                id: 32554210132046,
                product_id: 4810435821646,
                title: "US9.0,EU42.5,UK8.0",
                price: "160.00",
                sku: "DC1788-029-US9.0",
                position: 5,
                inventory_policy: "deny",
                compare_at_price: null,
                fulfillment_service: "manual",
                inventory_management: "shopify",
                option1: "US9.0,EU42.5,UK8.0",
                option2: null,
                option3: null,
                created_at: "2020-08-18T17:01:29+02:00",
                updated_at: "2020-08-18T17:01:29+02:00",
                taxable: true,
                barcode: null,
                grams: 1000,
                image_id: null,
                weight: 1000,
                weight_unit: "g",
                inventory_item_id: 34767717367886,
                inventory_quantity: 6,
                old_inventory_quantity: 6,
                tax_code: "",
                requires_shipping: true,
              },
              {
                id: 32554210230350,
                product_id: 4810435821646,
                title: "US9.5,EU43.0,UK8.5",
                price: "160.00",
                sku: "DC1788-029-US9.5",
                position: 6,
                inventory_policy: "deny",
                compare_at_price: null,
                fulfillment_service: "manual",
                inventory_management: "shopify",
                option1: "US9.5,EU43.0,UK8.5",
                option2: null,
                option3: null,
                created_at: "2020-08-18T17:01:29+02:00",
                updated_at: "2020-08-18T17:01:29+02:00",
                taxable: true,
                barcode: null,
                grams: 1000,
                image_id: null,
                weight: 1000,
                weight_unit: "g",
                inventory_item_id: 34767717466190,
                inventory_quantity: 4,
                old_inventory_quantity: 4,
                tax_code: "",
                requires_shipping: true,
              },
              {
                id: 32554210295886,
                product_id: 4810435821646,
                title: "US10.0,EU44.0,UK9.0",
                price: "160.00",
                sku: "DC1788-029-US10.0",
                position: 7,
                inventory_policy: "deny",
                compare_at_price: null,
                fulfillment_service: "manual",
                inventory_management: "shopify",
                option1: "US10.0,EU44.0,UK9.0",
                option2: null,
                option3: null,
                created_at: "2020-08-18T17:01:29+02:00",
                updated_at: "2020-08-18T17:01:29+02:00",
                taxable: true,
                barcode: null,
                grams: 1000,
                image_id: null,
                weight: 1000,
                weight_unit: "g",
                inventory_item_id: 34767717564494,
                inventory_quantity: 1,
                old_inventory_quantity: 1,
                tax_code: "",
                requires_shipping: true,
              },
              {
                id: 32554210394190,
                product_id: 4810435821646,
                title: "US10.5,EU44.5,UK9.5",
                price: "160.00",
                sku: "DC1788-029-US10.5",
                position: 8,
                inventory_policy: "deny",
                compare_at_price: null,
                fulfillment_service: "manual",
                inventory_management: "shopify",
                option1: "US10.5,EU44.5,UK9.5",
                option2: null,
                option3: null,
                created_at: "2020-08-18T17:01:29+02:00",
                updated_at: "2020-08-18T17:01:29+02:00",
                taxable: true,
                barcode: null,
                grams: 1000,
                image_id: null,
                weight: 1000,
                weight_unit: "g",
                inventory_item_id: 34767717662798,
                inventory_quantity: 3,
                old_inventory_quantity: 3,
                tax_code: "",
                requires_shipping: true,
              },
              {
                id: 32554210525262,
                product_id: 4810435821646,
                title: "US11.0,EU45.0,UK10.0",
                price: "160.00",
                sku: "DC1788-029-US11.0",
                position: 9,
                inventory_policy: "deny",
                compare_at_price: null,
                fulfillment_service: "manual",
                inventory_management: "shopify",
                option1: "US11.0,EU45.0,UK10.0",
                option2: null,
                option3: null,
                created_at: "2020-08-18T17:01:29+02:00",
                updated_at: "2020-08-18T17:01:29+02:00",
                taxable: true,
                barcode: null,
                grams: 1000,
                image_id: null,
                weight: 1000,
                weight_unit: "g",
                inventory_item_id: 34767717728334,
                inventory_quantity: 1,
                old_inventory_quantity: 1,
                tax_code: "",
                requires_shipping: true,
              },
              {
                id: 32554210623566,
                product_id: 4810435821646,
                title: "US11.5,EU45.5,UK10.5",
                price: "160.00",
                sku: "DC1788-029-US11.5",
                position: 10,
                inventory_policy: "deny",
                compare_at_price: null,
                fulfillment_service: "manual",
                inventory_management: "shopify",
                option1: "US11.5,EU45.5,UK10.5",
                option2: null,
                option3: null,
                created_at: "2020-08-18T17:01:29+02:00",
                updated_at: "2020-08-18T17:01:29+02:00",
                taxable: true,
                barcode: null,
                grams: 1000,
                image_id: null,
                weight: 1000,
                weight_unit: "g",
                inventory_item_id: 34767717826638,
                inventory_quantity: 1,
                old_inventory_quantity: 1,
                tax_code: "",
                requires_shipping: true,
              },
              {
                id: 32554210689102,
                product_id: 4810435821646,
                title: "US12.0,EU46.0,UK11.0",
                price: "160.00",
                sku: "DC1788-029-US12.0",
                position: 11,
                inventory_policy: "deny",
                compare_at_price: null,
                fulfillment_service: "manual",
                inventory_management: "shopify",
                option1: "US12.0,EU46.0,UK11.0",
                option2: null,
                option3: null,
                created_at: "2020-08-18T17:01:29+02:00",
                updated_at: "2020-08-18T17:01:29+02:00",
                taxable: true,
                barcode: null,
                grams: 1000,
                image_id: null,
                weight: 1000,
                weight_unit: "g",
                inventory_item_id: 34767717892174,
                inventory_quantity: 1,
                old_inventory_quantity: 1,
                tax_code: "",
                requires_shipping: true,
              },
            ]}
            renderItem={(item) => {
              // const { id, url, avatarSource, location, lastOrder } = item;
              const {
                id,
                product_id,
                title,
                sku,
                inventory_item_id,
                inventory_quantity,
              } = item;

              return (
                <ResourceItem
                  // url={product_id}
                  id={id}
                  verticalAlignment="center"
                >
                  <Stack>
                    <TextStyle variation="strong">{sku}</TextStyle>
                    <Stack.Item fill>{title}</Stack.Item>

                    <Stack.Item>
                      <Badge>{inventory_quantity * 8} available </Badge>
                      <Badge>{inventory_quantity * 3} winners </Badge>
                    </Stack.Item>
                  </Stack>
                </ResourceItem>
              );
            }}
          />
        </Card>

        <Card
        // title="Product variations"
        // sectioned
        ></Card>
      </Page>
    );
  }
}

import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import { Layout, Page, Button } from "@shopify/polaris";
import { useEffect, useState } from "react";
import "./RafflesPage.css";

const RafflesPage = () => {
  // State variables
  const [rafflePosts, setRafflePosts] = useState([]);
  const [raffleEntries, setRaffleEntries] = useState([]);
  const [showEntries, setShowEntries] = useState(false);

  // Fetch raffle posts on component mount
  useEffect(() => {
    async function fetchRafflePosts() {
      try {
        const response = await fetch("http://localhost:8081/raffle-posts");
        const data = await response.json();
        setRafflePosts(data);
      } catch (error) {
        console.error("Error fetching raffle posts:", error);
      }
    }

    fetchRafflePosts();
  }, []);

  const app = useAppBridge(); // Use the Shopify App Bridge
  const redirect = Redirect.create(app); // Create a redirect instance

  // Handle click on a raffle post
  const handleClickRaffle = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:8081/raffle-entries?productId=${productId}`
      );
      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Raffle entries data:", data);
      setRaffleEntries(data);
      setShowEntries(true);
    } catch (error) {
      console.error("Error fetching raffle entries:", error);
    }
  };

  // Handle return to raffle posts
  const handleReturn = () => {
    setShowEntries(false);
  };

  return (
    <Page title="Raffle overview">
      <Layout>
        <Layout.Section fullWidth>
          {!showEntries &&
            rafflePosts.map((rafflePost) => (
              <div
                key={rafflePost._id}
                onClick={() => handleClickRaffle(rafflePost.productId)}
                className="legacy-card custom-card"
              >
                <div className="legacy-card__content custom-card__content">
                  <h3>{rafflePost.productTitle}</h3>
                  <p>Article ID: {rafflePost.articleId}</p>
                  <p>Product ID: {rafflePost.productId}</p>
                  <p>Update Count: {rafflePost.updateCount}</p>
                </div>
              </div>
            ))}
        </Layout.Section>
        {showEntries && (
          <Layout.Section fullWidth>
            <Button onClick={handleReturn}>Return to Raffle Posts</Button>
            <div className="raffle-entries-container">
              {raffleEntries.map((entry) => (
                <div key={entry.entryId} className="raffle-entry">
                  <p>Entry ID: {entry.entryId}</p>
                  <p>Customer ID: {entry.customerId}</p>
                  <p>Product ID: {entry.productId}</p>
                  <p>Update Count: {entry.updateCount}</p>
                  <p>First Name: {entry.firstName}</p>
                  <p>Last Name: {entry.lastName}</p>
                  <p>Street Address: {entry.streetAddress}</p>
                  <p>Zip Code: {entry.zipCode}</p>
                  <p>City: {entry.city}</p>
                  <p>Country: {entry.country}</p>
                  <p>Birthday: {entry.birthday}</p>
                </div>
              ))}
            </div>
          </Layout.Section>
        )}
      </Layout>
    </Page>
  );
};

export default RafflesPage;

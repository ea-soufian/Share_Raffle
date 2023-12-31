import React from "react";

import ExitFrame from "./ExitFrame";
import ActiveWebhooks from "./pages/debugCards/ActiveWebhooks";
import BillingAPI from "./pages/debugCards/BillingAPI";
import DebugIndex from "./pages/debugCards/DebugIndex";
import DevNotes from "./pages/debugCards/DevNotes";
import GetData from "./pages/debugCards/getData";
import Index from "./pages/Index";
import RaffleOverview from "./pages/raffles";

const routes = {
  "/": () => <Index />,
  "/exitframe": () => <ExitFrame />,
  //Debug Cards
  "/debug": () => <DebugIndex />,
  "/raffles": () => <RaffleOverview />,
  "/raffle": () => <RafflePage />,
  "/debug/activeWebhooks": () => <ActiveWebhooks />,
  "/debug/getData": () => <GetData />,
  "/debug/billing": () => <BillingAPI />,
  "/debug/devNotes": () => <DevNotes />,
  //Add your routes here
};

export default routes;

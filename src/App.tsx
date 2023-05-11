import { Flex, Title } from "@tremor/react";
import Layout from "./components/layout";
import { useState } from "react";
import ViewSelect from "./components/ViewSelect";
import DoctypeNumbers from "./components/DoctypeNumbers";
import LatestDoctypes from "./components/LatestDoctypes";
import DoctypeTabletypes from "./components/DoctypeTabletypes";
import TableTypeNumbers from "./components/TableTypeNumbers";
import TabletypeDates from "./components/TabletypeDates";
import TabletypeAccounts from "./components/TabletypeAccounts";

function App() {
  const [currentView, setCurrentView] = useState<string>("doctype");

  return (
    <Layout>
      <Title>Organization overview</Title>
      <ViewSelect setView={setCurrentView} />
      {currentView === "doctype" && (
        <>
          <Flex
            alignItems="start"
            justifyContent="start"
            className="mt-6 flex-col gap-4 md:flex-row"
          >
            <DoctypeTabletypes />
            <DoctypeNumbers />
          </Flex>
          <Flex className="mt-6">
            <LatestDoctypes />
          </Flex>
        </>
      )}

      {currentView === "tabletype" && (
        <>
          <Flex
            alignItems="start"
            justifyContent="start"
            className="mt-6 flex-col gap-4 md:flex-row"
          >
            <TableTypeNumbers />
            <TabletypeAccounts />
          </Flex>
          <Flex className="mt-6">
            <TabletypeDates />
          </Flex>
        </>
      )}
    </Layout>
  );
}

export default App;

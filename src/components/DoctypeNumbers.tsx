import { useState } from "react";
import {
  BarList,
  Bold,
  Card,
  Flex,
  Tab,
  TabList,
  Text,
  Title,
} from "@tremor/react";
import { sortData } from "../lib/sort";
import { getDoctypeAccounts, getDoctypeDocuments } from "../lib/doctypeCounts";
import { useFetchDoctypeInfosQuery, useFetchDocumentInfosQuery } from "../api";

export default function DoctypeNumbers() {
  const [category, setCategory] = useState<string>("documents");
  const { data: doctypes } = useFetchDoctypeInfosQuery();
  const { data: documents } = useFetchDocumentInfosQuery();

  const categoryData: Record<string, { name: string; value: number }[]> = {
    documents: getDoctypeDocuments(doctypes, documents),
    accounts: getDoctypeAccounts(doctypes, documents),
  };

  return (
    <Card className="max-w-md">
      <Title>Number of Documents, Accounts</Title>

      <TabList
        onValueChange={(value) => setCategory(value)}
        defaultValue={category}
        className="mt-6"
      >
        <Tab value="documents" text="Documents" />
        <Tab value="accounts" text="Accounts" />
      </TabList>
      <Flex className="mt-6">
        <Text>
          <Bold>Doctype</Bold>
        </Text>
        <Text>
          <Bold>Count</Bold>
        </Text>
      </Flex>
      <BarList
        data={sortData(categoryData[category])}
        showAnimation={true}
        className="mt-4"
      />
    </Card>
  );
}

import { BarChart, Card, Subtitle, Title } from "@tremor/react";
import {
  useFetchDoctypeInfosQuery,
  useFetchDocumentInfosQuery,
  useFetchTabletypeInfosQuery,
} from "../api";
import { getDoctypeTabletypes } from "../lib/doctypeCounts";

export default function DoctypeTabletypes() {
  const { data: doctypes } = useFetchDoctypeInfosQuery();
  const { data: documents } = useFetchDocumentInfosQuery();
  const { data: tabletypes } = useFetchTabletypeInfosQuery();

  const data = getDoctypeTabletypes(doctypes, documents, tabletypes);
  console.log(data);

  return (
    <Card>
      <Title>Number of Table types</Title>
      <Subtitle>Total number of Table types for each Document types.</Subtitle>
      <BarChart
        className="mt-6"
        data={data}
        index="name"
        categories={["Number of table types"]}
        colors={["blue"]}
        yAxisWidth={48}
      />
    </Card>
  );
}

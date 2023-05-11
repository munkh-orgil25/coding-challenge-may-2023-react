import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from "@tremor/react";
import { useFetchDoctypeInfosQuery, useFetchDocumentInfosQuery } from "../api";
import { getDoctypeDates } from "../lib/doctypeCounts";

type FormattedDoctype = {
  name: string;
  timestamp: number;
};

export const sortWithDate = (data: FormattedDoctype[]) =>
  data.sort((a, b) => {
    if (a.timestamp < b.timestamp) return 1;
    if (a.timestamp > b.timestamp) return -1;
    return 0;
  });

export default function LatestDoctypes() {
  const { data: doctypes } = useFetchDoctypeInfosQuery();
  const { data: documents } = useFetchDocumentInfosQuery();
  const formattedDoctypes = getDoctypeDates(doctypes, documents);

  return (
    <Card>
      <Title>Doctype relevant dates</Title>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Upload count after update</TableHeaderCell>
            <TableHeaderCell>Last updated</TableHeaderCell>
            <TableHeaderCell>Latest created document</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formattedDoctypes.map((item) => (
            <TableRow key={item.name}>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <Text className="text-center">
                  {item.docsAfterUpdate.length}
                </Text>
              </TableCell>
              <TableCell>
                <Text>{item.lastUpdate}</Text>
              </TableCell>
              <TableCell>{item.latestUpload}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

import {
  Card,
  Dropdown,
  DropdownItem,
  Flex,
  List,
  ListItem,
  Title,
} from "@tremor/react";
import React, { useEffect, useState } from "react";
import {
  useFetchAccountInfosQuery,
  useFetchDocumentInfosQuery,
  useFetchTabletypeInfosQuery,
} from "../api";
import { getAccountsByTabletype } from "../lib/tabletypeCounts";
import { Organization } from "../types";

export default function TabletypeAccounts() {
  const { data: tabletypes } = useFetchTabletypeInfosQuery();
  const { data: accounts } = useFetchAccountInfosQuery();
  const { data: documents } = useFetchDocumentInfosQuery();

  const [currentType, setCurrentType] = useState<string>(
    tabletypes[0].tabletype
  );
  const [listData, setListData] = useState<(Organization | undefined)[]>([]);

  useEffect(() => {
    const tabletype = tabletypes.find((tt) => tt.tabletype === currentType);
    if (tabletype) {
      setListData(getAccountsByTabletype(tabletype, documents, accounts));
    }
  }, [currentType]);

  return (
    <Card className="max-w-md">
      <Title>Which accounts uploaded?</Title>
      <div className="mt-2 w-56">
        <Dropdown
          onValueChange={(value) => setCurrentType(value)}
          placeholder="Select table type"
        >
          {tabletypes.map((tt) => (
            <DropdownItem
              key={tt.tabletype}
              value={tt.tabletype}
              text={tt.tabletype}
            />
          ))}
        </Dropdown>
      </div>

      <List className="mt-6">
        {listData.length > 0 ? (
          listData.map(
            (account) =>
              account && <ListItem key={account.id}>{account.slug}</ListItem>
          )
        ) : (
          <ListItem>No Accounts</ListItem>
        )}
      </List>
    </Card>
  );
}

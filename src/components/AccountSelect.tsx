import React from "react";
import { Dropdown, DropdownItem } from "@tremor/react";
import { useFetchAccountInfosQuery } from "../api";
import { Organization } from "../types";

type Props = {
  setAccount: React.Dispatch<React.SetStateAction<Organization | null>>;
};

export default function AccountSelect({ setAccount }: Props) {
  const { data: accounts } = useFetchAccountInfosQuery();

  const handleAccountChange = (val: string) => {
    const account = accounts.find((a) => a.id === val);
    if (!account) return;
    setAccount(account);
  };

  return (
    <div className="w-72">
      <Dropdown
        className="mt-2"
        onValueChange={handleAccountChange}
        placeholder="Select organization"
      >
        {accounts.map((account) => (
          <DropdownItem
            key={account.id}
            text={account.slug}
            value={account.id}
          />
        ))}
      </Dropdown>
    </div>
  );
}

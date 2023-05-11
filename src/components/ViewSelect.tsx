import { Tab, TabList } from "@tremor/react";
import React from "react";

type Props = {
  setView: React.Dispatch<React.SetStateAction<string>>;
};

export default function ViewSelect({ setView }: Props) {
  return (
    <TabList
      className="mt-6"
      defaultValue="doctype"
      onValueChange={(value) => setView(value)}
    >
      <Tab value="doctype" text="Document Type" />
      <Tab value="tabletype" text="TableType" />
    </TabList>
  );
}

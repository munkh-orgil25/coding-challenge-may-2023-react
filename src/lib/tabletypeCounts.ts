import moment from "moment";
import { Document, Organization, Tabletype } from "../types";

interface DocCount {
  name: string;
  value: number;
}

export const getTabletypeDocs = (tabletypes: Tabletype[], documents: Document[]) => {
  const tableTypesCountArr = tabletypes.reduce((acc: DocCount[], tt) => {
    const count = documents.filter((doc) => 
      Object.keys(doc.tabletype2tnum2document_table_id)[0] === tt.tabletype
    ).length;

    return [...acc, { name: tt.tabletype, value: count }];
  }, []);

  const nullCount = documents.filter(doc => doc.doctype === null).length

  return tableTypesCountArr.concat([{name: 'null', value: nullCount}])
}

export const getTabletypeAccounts = (
  tabletypes: Tabletype[], 
  documents: Document[]
) => {
  const result = tabletypes.reduce((acc: DocCount[], tt) => {
    const ttDocs =  documents.filter((doc) => 
      Object.keys(doc.tabletype2tnum2document_table_id)[0] === tt.tabletype
    );
    const accountsSize = new Set(ttDocs.map(doc => doc.account_id)).size;
    return [...acc, { name: tt.tabletype, value: accountsSize }];
  }, []);
  
  return result
}


export const getTabletypeDates = (tabletypes: Tabletype[], documents: Document[]) => {
  return tabletypes.map(tt => {
    const ttUpdate = moment(Number(tt.updated_at)).format('DD MMM, YYYY HH:mm')

    const docsAfterUpdate = documents.filter((doc) => 
      Object.keys(doc.tabletype2tnum2document_table_id)[0] === tt.tabletype
        && Number(tt.updated_at) < Number(doc.created_at)
    )

    const latestUpload = documents
      .filter(doc => 
        Object.keys(doc.tabletype2tnum2document_table_id)[0] === tt.tabletype
      )
      .reduce((max: Document, current: Document) => {
        return (Number(current.created_at) > Number(max.created_at)) ? current : max;
      }, documents[0]);

    return {
      name: tt.tabletype,
      lastUpdate: ttUpdate,
      docsAfterUpdate,
      latestUpload: latestUpload ? moment(Number(latestUpload.created_at)).format('DD MMM, YYYY HH:mm') : '-',
    }
  })
}


export const getAccountsByTabletype = (
  tabletype: Tabletype, 
  documents: Document[], 
  accounts: Organization[]
) => {
  const ttDocs = documents.filter(doc => 
    Object.keys(doc.tabletype2tnum2document_table_id)[0] === tabletype.tabletype
  )
  const uniqueAccountIds = Array.from(new Set(ttDocs.map(obj => obj.account_id)))
  const uniqueAccounts = uniqueAccountIds.map(id => accounts.find(a => a.id === id))
  return uniqueAccounts;
}
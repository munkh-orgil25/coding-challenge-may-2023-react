import moment from "moment";
import { Doctype, Document,  Tabletype } from "../types";

interface DocCount {
  name: string;
  value: number;
}

export const getDoctypeDocuments = (doctypes: Doctype[], documents: Document[]) => {
  const docTypesCountArr = doctypes.reduce((acc: DocCount[], dt) => {
    const count = documents.filter((doc) => doc.doctype === dt.doctype).length;
    return [...acc, { name: dt.doctype, value: count }];
  }, []);

  const nullCount = documents.filter(doc => doc.doctype === null).length

  return docTypesCountArr.concat([{name: 'null', value: nullCount}])
}

export const getDoctypeAccounts = (
  doctypes: Doctype[], 
  documents: Document[]
) => {
  const result = doctypes.reduce((acc: DocCount[], dt) => {
    const dtDocs = documents.filter((doc) => doc.doctype === dt.doctype);
    const accountsSize = new Set(dtDocs.map(doc => doc.account_id)).size;
    return [...acc, { name: dt.doctype, value: accountsSize }];
  }, []);
  
  return result
}

export const getDoctypeDates = (doctypes: Doctype[], documents: Document[]) => {
  return doctypes.map(doctype => {
    const dtUpdate = moment(Number(doctype.updated_at)).format('DD MMM, YYYY HH:mm')

    const docsAfterUpdate = documents.filter(doc => doc.doctype === doctype.doctype && Number(doc.created_at) > Number(doctype.updated_at))

    const latestUpload = documents.filter(doc => doc.doctype === doctype.doctype)
      .reduce((max: Document, current: Document) => {
        return (Number(current.created_at) > Number(max.created_at)) ? current : max;
      }, documents[0]);

    return {
      name: doctype.doctype,
      lastUpdate: dtUpdate,
      docsAfterUpdate,
      latestUpload: latestUpload ? moment(Number(latestUpload.created_at)).format('DD MMM, YYYY HH:mm') : '-',
    }
  })
}

export const getDoctypeTabletypes = (doctypes: Doctype[], documents: Document[] , tabletypes: Tabletype[]) => {
  return doctypes.map(dt => {
    const dtTableTypes = documents.filter(doc => dt.doctype === doc.doctype)
      .map(doc => {
        const firstKey = Object.keys(doc.tabletype2tnum2document_table_id)[0]; 
        const tableType = tabletypes.find(tt => tt.tabletype === firstKey)
        return tableType
      })
    return {
      name: dt.doctype,
      "Number of table types": dtTableTypes.length
    }
  })
}

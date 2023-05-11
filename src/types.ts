export type Organization = {
  id: string
  slug: string
}

export type Doctype = {
  doctype: string
  label: string
  updated_at: string
}

export type Tabletype = {
  tabletype: string
  label: string
  updated_at: string
}

export type Document = {
  id: number
  account_id: string
  affiliation_id: string
  created_at: string
  doctype: string | null
  tabletype2tnum2document_table_id: { 
    [key: string]: {
      [key: string]: number
    } 
  } | {}
}
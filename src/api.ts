import apiData from './apiData'

export const useFetchTabletypeInfosQuery = () => {
  return { data: apiData['tabletypeInfosOfOrg'], isFetching: false }
}

export const useFetchDoctypeInfosQuery = () => {
  return { data: apiData['doctypeInfosOfOrg'], isFetching: false }
}

export const useFetchDocumentInfosQuery = () => {
  return { data: apiData['documentInfosOfOrg'], isFetching: false }
}

export const useFetchAccountInfosQuery = () => {
  return { data: apiData['accountInfos'], isFetching: false }
}
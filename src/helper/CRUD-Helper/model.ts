import {Dispatch, ReactNode, SetStateAction} from 'react'

export type ID = undefined | null | number

export type PaginationState = {
  page_size: number
  page_index: number
  type?: string
  links?: Array<{label: string; active: boolean; url: string | null; page: number | null}>
}
export type QueryStates = {
  page_index?: number;
  gender?: string | undefined | null
  text?:  string| null
  status?: string | undefined| null
  sortType?: string | undefined| null
  fromDate?: Date | null| string | undefined
  toDate?: Date | null | string | undefined
  dateField?: string;
}

export type SortState = {
  sort?: string| null
  order?: 'asc' | 'desc'
  status?: string | undefined| null
  role_code?: string | undefined| null
  sortType?: string | undefined| null
  gender?: string | undefined | null
  fromDate?: Date | null| string | undefined
  toDate?: Date | null | string | undefined
  dateField?: string | null
}

export type FilterState = {
  filter?: unknown
}

export type SearchState = {
  text?: string| null
}

export type Response<T> = {
  data?: T
  payload?: {
    message?: string
    errors?: {
      [key: string]: Array<string>
    }
    pagination?: PaginationState | any
  }
  meta?: {
    totalPages: number
    totalRecords: number | undefined
    page_index: number
    page_size: number
  }
}

export type QueryState = PaginationState & SortState & FilterState & SearchState & QueryStates

export type QueryRequestContextProps = {
  state: QueryState
  updateState: (updates: Partial<QueryState>) => void
}

export const initialQueryState: QueryState = {
  page_index: 1,
  page_size: 10,
  type: ''
}

export type WithChildren = {
    children?: ReactNode
}


export const initialQueryRequest: QueryRequestContextProps = {
  state: initialQueryState,
  updateState: () => {},
}

export type QueryResponseContextProps<_T> = {
  response?: any
  refetch: () => void
  isLoading: boolean
  query: string
}

export const initialQueryResponse = {refetch: () => {}, isLoading: false, query: ''}

export type ListViewContextProps = {
  selected: Array<ID>
  onSelect: (selectedId: ID) => void
  onSelectAll: () => void
  clearSelected: () => void
  // NULL => (CREATION MODE) | MODAL IS OPENED
  // NUMBER => (EDIT MODE) | MODAL IS OPENED
  // UNDEFINED => MODAL IS CLOSED
  itemIdForUpdate?: any
  setItemIdForUpdate: Dispatch<SetStateAction<ID>>
  isAllSelected: boolean
  disabled: boolean
}

export const initialListView: ListViewContextProps = {
  selected: [],
  onSelect: () => {},
  onSelectAll: () => {},
  clearSelected: () => {},
  setItemIdForUpdate: () => {},
  isAllSelected: false,
  disabled: false,
}

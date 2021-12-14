import { OutputFilters } from "@/components/shared/Filter/FilterTypes/types";

export interface HeaderColumns {
    text: string;
    value?: string;
    rowSpan?: number;
    colSpan?: number;
    align?: string;
    width?: string;
}

export interface PageInfo {
    id: number;
    currentHeader: string;
    routeFrom?: string;
}

export interface TableOptions {
    groupBy: [];
    groupDesc: [];
    itemsPerPage: number;
    multiSort: boolean;
    mustSort: boolean;
    page: number;
    sortBy: string[];
    sortDesc: boolean[];
}

export interface DataTableInterface extends Vue {
    handlePageChange: (page: number) => void;
}

export interface SelectItems {
    text: string;
    value: string | number;
}

export interface PropertiesSelectObject {
    id: number;
    code: string;
    name: string;
}

export interface ErrorData {
    error: string;
    message: string;
    path: string;
    status?: number;
    code?: number;
    timestamp: string;
    trace: string;
}

export interface ReplaceConditions {
  from: string;
  to: string;
}

export interface FilterParams {
    name?: string;
    size?: string;
    page?: string;
    sort?: string;
    items?: OutputFilters;
}

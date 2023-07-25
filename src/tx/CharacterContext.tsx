import React, { createContext, useCallback } from "react";
import { useState, useRef } from "react";
import {
  type MRT_ColumnFiltersState,
  type MRT_SortingState,
  type MRT_Virtualizer,
} from "material-react-table";
import {
  useInfiniteQuery,
  type InfiniteData,
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { CharacterResultResponse } from "../config/types";

export interface CharacterContextProps {
  isError: boolean;
  isFetching: boolean;
  isLoading: boolean;
  data: InfiniteData<CharacterResultResponse>;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<CharacterResultResponse, unknown>>;

  table: React.MutableRefObject<HTMLDivElement | null>;
  virtualInstance: React.MutableRefObject<MRT_Virtualizer<
    HTMLDivElement,
    HTMLTableRowElement
  > | null>;
  columnFilters: MRT_ColumnFiltersState;
  changeColFilters: (filter: MRT_ColumnFiltersState) => void;
  globalFilter: string;
  changeGblFilter: (filter: string) => void;
  sorting: MRT_SortingState;
  changeSorting: (sort: MRT_SortingState) => void;
}

const CharacterContext = createContext<Partial<CharacterContextProps>>({});

export const CharacterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const tableContainerRef = useRef<HTMLDivElement>(null); //we can get access to the underlying TableContainer element and react to its scroll events
  const rowVirtualizerInstanceRef =
    useRef<MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement>>(null); //we can get access to the underlying Virtualizer instance and call its scrollToIndex method

  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = useState<string>();
  const [sorting, setSorting] = useState<MRT_SortingState>([]);

  const { data, fetchNextPage, isError, isFetching, isLoading } =
    useInfiniteQuery<CharacterResultResponse>({
      queryKey: ["character-table", columnFilters, globalFilter, sorting],
      queryFn: async ({ pageParam = 0 }) => {
        const url = new URL(
          `/api/character/?page=${pageParam}`,
          "https://rickandmortyapi.com"
        );

        const response = await fetch(url.href);
        const json = (await response.json()) as CharacterResultResponse;

        return json;
      },
      getNextPageParam: (_lastgroup, groups) => {
        if (groups.length < _lastgroup.info.pages) return groups.length + 1;
        return null;
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    });

  return (
    <CharacterContext.Provider
      value={{
        data,
        isFetching,
        isError,
        isLoading,
        fetchNextPage,
        table: tableContainerRef,
        virtualInstance: rowVirtualizerInstanceRef,
        columnFilters,
        changeColFilters: setColumnFilters,
        globalFilter,
        changeGblFilter: setGlobalFilter,
        sorting,
        changeSorting: setSorting,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export default CharacterContext
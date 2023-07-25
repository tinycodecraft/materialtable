import React, { useContext, useMemo,useCallback,useEffect ,type UIEvent} from "react";
import CharacterContext, {
  CharacterContextProps,
} from "../tx/CharacterContext";
import { Typography} from '@mui/material'
import { CHARACTER_COLUMNS } from "../config/types.d";
import { MaterialReactTable} from 'material-react-table'

export default function MuTable() {
  const { data, fetchNextPage, isError, isFetching, isLoading, table, virtualInstance } =
    useContext<Partial<CharacterContextProps>>(CharacterContext);

  const flatData = useMemo(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data]
  );

  const totalDBRowCount = data?.pages?.[0]?.info?.count ?? 0;
  const totalFetched = flatData.length;

    //called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
    const fetchMoreOnBottomReached = useCallback(
        (containerRefElement?: HTMLDivElement | null) => {
          if (containerRefElement) {
            const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
            //once the user has scrolled within 400px of the bottom of the table, fetch more data if we can
            if (
              scrollHeight - scrollTop - clientHeight < 400 &&
              !isFetching &&
              totalFetched < totalDBRowCount
            ) {
              fetchNextPage && fetchNextPage();
            }
          }
        },
        [fetchNextPage, isFetching, totalFetched, totalDBRowCount],
      );
    
  //a check on mount to see if the table is already scrolled to the bottom and immediately needs to fetch more data
  useEffect(() => {
    if(table)
    {
        fetchMoreOnBottomReached(table.current);
    }
    
  }, [fetchMoreOnBottomReached,table]);

  return (
    <MaterialReactTable
    columns={CHARACTER_COLUMNS}
    data={flatData}
    enablePagination={false}
    enableRowNumbers
    enableRowVirtualization //optional, but recommended if it is likely going to be more than 100 rows
    manualFiltering
    manualSorting
    muiTableContainerProps={{
      ref: table, //get access to the table container element
      sx: { maxHeight: '600px' }, //give the table a max height
      onScroll: (
        event: UIEvent<HTMLDivElement>, //add an event listener to the table container element
      ) => fetchMoreOnBottomReached(event.target as HTMLDivElement),
    }}
    muiToolbarAlertBannerProps={
      isError
        ? {
            color: 'error',
            children: 'Error loading data',
          }
        : undefined
    }

    renderBottomToolbarCustomActions={() => (
      <Typography>
        Fetched {totalFetched} of {totalDBRowCount} total rows.
      </Typography>
    )}
    state={{
      isLoading,
      showAlertBanner: isError,
      showProgressBars: isFetching,
      
    }}
    rowVirtualizerInstanceRef={virtualInstance} //get access to the virtualizer instance
    rowVirtualizerProps={{ overscan: 4 }}
  />
  );
}

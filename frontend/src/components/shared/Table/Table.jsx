import {
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table';

const Table = (props) => {
  const { data, columns, tableSetting } = props


  const table = useMantineReactTable({
    columns,
    data: data || [],
    mantinePaginationProps: {
      rowsPerPageOptions: ['10', "15", "20", "25", "50", "100"],
      withEdges: false, //note: changed from `showFirstLastButtons` in v1.0
    },
    positionActionsColumn: "last",
    initialState: { density: 'xs' },
    enableStickyHeader: true,
    enableGlobalFilter: false, // do not scan this column during global filtering
    enableColumnFilters: false, // do not scan this column during column filtering
    mantineTableContainerProps: { sx: { height: 'calc(100vh - 14rem)' }},
    ...tableSetting,
  });

  return <MantineReactTable
    table={table}
  />;
};

export default Table;

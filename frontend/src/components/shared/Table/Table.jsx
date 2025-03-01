import {
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table';


const Table = (props) => {
  const { data, columns, isLoading,tableSetting } = props

  const table = useMantineReactTable({
    columns,
    data,
    state: { isLoading: isLoading },
    mantinePaginationProps: {
      showRowsPerPage: false,
    },
    paginationDisplayMode: 'pages',
    enableStickyHeader: true,
    mantineTableContainerProps: { sx: { maxHeight: 'calc(100vh - 17rem)' } },
    ...tableSetting,
  });

  return <MantineReactTable
    table={table}
  />;
};

export default Table;

import {
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table';


const Table = (props) => {
  const { data, columns, isLoading, tableSetting } = props

  console.log('isLoading', isLoading)
  console.log('data', data)

  const table = useMantineReactTable({
    columns,
    data,
    state: { isLoading: isLoading },
    mantinePaginationProps: {
      rowsPerPageOptions: ['5', '10'],
      withEdges: false, //note: changed from `showFirstLastButtons` in v1.0
    },
    paginationDisplayMode: 'pages',
    enableStickyHeader: true,
    mantineTableContainerProps: { sx: { height: 'calc(100vh - 17rem)' } },
    ...tableSetting,
  });

  return <MantineReactTable
    table={table}
  />;
};

export default Table;

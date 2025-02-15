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
    mantineTableContainerProps: { sx: { height: 'calc(100vh - 20rem)' } },
    ...tableSetting
  });

  const handleSaveRow = ()=>{

  }
  return <MantineReactTable
    table={table}
    editDisplayMode="modal" //default
    enableEditing
    onEditingRowSave={handleSaveRow}
  />;
};

export default Table;

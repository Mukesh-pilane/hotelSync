import {
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table';


const Table = (props) => {
 const {data, columns} = props

  const table = useMantineReactTable({
    columns,
    data, // must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return <MantineReactTable table={table} />;
};

export default Table;

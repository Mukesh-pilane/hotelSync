import { Pagination } from '@mantine/core';

export default function pagination(currentPage, setPage, total) {
  return (
    <Pagination value={currentPage} onChange={setPage} total={total} />
  );
}
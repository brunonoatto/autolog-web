import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export function usePagination() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageNumber = useMemo(() => Number(searchParams.get('page')) || 1, [searchParams]);
  const pageSize = useMemo(() => Number(searchParams.get('pageSize')) || 10, [searchParams]);

  const setPageNumber = (page: number) => {
    if (page) {
      setSearchParams({ page: page.toString() });
    } else {
      // TODO: criar um hook custom para ser mais fácil de deletar uma queryString
      setSearchParams((prev) => {
        prev.delete('page');
        return prev;
      });
    }
  };

  const setPageSize = (size: number) => {
    if (size) {
      setSearchParams({ size: size.toString() });
    } else {
      setSearchParams((prev) => {
        prev.delete('size');
        return prev;
      });
    }
  };

  return {
    pageNumber,
    pageSize,
    setPageNumber,
    setPageSize,
  };
}

import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;

export function usePagination() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageNumber = useMemo(
    () => Number(searchParams.get('page') || 0) || DEFAULT_PAGE_NUMBER,
    [searchParams],
  );
  const pageSize = useMemo(
    () => Number(searchParams.get('pageSize') || 0) || DEFAULT_PAGE_SIZE,
    [searchParams],
  );

  const setPageNumber = (page: number) => {
    if (page > 0) {
      setSearchParams({ page: page.toString() });
    } else {
      // TODO: criar um hook custom para ser mais fácil de deletar uma queryString
      setSearchParams((prev) => {
        prev.delete('page');
        return prev;
      });
    }
  };

  const handlePreviousPage = () => {
    if (pageNumber <= 1) return;

    setPageNumber(pageNumber - 1);
  };

  const handleNextPage = () => {
    // if (pageNumber >= pageSize) return;

    setPageNumber(pageNumber + 1);
  };

  const setPageSize = (size: number) => {
    if (size > 0) {
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
    onPreviousPage: handlePreviousPage,
    onNextPage: handleNextPage,
    setPageSize,
  };
}

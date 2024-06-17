import { useMemo } from 'react';

import { Button } from '@shared/design-system/ui/button';
import { usePagination } from '@shared/hooks/usePaginations';

type TPageMove = {
  type: 'previous' | 'next';
  show: boolean;
};

function PaginationMove({ type, show }: TPageMove) {
  const { onPreviousPage, onNextPage } = usePagination();

  const handleChangePage = () => {
    type === 'previous' ? onPreviousPage() : onNextPage();
  };

  if (!show) return null;

  return (
    <Button size="sm" variant="outline" onClick={handleChangePage}>
      {type === 'previous' && '<'}
      {type === 'next' && '>'}
    </Button>
  );
}

type TPageButton = {
  number: number;
};

function PageButton({ number }: TPageButton) {
  const { pageNumber, setPageNumber } = usePagination();

  const isCurrentPage = number == pageNumber;

  return (
    <Button
      size="sm"
      variant={isCurrentPage ? 'default' : 'outline'}
      onClick={() => setPageNumber(number)}
    >
      {number}
    </Button>
  );
}

type TPaginationProps = {
  totalItems: number;
  totalPages: number;
};

export function Pagination({ totalItems, totalPages }: TPaginationProps) {
  const { pageNumber } = usePagination();

  const initialPage = useMemo(() => (pageNumber - 2 <= 0 ? 1 : pageNumber - 2), [pageNumber]);
  const finalPage = useMemo(
    () => (pageNumber + 2 > totalPages ? totalPages : pageNumber + 2),
    [pageNumber, totalPages],
  );
  const hasPreviousPages = useMemo(() => initialPage > 1, [initialPage]);
  const hasNextPages = useMemo(() => finalPage < totalPages, [finalPage, totalPages]);

  const pages = useMemo(() => {
    const pagesCount = finalPage - initialPage + 1;
    return [
      ...Array.from(Array(pagesCount <= 0 ? 1 : pagesCount), (_, index) => initialPage + index),
    ];
  }, [finalPage, initialPage]);

  return (
    <div className="flex flex-col gap-2 mt-0">
      {pages.length > 1 && (
        <div className="text-sm flex gap-2 justify-end items-center">
          <div>Páginas:</div>

          <PaginationMove type="previous" show={hasPreviousPages} />

          {pages.map((number) => (
            <PageButton key={number} number={number} />
          ))}

          <PaginationMove type="next" show={hasNextPages} />
        </div>
      )}

      <div className="text-xs flex justify-end">
        {/* <div>Ver X registros use setPageSize.</div> */}
        <div>Total de {totalItems} registros.</div>
      </div>
    </div>
  );
}

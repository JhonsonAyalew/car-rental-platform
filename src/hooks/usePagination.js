import { useState, useMemo, useCallback } from 'react';

/**
 * Client-side pagination utility.
 *
 * @param {Array}  data     - Full dataset to paginate
 * @param {number} pageSize - Items per page (default 10)
 *
 * @example
 * const { paged, page, totalPages, setPage, nextPage, prevPage } = usePagination(allItems, 8);
 */
const usePagination = (data = [], pageSize = 10) => {
  const [page, setPage] = useState(1);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(data.length / pageSize)), [data.length, pageSize]);

  const paged = useMemo(
    () => data.slice((page - 1) * pageSize, page * pageSize),
    [data, page, pageSize]
  );

  const nextPage = useCallback(() => setPage(p => Math.min(totalPages, p + 1)), [totalPages]);
  const prevPage = useCallback(() => setPage(p => Math.max(1, p - 1)), []);
  const goTo     = useCallback((n)  => setPage(Math.max(1, Math.min(totalPages, n))), [totalPages]);

  const startItem = (page - 1) * pageSize + 1;
  const endItem   = Math.min(page * pageSize, data.length);

  // Reset to page 1 when data changes (e.g., after filtering)
  // Callers should reset manually: `setPage(1)` after applying filters
  return {
    paged, page, totalPages,
    setPage: goTo, nextPage, prevPage,
    startItem, endItem, totalItems: data.length,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
};

export default usePagination;

import { useState, useMemo, useEffect } from 'react';

export const useVault = (core = {}) => {
  const { scannedProducts = [] } = core;

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("LATEST");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  
  // Debounce Effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const filteredProducts = useMemo(() => {
    return [...scannedProducts]
      .filter((product) => {
        const matchesStatus = statusFilter === "ALL" || product.status === statusFilter;
        const matchesSearch = product.name?.toLowerCase().includes(debouncedQuery.toLowerCase());
        return matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        if (sortOrder === "LATEST") return new Date(b.date || 0) - new Date(a.date || 0);
        if (sortOrder === "EXPIRY") {
          const dateA = a.expiry && a.expiry !== "No Date Provided" ? new Date(a.expiry) : new Date("9999-12-31");
          const dateB = b.expiry && b.expiry !== "No Date Provided" ? new Date(b.expiry) : new Date("9999-12-31");
          return dateA - dateB;
        }
        return 0;
      });
  }, [scannedProducts, debouncedQuery, statusFilter, sortOrder]);

  return {
    searchQuery, setSearchQuery,
    statusFilter, setStatusFilter,
    sortOrder, setSortOrder,
    filteredProducts
  };
};
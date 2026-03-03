import { useState, useMemo } from 'react';

export const useVault = (scannedProducts) => {
  // 1. Local States for Filtering & Searching
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("LATEST");

  // 2. The Core Filtering Logic (Memoized for Performance)
  const filteredProducts = useMemo(() => {
    return [...scannedProducts]
      .filter((product) => {
        // A. Filter by Status
        const matchesStatus = statusFilter === "ALL" || product.status === statusFilter;

        // B. Filter by Search Query (Name search)
        const matchesSearch = product.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());

        return matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        // C. Sort Logic
        if (sortOrder === "LATEST") {
          return new Date(b.date || 0) - new Date(a.date || 0);
        }
        if (sortOrder === "EXPIRY") {
          const dateA = a.expiry && a.expiry !== "No Date Provided" ? new Date(a.expiry) : new Date("9999-12-31");
          const dateB = b.expiry && b.expiry !== "No Date Provided" ? new Date(b.expiry) : new Date("9999-12-31");

          return dateA - dateB;
        }
        return 0;
      });
  }, [scannedProducts, searchQuery, statusFilter, sortOrder]);

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    sortOrder,
    setSortOrder,
    filteredProducts
  };
};
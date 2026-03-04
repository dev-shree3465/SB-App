import { useState, useRef, useEffect, useMemo } from 'react';

export const useNotification = (scannedProducts = []) => {
  // --- UI LOGIC (Dropdown state) ---
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleNotifications = () => setShowNotifications(prev => !prev);
  const closeNotifications = () => setShowNotifications(false);

  // --- DATA LOGIC (Expiry calculation moved from App.js) ---
  const expiryNotifications = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (scannedProducts || []).filter(product => {
      if (!product.expiry || product.expiry === "No Date Provided") return false;

      const expDate = new Date(product.expiry);
      expDate.setHours(0, 0, 0, 0);

      const diffTime = expDate - today;
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

      // diffDays >= -1 (expired yesterday) to 5 days range
      return diffDays >= -1 && diffDays <= 5;
    });
  }, [scannedProducts]);

  return {
    showNotifications,
    toggleNotifications,
    closeNotifications,
    dropdownRef,
    expiryNotifications // Returning the calculated list
  };
};
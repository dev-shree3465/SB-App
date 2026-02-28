import { useState, useEffect, useRef } from 'react';

export const useSafetyStats = (products) => {
  const containerRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(0);

  // Data Processing
  const safeCount = products.filter(p => p.status === 'GREEN').length;
  const warningCount = products.filter(p => p.status === 'YELLOW').length;
  const dangerCount = products.filter(p => p.status === 'RED').length;
  const total = products.length;

  // Resize Logic
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) setChartWidth(containerRef.current.offsetWidth);
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const chartData = total > 0 ? [
    { name: 'Safe', value: safeCount, color: '#22c55e' },
    { name: 'Warning', value: warningCount, color: '#fbbf24' },
    { name: 'Danger', value: dangerCount, color: '#ef4444' }
  ].filter(item => item.value > 0) : [{ name: 'Empty', value: 1, color: '#f1f5f9' }];

  return {
    containerRef,
    chartWidth,
    chartData,
    stats: { total, safeCount, warningCount, dangerCount }
  };
};
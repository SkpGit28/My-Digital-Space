'use client';

import { useState, useCallback } from 'react';
import { Bite, DeepDive } from '@/types';

export function useSearch(items: (Bite | DeepDive)[]) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useCallback(() => {
    if (!searchQuery.trim()) return items;

    const query = searchQuery.toLowerCase();
    return items.filter((item) => {
      return (
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    });
  }, [items, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredItems: filteredItems(),
  };
}

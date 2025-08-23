"use client";

import { useRef, useState, useCallback } from 'react';

export const useDraggableScroll = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    setIsDragging(true);
    setStartX(e.pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
    ref.current.style.cursor = 'grabbing';
    ref.current.style.userSelect = 'none';
  }, []);

  const handleMouseLeaveOrUp = useCallback(() => {
    if (!ref.current) return;
    setIsDragging(false);
    ref.current.style.cursor = 'grab';
    ref.current.style.userSelect = 'auto';
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag sensitivity
    ref.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const preventClick = useCallback((e: React.MouseEvent) => {
    if (isDragging) e.preventDefault();
  }, [isDragging]);

  return { ref, handleMouseDown, handleMouseLeaveOrUp, handleMouseMove, preventClick };
};
"use client";

import { useRef, useState, useCallback } from 'react';

export const useDraggableScroll = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [isDown, setIsDown] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    setIsDown(true);
    setHasDragged(false);
    ref.current.style.cursor = 'grabbing';
    ref.current.style.userSelect = 'none';
    startX.current = e.pageX - ref.current.offsetLeft;
    scrollLeft.current = ref.current.scrollLeft;
  }, []);

  const handleMouseLeaveOrUp = useCallback(() => {
    setIsDown(false);
    if (ref.current) {
      ref.current.style.cursor = 'grab';
      ref.current.style.userSelect = 'auto';
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDown || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = x - startX.current;
    // ドラッグ操作と判定するための最低移動距離（しきい値）
    if (Math.abs(walk) > 3) {
      setHasDragged(true);
    }
    ref.current.scrollLeft = scrollLeft.current - walk * 1.5; // スクロール速度を調整
  }, [isDown]);

  const preventClick = useCallback((e: React.MouseEvent) => {
    if (hasDragged) { // ドラッグ操作が行われた場合のみクリックを無効化
      e.preventDefault();
      e.stopPropagation();
    }
  }, [hasDragged]);

  return { ref, handleMouseDown, handleMouseLeaveOrUp, handleMouseMove, preventClick };
};
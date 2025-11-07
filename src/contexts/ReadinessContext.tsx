"use client";

import React, { createContext, useContext, useState, useMemo, useCallback, ReactNode } from 'react';

interface ProgressState {
  tartan: number; // 0-100
  font: number; // 0-100
  scene: number; // 0-100
  page: number; // 0-100
}

interface ReadinessContextType {
  progress: ProgressState;
  setTartanProgress: (progress: number) => void;
  setFontProgress: (progress: number) => void;
  setSceneProgress: (progress: number) => void;
  setPageProgress: (progress: number) => void;
  overallProgress: number; // 0-100, average of all
  allReady: boolean;
  resetProgress: () => void;
  isNavigating: boolean;
  setIsNavigating: (value: boolean) => void;
}

const ReadinessContext = createContext<ReadinessContextType | undefined>(undefined);

export function ReadinessProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>({
    tartan: 0,
    font: 0,
    scene: 0,
    page: 0,
  });
  const [isNavigating, setIsNavigating] = useState(false);

  const overallProgress = useMemo(() => {
    return Math.round((progress.tartan + progress.font + progress.scene + progress.page) / 4);
  }, [progress]);

  const allReady = overallProgress === 100;

  const resetProgress = useCallback(() => {
    setProgress({
      tartan: 0,
      font: 0,
      scene: 0,
      page: 0,
    });
  }, []);

  const setTartanProgress = useCallback((value: number) => {
    setProgress((prev) => {
      const newValue = Math.min(100, Math.max(0, value));
      if (prev.tartan === newValue) return prev; // Prevent unnecessary updates
      return { ...prev, tartan: newValue };
    });
  }, []);

  const setFontProgress = useCallback((value: number) => {
    setProgress((prev) => {
      const newValue = Math.min(100, Math.max(0, value));
      if (prev.font === newValue) return prev; // Prevent unnecessary updates
      return { ...prev, font: newValue };
    });
  }, []);

  const setSceneProgress = useCallback((value: number) => {
    setProgress((prev) => {
      const newValue = Math.min(100, Math.max(0, value));
      if (prev.scene === newValue) return prev; // Prevent unnecessary updates
      return { ...prev, scene: newValue };
    });
  }, []);

  const setPageProgress = useCallback((value: number) => {
    setProgress((prev) => {
      const newValue = Math.min(100, Math.max(0, value));
      if (prev.page === newValue) return prev; // Prevent unnecessary updates
      return { ...prev, page: newValue };
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      progress,
      setTartanProgress,
      setFontProgress,
      setSceneProgress,
      setPageProgress,
      overallProgress,
      allReady,
      resetProgress,
      isNavigating,
      setIsNavigating,
    }),
    [
      progress,
      setTartanProgress,
      setFontProgress,
      setSceneProgress,
      setPageProgress,
      overallProgress,
      allReady,
      resetProgress,
      isNavigating,
      setIsNavigating,
    ]
  );

  return (
    <ReadinessContext.Provider value={contextValue}>
      {children}
    </ReadinessContext.Provider>
  );
}

export function useReadiness() {
  const context = useContext(ReadinessContext);
  if (context === undefined) {
    throw new Error('useReadiness must be used within a ReadinessProvider');
  }
  return context;
}

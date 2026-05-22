"use client";

type HistoryRestoreListener = () => void;

const historyRestoreListeners = new Set<HistoryRestoreListener>();
const PENDING_HOME_SCROLL_TOP_KEY = "site:pending-home-scroll-top";

let areGlobalListenersAttached = false;
let hasPendingHistoryTraversal = false;

function getNavigationEntryType() {
  if (typeof window === "undefined" || !("performance" in window)) {
    return null;
  }

  const [entry] = window.performance.getEntriesByType(
    "navigation",
  ) as PerformanceNavigationTiming[];

  return entry?.type ?? null;
}

function isBackForwardNavigation() {
  return getNavigationEntryType() === "back_forward";
}

function notifyHistoryRestoreListeners() {
  historyRestoreListeners.forEach((listener) => listener());
}

function attachGlobalListeners() {
  if (areGlobalListenersAttached || typeof window === "undefined") {
    return;
  }

  areGlobalListenersAttached = true;

  window.addEventListener("pageshow", (event) => {
    const pageShowEvent = event as PageTransitionEvent;

    if (pageShowEvent.persisted || isBackForwardNavigation()) {
      notifyHistoryRestoreListeners();
    }
  });

  window.addEventListener("popstate", () => {
    hasPendingHistoryTraversal = true;
  });
}

export function subscribeToHistoryRestore(listener: HistoryRestoreListener) {
  attachGlobalListeners();
  historyRestoreListeners.add(listener);

  if (isBackForwardNavigation()) {
    runAfterHistoryRestoreLayoutSettles(listener);
  }

  return () => {
    historyRestoreListeners.delete(listener);
  };
}

export function runAfterHistoryRestoreLayoutSettles(callback: () => void) {
  if (typeof window === "undefined") {
    return;
  }

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(callback);
  });
}

export function consumePendingHistoryTraversal() {
  attachGlobalListeners();

  const didTraverseHistory =
    hasPendingHistoryTraversal || isBackForwardNavigation();

  hasPendingHistoryTraversal = false;

  return didTraverseHistory;
}

export function rememberHomeScrollPosition() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.setItem(
      PENDING_HOME_SCROLL_TOP_KEY,
      String(window.scrollY),
    );
  } catch {
    // Restoring the previous homepage scroll position is a nicety, not a
    // requirement for the legal-page roundtrip.
  }
}

export function takeRememberedHomeScrollPosition() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedValue = window.sessionStorage.getItem(PENDING_HOME_SCROLL_TOP_KEY);

    if (!storedValue) {
      return null;
    }

    window.sessionStorage.removeItem(PENDING_HOME_SCROLL_TOP_KEY);

    const parsedValue = Number.parseFloat(storedValue);

    return Number.isFinite(parsedValue) ? parsedValue : null;
  } catch {
    return null;
  }
}

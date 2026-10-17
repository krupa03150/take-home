"use client";

import { seedEvents, type CommunityEvent } from "@/lib/data";

const STORAGE_KEY = "common-ground-v4";

export type UserProfile = {
  email: string;
  /** Mock-only credential; never sent anywhere. */
  password: string;
  name: string;
  age: string;
  hobby: string;
  interests: string[];
  setupComplete: boolean;
  joinedEventIds: string[];
  friendIds: string[];
  /** My Circle: confirmed for next weekly gathering. */
  circleNextWeekRsvp: boolean;
};

export type SessionState = {
  user: UserProfile | null;
  events: CommunityEvent[];
};

function defaultState(): SessionState {
  return {
    user: null,
    events: seedEvents.map((e) => ({ ...e })),
  };
}

export function loadSession(): SessionState {
  if (typeof window === "undefined") return defaultState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as SessionState;
    const events =
      Array.isArray(parsed.events) &&
      parsed.events.length > 0 &&
      parsed.events.every(
        (e) => typeof e.image === "string" && typeof e.dayOffset === "number",
      )
        ? parsed.events
        : seedEvents.map((e) => ({ ...e }));
    const user = parsed.user
      ? {
          ...parsed.user,
          circleNextWeekRsvp: Boolean(parsed.user.circleNextWeekRsvp),
          friendIds: Array.isArray(parsed.user.friendIds)
            ? parsed.user.friendIds
            : [],
        }
      : null;
    return {
      user,
      events,
    };
  } catch {
    return defaultState();
  }
}

export function saveSession(state: SessionState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function createEmptyProfile(
  email: string,
  password: string,
): UserProfile {
  return {
    email: email.trim().toLowerCase(),
    password,
    name: "",
    age: "",
    hobby: "",
    interests: [],
    setupComplete: false,
    joinedEventIds: [],
    friendIds: [],
    circleNextWeekRsvp: false,
  };
}

import { useState, useEffect, useRef } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { db } from '../firebase';

function randomCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

export function useFamilyCode() {
  // ownCode is the code auto-generated for this device — stored as state so
  // isOwn stays correct after resetCode() generates a new one.
  const [ownCode, setOwnCode] = useState(() => {
    const stored = localStorage.getItem('own_family_code');
    if (stored) return stored;
    const code = randomCode();
    localStorage.setItem('own_family_code', code);
    return code;
  });

  const [code, setCodeState] = useState(
    () => localStorage.getItem('family_code') || ownCode
  );

  function setCode(c) {
    const clean = c.trim().toUpperCase();
    localStorage.setItem('family_code', clean);
    setCodeState(clean);
  }

  // currentValues: write them to the new Firebase path before the path changes,
  // so useSynced reads back the right data immediately on re-subscribe.
  function resetCode(currentValues = {}) {
    const newCode = randomCode();
    localStorage.setItem('own_family_code', newCode);
    localStorage.setItem('family_code', newCode);
    setOwnCode(newCode);   // keeps isOwn === true after reset
    setCodeState(newCode);

    const { records, kid1, kid2 } = currentValues;
    if (records && Object.keys(records).length > 0)
      set(ref(db, `families/${newCode}/records`), records).catch(() => {});
    if (kid1) set(ref(db, `families/${newCode}/kid1`), kid1).catch(() => {});
    if (kid2) set(ref(db, `families/${newCode}/kid2`), kid2).catch(() => {});
  }

  const isOwn = code === ownCode;
  return [code, setCode, isOwn, resetCode];
}

// Firebase is the source of truth.
// isOwn=true  → if Firebase is empty on first connect, upload local data (migration).
// isOwn=false → if Firebase is empty, leave state as-is (never overwrite another family).
export function useSynced(familyCode, key, initial, isOwn) {
  const lsKey = `behaviour_${key}`;

  // Initialise from localStorage so records are visible instantly on load,
  // before Firebase responds — prevents passing {} to resetCode on first open.
  const [value, setValueState] = useState(() => {
    try {
      const v = localStorage.getItem(lsKey);
      return v ? JSON.parse(v) : initial;
    } catch { return initial; }
  });

  const firstRead = useRef(true);
  const isMounted = useRef(false); // tracks whether this is a path change vs first mount
  const isOwnRef = useRef(isOwn);
  isOwnRef.current = isOwn;

  const path = `families/${familyCode}/${key}`;

  useEffect(() => {
    firstRead.current = true;

    // On code switch (join / reset) clear stale data while new data loads.
    // Skip on first mount so the localStorage snapshot shows immediately.
    if (isMounted.current) setValueState(initial);
    isMounted.current = true;

    const dbRef = ref(db, path);
    const unsub = onValue(dbRef, snap => {
      const fbData = snap.val();

      if (fbData !== null) {
        setValueState(fbData);
        try { localStorage.setItem(lsKey, JSON.stringify(fbData)); } catch {}
      } else if (firstRead.current && isOwnRef.current) {
        // Own code + Firebase empty → one-time migration from localStorage
        try {
          const localStr = localStorage.getItem(lsKey);
          if (localStr) {
            const localData = JSON.parse(localStr);
            set(dbRef, localData).catch(() => {});
            setValueState(localData);
          }
        } catch {}
      }

      firstRead.current = false;
    });

    return unsub;
  }, [path]); // eslint-disable-line react-hooks/exhaustive-deps

  function setValue(updater) {
    setValueState(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      set(ref(db, path), next).catch(() => {});
      try { localStorage.setItem(lsKey, JSON.stringify(next)); } catch {}
      return next;
    });
  }

  return [value, setValue];
}

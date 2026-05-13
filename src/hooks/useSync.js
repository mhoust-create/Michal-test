import { useState, useEffect } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { db } from '../firebase';

function randomCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

export function useFamilyCode() {
  const [code, setCodeState] = useState(
    () => localStorage.getItem('family_code') || randomCode()
  );

  function setCode(c) {
    const clean = c.trim().toUpperCase();
    localStorage.setItem('family_code', clean);
    setCodeState(clean);
  }

  useEffect(() => {
    localStorage.setItem('family_code', code);
  }, []);

  return [code, setCode];
}

// Syncs a single value at families/{code}/{key} in real-time.
// Falls back to localStorage if Firebase is not configured.
export function useSynced(familyCode, key, initial) {
  const lsKey = `behaviour_${key}`;
  const [value, setValueState] = useState(
    () => {
      try { const v = localStorage.getItem(lsKey); return v ? JSON.parse(v) : initial; }
      catch { return initial; }
    }
  );

  const path = `families/${familyCode}/${key}`;

  useEffect(() => {
    const r = ref(db, path);
    return onValue(r, snap => {
      const v = snap.val();
      const next = v !== null ? v : initial;
      setValueState(next);
      try { localStorage.setItem(lsKey, JSON.stringify(next)); } catch {}
    });
  }, [path]);

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

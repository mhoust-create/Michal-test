import { useState, useEffect, useRef } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { db } from '../firebase';

function randomCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

// ownCode: auto-generated once per device, never changes.
// activeCode: the code currently in use (may differ if the user joined another family).
export function useFamilyCode() {
  const [ownCode] = useState(() => {
    const stored = localStorage.getItem('own_family_code');
    if (stored) return stored;
    const code = randomCode();
    localStorage.setItem('own_family_code', code);
    return code;
  });

  const [code, setCodeState] = useState(
    () => localStorage.getItem('family_code') || ownCode
  );

  useEffect(() => {
    if (!localStorage.getItem('family_code')) {
      localStorage.setItem('family_code', ownCode);
    }
  }, []);

  function setCode(c) {
    const clean = c.trim().toUpperCase();
    localStorage.setItem('family_code', clean);
    setCodeState(clean);
  }

  const isOwn = code === ownCode;
  return [code, setCode, isOwn, ownCode];
}

// Syncs a value at families/{familyCode}/{key}.
// On first connect with own code + empty Firebase → uploads local data.
// On join (not own code) + empty Firebase → stays empty, does not overwrite.
export function useSynced(familyCode, key, initial, isOwn) {
  const lsKey = `behaviour_${key}`;
  const [value, setValueState] = useState(initial);
  const firstRead = useRef(true);
  const isOwnRef = useRef(isOwn);
  isOwnRef.current = isOwn;

  const path = `families/${familyCode}/${key}`;

  useEffect(() => {
    firstRead.current = true;
    setValueState(initial); // Reset while switching to new path

    const dbRef = ref(db, path);
    const unsub = onValue(dbRef, snap => {
      const fbData = snap.val();

      if (fbData !== null) {
        // Firebase has data — use it and cache locally
        setValueState(fbData);
        try { localStorage.setItem(lsKey, JSON.stringify(fbData)); } catch {}
      } else if (firstRead.current && isOwnRef.current) {
        // Own code, Firebase empty — upload whatever we have locally
        try {
          const localStr = localStorage.getItem(lsKey);
          if (localStr) {
            const localData = JSON.parse(localStr);
            set(dbRef, localData).catch(() => {});
            setValueState(localData);
          }
        } catch {}
      }
      // Joined foreign code + Firebase empty → leave as initial (empty)

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

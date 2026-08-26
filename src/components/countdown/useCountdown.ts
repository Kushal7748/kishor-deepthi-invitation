import { useState, useEffect } from 'react';
import { invitationConfig } from '../../config/invitation';
import { getCountdownState, resolveEventDate, type CountdownState } from '../../lib/dateUtils';

export function useCountdown(): CountdownState {
  const targetDate = resolveEventDate(invitationConfig.event);
  const [state, setState] = useState<CountdownState>(() =>
    getCountdownState(targetDate, new Date())
  );

  useEffect(() => {
    if (!targetDate) return;

    const interval = setInterval(() => {
      setState(getCountdownState(targetDate, new Date()));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return state;
}

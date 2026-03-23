import { useState, useEffect } from 'react';
import { TOTAL } from '../utils/constants';

export function useAppState() {
  const TODAY = new Date().toISOString().split('T')[0];
  const [theme, setTheme] = useState('dark');
  const [state, setState] = useState({
    pills: Array(TOTAL).fill(false),
    streak: 0,
    lastDate: null,
    history: {},
    meals: [],
    kcalGoal: 1800
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('hashi_theme');
    if (savedTheme === 'light') {
      setTheme('light');
      document.body.classList.add('light-theme');
    }
  }, []);

  const toggleTheme = () => {
    const isLight = document.body.classList.toggle('light-theme');
    setTheme(isLight ? 'light' : 'dark');
    localStorage.setItem('hashi_theme', isLight ? 'light' : 'dark');
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem('hashi_state_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        let ns = { ...state, ...parsed };
        
        if (ns.lastDate !== TODAY) {
          if (ns.lastDate) {
            const yPct = (ns.pills.filter(Boolean).length / TOTAL) * 100;
            if (!ns.history[ns.lastDate]) {
              ns.history[ns.lastDate] = { pct: Math.round(yPct) };
            }
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yStr = yesterday.toISOString().split('T')[0];
            if (ns.lastDate === yStr && yPct >= 80) {
              ns.streak = (ns.streak || 0) + 1;
            } else if (ns.lastDate !== yStr) {
              ns.streak = 0;
            }
          }
          ns.pills = Array(TOTAL).fill(false);
          ns.lastDate = TODAY;
          ns.meals = [];
        }
        setState(ns);
      } else {
        setState(s => ({ ...s, lastDate: TODAY }));
      }
    } catch(e) {}
  }, []);

  useEffect(() => {
    localStorage.setItem('hashi_state_v2', JSON.stringify(state));
  }, [state]);

  const togglePill = (idx) => {
    const newPills = [...state.pills];
    newPills[idx] = !newPills[idx];
    setState({ ...state, pills: newPills });
  };

  const resetDay = () => setState({ ...state, pills: Array(TOTAL).fill(false), meals: [] });

  const addMeal = (name, kcal) => {
    const time = new Date().toLocaleTimeString('ro-RO', {hour:'2-digit', minute:'2-digit'});
    const newMeals = [...(state.meals || []), { name, kcal: Number(kcal), time }];
    
    const totalKcal = newMeals.reduce((sum, m) => sum + m.kcal, 0);
    const ns = { ...state, meals: newMeals };
    if (!ns.history[TODAY]) ns.history[TODAY] = {};
    ns.history[TODAY].kcal = totalKcal;
    
    setState(ns);
  };

  const setKcalGoal = (goal) => {
    setState({ ...state, kcalGoal: Number(goal) });
  };

  const saveJournal = (note, mood) => {
    const ns = { ...state };
    if (!ns.history[TODAY]) ns.history[TODAY] = {};
    ns.history[TODAY].mood = mood || '😐';
    ns.history[TODAY].note = note;
    ns.history[TODAY].time = new Date().toLocaleTimeString('ro-RO', {hour:'2-digit', minute:'2-digit'});
    setState(ns);
  };

  return { theme, toggleTheme, state, togglePill, resetDay, saveJournal, addMeal, setKcalGoal, TODAY };
}
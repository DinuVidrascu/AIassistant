import React, { useState } from 'react';
import Header from './components/Header';
import Progress from './components/Progress';
import Modal from './components/Modal';
import Confetti from './components/Confetti';
import TabToday from './pages/TabToday';
import TabCalendar from './pages/TabCalendar';
import TabJournal from './pages/TabJournal';
import TabKcal from './pages/TabKcal';
import TabAi from './pages/TabAi';
import { useAppState } from './hooks/useAppState';
import { TOTAL } from './utils/constants';

function App() {
  const { theme, toggleTheme, state, togglePill, resetDay, saveJournal, addMeal, setKcalGoal } = useAppState();
  const [activeTab, setActiveTab] = useState('azi');
  const [modal, setModal] = useState({ open: false, key: null });

  const donePills = state.pills.filter(Boolean).length;
  const isAllDone = donePills === TOTAL;

  return (
    <>
      {isAllDone && <Confetti />}
      
      <Header theme={theme} toggleTheme={toggleTheme} streak={state.streak || 0} />
      <Progress donePills={donePills} />

      <div className="tabs">
        <button className={`tab ${activeTab === 'azi' ? 'active' : ''}`} onClick={() => setActiveTab('azi')}>📋 Azi</button>
        <button className={`tab ${activeTab === 'calendar' ? 'active' : ''}`} onClick={() => setActiveTab('calendar')}>📊 Calendar</button>
        <button className={`tab ${activeTab === 'jurnal' ? 'active' : ''}`} onClick={() => setActiveTab('jurnal')}>😊 Jurnal</button>
        <button className={`tab ${activeTab === 'kcal' ? 'active' : ''}`} onClick={() => setActiveTab('kcal')}>🍎 Kcal</button>
        <button className={`tab ${activeTab === 'ai' ? 'active' : ''}`} onClick={() => setActiveTab('ai')}>✨ Asistent</button>
      </div>

      {activeTab === 'azi' && <TabToday pills={state.pills} togglePill={togglePill} setModal={setModal} isAllDone={isAllDone} />}
      {activeTab === 'calendar' && <TabCalendar history={state.history} streak={state.streak || 0} />}
      {activeTab === 'jurnal' && <TabJournal history={state.history} onSave={saveJournal} />}
      {activeTab === 'kcal' && <TabKcal state={state} addMeal={addMeal} setKcalGoal={setKcalGoal} />}
      {activeTab === 'ai' && <TabAi />}

      {modal.open && <Modal modalKey={modal.key} onClose={() => setModal({ open: false })} />}

      <div className="bottom-reset">
        <button className="reset-btn" onClick={resetDay}>↺ Resetează ziua</button>
      </div>
    </>
  );
}

export default App;
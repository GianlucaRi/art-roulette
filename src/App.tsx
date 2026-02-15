import { useState, useEffect, useCallback, useRef } from 'react';
import { Roulette } from './Roulette';
import { ExerciseResult, SpinState, RouletteType, OptionalWheelsState } from './types';
import { ROULETTE_DATA } from './data';
import { triggerConfetti } from './confetti';
import styles from './App.module.css';

function App() {
  const [results, setResults] = useState<ExerciseResult>({
    tool: null,
    style: null,
    subject: null,
    support: null,
    time: null,
    twist: null,
  });

  const [spinning, setSpinning] = useState<SpinState>({
    tool: false,
    style: false,
    subject: false,
    support: false,
    time: false,
    twist: false,
  });

  const [optionalWheels, setOptionalWheels] = useState<OptionalWheelsState>({
    support: false,
    time: false,
    twist: false,
  });

  const [currentSpinIndex, setCurrentSpinIndex] = useState(0);
  const [isSequentialSpin, setIsSequentialSpin] = useState(false);

  const isAnySpinning = Object.values(spinning).some(s => s);

  // Get active roulettes based on optional wheels state
  const activeRoulettes = ROULETTE_DATA.filter(roulette => {
    if (roulette.optional) {
      return optionalWheels[roulette.type as keyof OptionalWheelsState];
    }
    return true;
  });

  // Check if all active wheels have results
  const allActiveResultsSet = activeRoulettes.every(
    roulette => results[roulette.type] !== null
  );

  const confettiTriggeredRef = useRef(false);

  const handleSpinStart = (type: RouletteType) => {
    setSpinning(prev => ({ ...prev, [type]: true }));
  };

  const handleSpinEnd = (type: RouletteType, result: string) => {
    setSpinning(prev => ({ ...prev, [type]: false }));
    setResults(prev => ({ ...prev, [type]: result }));
  };

  const handleToggleOptional = (type: keyof OptionalWheelsState) => {
    setOptionalWheels(prev => ({ ...prev, [type]: !prev[type] }));
    // Reset result when toggling off
    if (optionalWheels[type]) {
      setResults(prev => ({ ...prev, [type]: null }));
    }
  };

  // Sequential spin with Space key
  const spinNext = useCallback(() => {
    if (isAnySpinning) return;

    if (!isSequentialSpin) {
      // Reset all results when starting a new sequence
      setResults({
        tool: null,
        style: null,
        subject: null,
        support: null,
        time: null,
        twist: null,
      });
      setIsSequentialSpin(true);
      setCurrentSpinIndex(0);
      confettiTriggeredRef.current = false;
      handleSpinStart(activeRoulettes[0].type);
    } else {
      const nextIndex = currentSpinIndex + 1;
      if (nextIndex < activeRoulettes.length) {
        setCurrentSpinIndex(nextIndex);
        handleSpinStart(activeRoulettes[nextIndex].type);
      } else {
        setIsSequentialSpin(false);
        setCurrentSpinIndex(0);
      }
    }
  }, [isAnySpinning, isSequentialSpin, currentSpinIndex, activeRoulettes]);

  // Auto-advance to next wheel after current finishes
  useEffect(() => {
    if (isSequentialSpin && !isAnySpinning && currentSpinIndex < activeRoulettes.length) {
      const timer = setTimeout(() => {
        spinNext();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isSequentialSpin, isAnySpinning, currentSpinIndex, activeRoulettes.length, spinNext]);

  // Trigger confetti when all active spins complete
  useEffect(() => {
    if (allActiveResultsSet && !isAnySpinning && !confettiTriggeredRef.current) {
      confettiTriggeredRef.current = true;
      triggerConfetti();
    }
  }, [allActiveResultsSet, isAnySpinning]);

  // Keyboard shortcut: Space to spin one by one
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        if (!isSequentialSpin && !isAnySpinning) {
          spinNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isSequentialSpin, isAnySpinning, spinNext]);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>🎨 Artist Exercise Roulette</h1>
          <p className={styles.subtitle}>
            Spin the wheels to generate your next creative challenge!
          </p>
          <p className={styles['keyboard-hint']}>
            Press <span className={styles['keyboard-key']}>Space</span> to spin wheels one by one
          </p>
        </header>

        <div className={styles['roulette-grid']}>
          {activeRoulettes.map(roulette => (
            <Roulette
              key={roulette.type}
              data={roulette}
              isSpinning={spinning[roulette.type]}
              onSpinStart={() => handleSpinStart(roulette.type)}
              onSpinEnd={(result) => handleSpinEnd(roulette.type, result)}
              result={results[roulette.type]}
              variant={roulette.optional ? 'slot' : 'wheel'}
            />
          ))}
        </div>

        <div className={styles.controls}>
          <div className={styles['optional-controls']}>
            <h3 className={styles['optional-title']}>Optional Wheels:</h3>
            <div className={styles['toggle-group']}>
              {ROULETTE_DATA.filter(r => r.optional).map(roulette => (
                <label key={roulette.type} className={styles['toggle-label']}>
                  <input
                    type="checkbox"
                    checked={optionalWheels[roulette.type as keyof OptionalWheelsState]}
                    onChange={() => handleToggleOptional(roulette.type as keyof OptionalWheelsState)}
                    className={styles['toggle-checkbox']}
                    disabled={isAnySpinning}
                  />
                  <span className={styles['toggle-text']} style={{ color: roulette.color }}>
                    {roulette.title}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {allActiveResultsSet && (
          <div className={styles['results-card']}>
            <h2 className={styles['results-title']}>✨ Your Exercise</h2>
            <div className={styles['results-list']}>
              {activeRoulettes.map(roulette => (
                <div key={roulette.type} className={styles['result-item']}>
                  <p className={styles['result-label']} style={{ color: roulette.color }}>
                    {roulette.title}
                  </p>
                  <p className={`${styles['result-value']} ${!results[roulette.type] ? styles.empty : ''}`}>
                    {results[roulette.type] || 'Not selected'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <footer className={styles.footer}>
          <p>Made by Gianluca • Free for artists & educators</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

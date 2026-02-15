import { useState, useEffect, useRef } from 'react';
import { RouletteData } from './types';
import { randomSelect, getSpinDuration } from './utils';
import { SPIN_DURATION } from './data';
import styles from './Roulette.module.css';

interface RouletteProps {
  data: RouletteData;
  isSpinning: boolean;
  onSpinStart: () => void;
  onSpinEnd: (result: string) => void;
  result: string | null;
  variant?: 'wheel' | 'slot';
}

const ITEM_HEIGHT = 80; // Height of each item in pixels

export function Roulette({ data, isSpinning, onSpinStart, onSpinEnd, result, variant = 'slot' }: RouletteProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [displayText, setDisplayText] = useState(result || data.options[0]);
  const animationRef = useRef<number>();
  const startPositionRef = useRef(0);
  const textIntervalRef = useRef<number>();

  useEffect(() => {
    if (isSpinning) {
      const duration = getSpinDuration(SPIN_DURATION);
      const startTime = Date.now();
      startPositionRef.current = scrollPosition;
      
      // Select final result
      const finalResult = randomSelect(data.options);
      const finalIndex = data.options.indexOf(finalResult);
      
      // For wheel variant: rapidly cycle through text options
      if (variant === 'wheel') {
        let currentIndex = 0;
        const textCycleSpeed = 50; // Change text every 50ms
        textIntervalRef.current = window.setInterval(() => {
          currentIndex = (currentIndex + 1) % data.options.length;
          setDisplayText(data.options[currentIndex]);
        }, textCycleSpeed);
      }
      
      // Create extended list for smooth infinite scrolling
      // Add 20-30 full cycles for the spin effect
      const cycles = 20 + Math.floor(Math.random() * 10);
      const totalItems = data.options.length * cycles + finalIndex;
      // Add half item height to center the selected item in the selector box
      const finalPosition = -(totalItems * ITEM_HEIGHT) + (ITEM_HEIGHT / 2);

      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic for smooth deceleration
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentPosition = startPositionRef.current + (finalPosition - startPositionRef.current) * eased;
        
        setScrollPosition(currentPosition);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setScrollPosition(finalPosition);
          if (textIntervalRef.current) {
            clearInterval(textIntervalRef.current);
          }
          setDisplayText(finalResult);
          onSpinEnd(finalResult);
        }
      };

      animationRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        if (textIntervalRef.current) {
          clearInterval(textIntervalRef.current);
        }
      };
    }
  }, [isSpinning, data.options, onSpinEnd, variant]);

  const handleSpin = () => {
    if (!isSpinning) {
      onSpinStart();
    }
  };

  // Create extended list for display (repeat options many times for smooth scrolling)
  const displayItems = [];
  const repeatCount = 50; // Enough repetitions for smooth appearance
  for (let i = 0; i < repeatCount; i++) {
    displayItems.push(...data.options);
  }

  if (variant === 'wheel') {
    return (
      <div className={styles.roulette}>
        <h2 className={styles['roulette-title']} style={{ color: data.color }}>
          {data.title}
        </h2>
        
        <div className={styles['wheel-container']}>
          <div 
            className={styles['wheel-display']}
            style={{ 
              background: `linear-gradient(135deg, ${data.color}ee 0%, ${data.color}aa 100%)`,
            }}
          >
            <div className={styles['wheel-text']}>
              {isSpinning ? displayText : (result || '?')}
            </div>
          </div>
        </div>

        {result && !isSpinning && (
          <div className={styles['roulette-result']} style={{ color: data.color }}>
            <strong>{result}</strong>
          </div>
        )}

        <button
          className={styles['spin-button']}
          onClick={handleSpin}
          disabled={isSpinning}
          style={{ backgroundColor: data.color }}
        >
          {isSpinning ? 'Spinning...' : 'Spin'}
        </button>
      </div>
    );
  }

  return (
    <div className={styles.roulette}>
      <h2 className={styles['roulette-title']} style={{ color: data.color }}>
        {data.title}
      </h2>
      
      <div className={styles['slot-machine']}>
        <div className={styles['slot-window']}>
          <div 
            className={styles['slot-items']}
            style={{ transform: `translateY(${scrollPosition}px)` }}
          >
            {displayItems.map((option, index) => (
              <div 
                key={index}
                className={styles['slot-item']}
                style={{ height: `${ITEM_HEIGHT}px` }}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
        
        <div 
          className={styles['slot-selector']}
          style={{ borderColor: data.color, backgroundColor: `${data.color}15` }}
        />
      </div>

      {result && (
        <div className={styles['roulette-result']} style={{ color: data.color }}>
          <strong>{result}</strong>
        </div>
      )}

      <button
        className={styles['spin-button']}
        onClick={handleSpin}
        disabled={isSpinning}
        style={{ backgroundColor: data.color }}
      >
        {isSpinning ? 'Spinning...' : 'Spin'}
      </button>
    </div>
  );
}

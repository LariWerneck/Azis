import { useEffect, useState } from "react";
import styles from "./RewardRevealModal.module.css";
import chestGif from "@/assets/treasure chest (1).gif";

interface RewardRevealModalProps {
  rewardName: string;
  rewardEmoji: string;
  onClose: () => void;
}

const CONFETTI: Array<{
  left: string;
  color: string;
  delay: string;
  dur: string;
  size: number;
  rotate: number;
}> = [
  { left: "8%",  color: "#ffd700", delay: "1.55s", dur: "3.2s", size: 10, rotate: 45 },
  { left: "18%", color: "#ff6b6b", delay: "1.80s", dur: "2.8s", size:  7, rotate: 20 },
  { left: "28%", color: "#ffffff", delay: "1.50s", dur: "3.6s", size:  8, rotate: 70 },
  { left: "38%", color: "#ffd700", delay: "2.00s", dur: "2.6s", size:  9, rotate: 10 },
  { left: "48%", color: "#ff9f43", delay: "1.70s", dur: "3.0s", size:  6, rotate: 55 },
  { left: "58%", color: "#ffffff", delay: "1.90s", dur: "2.5s", size: 10, rotate: 30 },
  { left: "68%", color: "#ffd700", delay: "2.10s", dur: "3.4s", size:  8, rotate: 80 },
  { left: "78%", color: "#ff6b6b", delay: "1.65s", dur: "2.9s", size:  7, rotate: 15 },
  { left: "88%", color: "#ff9f43", delay: "1.85s", dur: "3.1s", size:  9, rotate: 60 },
  { left: "13%", color: "#ffd700", delay: "2.20s", dur: "2.7s", size:  6, rotate: 40 },
  { left: "33%", color: "#ff6b6b", delay: "1.75s", dur: "3.5s", size: 10, rotate: 90 },
  { left: "53%", color: "#ffffff", delay: "1.55s", dur: "3.8s", size:  7, rotate: 25 },
  { left: "63%", color: "#ffd700", delay: "2.05s", dur: "2.4s", size:  8, rotate: 65 },
  { left: "73%", color: "#ff9f43", delay: "1.95s", dur: "3.3s", size:  9, rotate: 5  },
  { left: "23%", color: "#ffffff", delay: "2.15s", dur: "2.8s", size:  6, rotate: 50 },
  { left: "83%", color: "#ffd700", delay: "1.60s", dur: "3.0s", size: 10, rotate: 35 },
];

export default function RewardRevealModal({ rewardName, rewardEmoji, onClose }: RewardRevealModalProps) {
  const [fading, setFading] = useState(false);
  const [gifKey] = useState(() => Date.now());

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 5000);
    const t2 = setTimeout(onClose, 5700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onClose]);

  return (
    <div
      className={`${styles.overlay} ${fading ? styles.fading : ""}`}
      onClick={onClose}
    >
      {/* Confetti layer covers the full overlay */}
      <div className={styles.confettiLayer} aria-hidden="true">
        {CONFETTI.map((p, i) => (
          <span
            key={i}
            className={styles.confetti}
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              background: p.color,
              animationDelay: p.delay,
              animationDuration: p.dur,
              borderRadius: p.rotate > 40 ? "50%" : "2px",
            }}
          />
        ))}
      </div>

      {/* Main stage — click inside does not propagate to overlay */}
      <div className={styles.stage} onClick={(e) => e.stopPropagation()}>
        {/* Chest + CSS glow burst behind it */}
        <div className={styles.imageStack}>
          <div className={styles.glow} aria-hidden="true" />
          <img
            key={`chest-${gifKey}`}
            src={chestGif}
            alt=""
            className={styles.chest}
          />
        </div>

        {/* Reward text slides up from the light */}
        <div className={styles.rewardText}>
          <span className={styles.emoji}>{rewardEmoji}</span>
          <span className={styles.name}>{rewardName}</span>
          <span className={styles.hint}>Recompensa resgatada!</span>
        </div>
      </div>
    </div>
  );
}

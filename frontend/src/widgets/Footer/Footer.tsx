import { Paragraph } from "@/shared/ui/Paragraph";
import styles from "./Footer.module.scss";
import Link from "next/link";
import { useRef } from "react";
import useToast from "@shared/lib/hooks/useToast";
import { Toast } from "@shared/ui/Toast";
import { AUTHOR_GITHUB, EASTER_EGG } from "@shared/config/constants";

export const Footer = () => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { toasts, showToast, removeToast } = useToast();

  const handleEasterEggEnter = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      const randomMessage =
        EASTER_EGG[Math.floor(Math.random() * EASTER_EGG.length)];
      showToast(randomMessage);
    }, 10000);
  };

  const handleEasterEggLeave = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <>
      <footer className={styles.footer}>
        <Paragraph position="end">
          {`© ${new Date().getFullYear()} Calculate the markup, dude. Разработчик: `}
          <Link
            href={AUTHOR_GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            onMouseEnter={handleEasterEggEnter}
            onMouseLeave={handleEasterEggLeave}
          >
            Берендеев Игорь
          </Link>
        </Paragraph>
      </footer>
      {toasts.map((toast) => (
        <Toast
          title="Игорь Б."
          key={toast.id}
          text={toast.text}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </>
  );
};

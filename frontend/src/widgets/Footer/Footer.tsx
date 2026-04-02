import { Paragraph } from "@/shared/ui/Paragraph";
import styles from "./Footer.module.scss";

export const Footer = () => (
  <footer className={styles.footer}>
    <Paragraph position="end">
      {`© ${new Date().getFullYear()} Calculate the markup, dude. Разработчик: `}
      <a
        href="https://github.com/MrKarlLogan"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        Берендеев Игорь
      </a>
    </Paragraph>
  </footer>
);

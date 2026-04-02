import { TParagraph } from "./Paragraph.type";

export const Paragraph = ({
  children,
  className,
  size = 16,
  weight = "regular",
  position = "center",
}: TParagraph) => {
  const styles = {
    inlineSize: "100%",
    fontSize: `${size}px`,
    fontWeight: weight === "regular" ? "400" : "700",
    textAlign: position,
  };

  return (
    <p className={className} style={styles}>
      {children}
    </p>
  );
};

import { THeadline } from "./Headline.type";

export const Headline = ({
  children,
  as: Tag = "h2",
  className,
  size = 16,
  weight = "regular",
  position = "center",
}: THeadline) => {
  const styles = {
    inlineSize: "100%",
    fontSize: `${size}px`,
    fontWeight: weight === "regular" ? "400" : "700",
    textAlign: position,
  };

  return (
    <Tag className={className} style={styles}>
      {children}
    </Tag>
  );
};

import { Headline } from "../Headline";
import { TGreeting } from "./Greeting.type";

export const Greeting = ({ name }: TGreeting) => {
  const currentHour = new Date().getHours();
  let currentGreeting: string;

  switch (true) {
    case currentHour >= 5 && currentHour < 12:
      currentGreeting = "Доброе утро";
      break;
    case currentHour >= 12 && currentHour < 18:
      currentGreeting = "Добрый день";
      break;
    case currentHour >= 18 && currentHour < 23:
      currentGreeting = "Добрый вечер";
      break;
    default:
      currentGreeting = "Доброй ночи";
  }

  return (
    <Headline as="h3" weight="bold">
      {currentGreeting}, {name}
    </Headline>
  );
};

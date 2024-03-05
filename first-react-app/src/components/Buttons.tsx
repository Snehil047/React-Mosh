import { MouseEventHandler } from "react";
import { CiHeart } from "react-icons/ci";
interface Props {
  color?: "primary" | "secondary" | "warning" | "danger";
  text: string;
  onClick: () => void;
}

const Buttons = ({ color = "primary", text, onClick }: Props) => {
  return (
    <div>
      <button
        type="button"
        className={"btn btn-" + color}
        onClick={() => onClick()}
      >
        {text}
      </button>
    </div>
  );
};

export default Buttons;

// We set the default value of color to Primary, but after that we were still getting error on App.tsx that color property is not defined, to make that work, we can make the property optional by adding ? in front of them, that makes the property optional.

// But what if u add invalid color, to make sure that the entered color is not invalid, we can make it choose from the string literals. By doing this, if you enter an invalid color, TypeScript will give a runtime error that the input color is not matching the string literal and not assignable to the available string literals.

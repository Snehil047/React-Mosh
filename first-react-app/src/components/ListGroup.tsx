import { MouseEvent } from "react";
import { useState } from "react";
import styles from "./ListGroup.module.css";
import styled from "styled-components";
import { BsCalendar2MonthFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import Buttons from "./Buttons";

interface Props {
  item: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ item, heading, onSelectItem }: Props) {
  //variable decalration using useState ->
  const [selectedIndex, SetSelectedIndex] = useState(-1);
  // item = [];
  const getMessage = () => {
    return item.length === 0 ? <p>No Items Found</p> : null;
  };
  // Event Handler
  // const handleClick = () => {
  //   return (event: MouseEvent) => console.log(event);
  // };

  // if (item.length === 0) {
  //   return (
  //     <>
  //       <h1>List Groups</h1>    it is not considered as a best practise
  //       <p>No items Found</p>
  //     </>
  //   );
  // }
  return (
    <>
      <h1>{heading}</h1>
      {getMessage()}
      {item.length === 0 && <p>No Items Found</p>}
      <ul className={[styles.listGroup, styles.container].join(" ")}>
        {item.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => {
              SetSelectedIndex(index);
              onSelectItem(item);
            }}
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
      <IconContext.Provider value={{ className: "top-react-icons" }}>
        <BsCalendar2MonthFill color="red" size="20" />
      </IconContext.Provider>
    </>
  );
}

export default ListGroup;

// One very important thing to note in react is that you can only ever return one element from a component (A component is a function that has Pascal Casing(first letter capital)). To get around that we can use a <div></div> to wrap around that, or we can just use a fragment, a fragment is just a empty tag <></>.

// Another important bit is that when we dynamically generate an element, like in this case (li), we got an error saying "Each Child in a list should have a unique "key" prop." Because when we update or generate new elements dynamically, react wants to know that which element is gettin updated or changed. In our case, we kept the item as  a key, but in real world projects when id comes from an api, we should write key={item.id}.

// At Line 15, it is called as a Ternary Operator.

// However Sometimes, due to using this, our JSX markup may get very Complicated, in that case we can just save the condition in a variable and use that instead to make it more clean. We can use a function also, whic is better when we need to pass an arguement.

// At line 20, a better way to write that condition is to not write the ternary operator, instead use the logical &&. No the way it works is its a boolean operator.
// true && "Mosh" = "Mosh"
// false && "Mosh" = False

// At line 8, we used useState to tell react that, our component can have state that will change over time.

// VERY IMPORTANT: EACH COMPONENT IS GOING TO HAVE ITS OWN STATE.

// Like if we render List Group again in App.tsx it is going to have a different state than the first one.

import ListGroup from "./components/ListGroup";
import "./App.css";
import Alert from "./components/Alert";
import Buttons from "./components/Buttons";
import { StrictMode, useState } from "react";
import Like from "./components/Like";
import StrictMood from "./components/StrictMood";

function App() {
  let item = ["New york", "LA", "Ohio", "Mumbai"];
  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const [alertVisible, setAlertVisibility] = useState(false);
  const clickHandler = () => {
    setAlertVisibility(true);
  };

  const closeHandler = () => {
    setAlertVisibility(false);
  };

  const likeHandler = () => {
    console.log("clicked");
  };

  const [drink, setDrink] = useState({
    title: "Americano",
    price: 5,
  });

  // const coffeeHandler = () => {
  //   const newDrink = {
  //     ...drink,
  //     title: drink.title,
  //     price: 6,
  //   };
  //   setDrink(newDrink);
  // };

  // Also the above statement can be written like ->

  const coffeeHandler = () => {
    setDrink({ ...drink, price: 6 });
  };

  //nested object update start

  const [zip, setZip] = useState({
    name: "John Cena",
    address: {
      city: "Ohio",
      zipCode: 94111,
    },
  });

  const zipHandler = () => {
    setZip({ ...zip, address: { ...zip.address, zipCode: 94112 } });
  };

  // nested object update finished

  // array update start

  const [tags, setTags] = useState(["Happy", "Exciting"]);

  const arrayHandler = () => {
    //Add
    setTags([...tags, "Sadness"]);
    //Update
    setTags(tags.map((value) => (value === "Happy" ? "Happiness" : value)));
    //Remove
    setTags(tags.filter((tag) => tag !== "Exciting"));
  };

  // array update ends

  //Array of objects update start

  const [bugs, setBugs] = useState([
    { id: 1, title: "Bug 1", fixed: false },
    { id: 2, title: "Bug 2", fixed: false },
  ]);

  const arrayOfObjectHandler = () => {
    //update -> suppose we have to list that bug 1 is fixed on button press
    setBugs(
      bugs.map((value) => (value.id === 1 ? { ...value, fixed: true } : value))
    );
  };
  console.log(bugs);

  //Array of objects update end

  return (
    <div>
      <ListGroup
        item={item}
        heading="Cities"
        onSelectItem={handleSelectItem}
      ></ListGroup>
      {alertVisible && (
        <Alert ide="1." onClose={closeHandler}>
          Alert <span>People</span>
        </Alert>
      )}
      <Buttons color="warning" text="Warning" onClick={clickHandler}></Buttons>
      <Like onClick={likeHandler}></Like>
      <StrictMood />
      <StrictMood />
      <StrictMood />
      {drink.price}
      <button onClick={coffeeHandler}>Coffee</button>
      {zip.address.zipCode}
      <button onClick={zipHandler}>City Zip</button>
      <button onClick={arrayHandler}>Array Update</button>
      <button onClick={arrayOfObjectHandler}>Array Of Objects</button>
    </div>
  );
}

export default App;

//At line 18, we can pass children as Props, and due to this we can even use HTML elements inside the children components, But to use that we must change the props value from string to ReactNode. ReactNode lets us use HTML elements iniside a child.

// UPDATING OBJECTS

// Regarding the coffehandler and updating the drink price, we cannot directly go in the object and update it from there using drink.price = 6, No. We have to make a new object, copy the object values in that and update the changes there, and assign that value to the setState(newValue).

// Just like props we should treat State variables as immutable. But What if u had multiple properties for an object, the task becomes very tideous when we have to write every single one of those properties again, insted of that we can use the spread operator. (...drink)

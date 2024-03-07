import ListGroup from "./components/ListGroup";
import "./App.css";
import Alert from "./components/Alert";
import Buttons from "./components/Buttons";
import { StrictMode, useEffect, useState } from "react";
import Like from "./components/Like";
import StrictMood from "./components/StrictMood";
import { produce } from "immer";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import ExpandableText from "./components/ExpandableText";
import Form from "./components/Form";
import HookFrm from "./components/HookFrm";
import ExpenseList from "./components/expense-tracker/components/ExpenseList";
import ExpenseFilter from "./components/expense-tracker/components/ExpenseFilter";
import ExpenseForm from "./components/expense-tracker/components/ExpenseForm";
import ProductList from "./components/ProductList";
import axios, { AxiosError, AxiosResponse, CanceledError } from "axios";

export const categories = ["Groceries", "Utilities", "Entertainment"];

interface User {
  id: number;
  name: string;
}

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
    // setBugs(
    //   bugs.map((value) => (value.id === 1 ? { ...value, fixed: true } : value))
    // );
    // Using immer to do the above logic ->

    setBugs(
      produce((draft) => {
        const bug = draft.find((bug) => bug.id === 1);
        if (bug) bug.fixed = true;
      })
    );
  };
  console.log(bugs);

  //Array of objects update end

  //**VERY IMPORTANT** -> Sharing State Between Components ->

  const [cartItems, setCartItems] = useState(["Product1", "Product2"]);

  const clearHandler = () => {
    setCartItems([]);
  };

  //Upadte exercise 1

  const [game, setGame] = useState({
    id: 1,
    player: {
      name: "John",
    },
  });

  const updateHandler = () => {
    setGame({ ...game, player: { ...game.player, name: "Cena" } });
  };

  //Update exercise 2

  const [pizza, setPizza] = useState({
    name: "Spicy Peproni",
    toppings: ["Mushroom"],
  });

  const pizzHandler = () => {
    setPizza({ ...pizza, toppings: [...pizza.toppings, "GingerBread"] });
  };

  //Update Exercise 3

  const [cart, setCart] = useState({
    discount: 1,
    items: [
      { id: 1, title: "Product1", quantity: 1 },
      { id: 2, title: "Product2", quantity: 1 },
    ],
  });

  const quantityHandler = () => {
    setCart({
      ...cart,
      items: cart.items.map((item) =>
        item.id === 1 ? { ...item, quantity: item.quantity + 1 } : item
      ),
    });
  };

  console.log(cart);

  //ExpanseList Start

  const [selectedCategory, setSelectedCategory] = useState("");

  const [expenses, setExpenses] = useState([
    { id: 1, description: "aaa", amount: 10, category: "Utilities" },
    { id: 2, description: "bbb", amount: 10, category: "Utilities" },
    { id: 3, description: "ccc", amount: 10, category: "Utilities" },
    { id: 4, description: "ddd", amount: 10, category: "Utilities" },
  ]);

  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  // Axios FETCH DATA (Backend)

  const [error, setError] = useState("");

  const [users, setUsers] = useState<User[]>([]);

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    //However, there is another way to approach this using Async & Await.
    // const fetchUsers = async () => {
    //   try {
    //     const res = await axios.get<User[]>(
    //       "https://jsonplaceholder.typicode.com/sers"
    //     );
    //     setUsers(res.data);
    //   } catch (err) {
    //     setError((err as AxiosError).message);
    //   }
    // };
    // fetchUsers();

    // get -> Promise -> then or catch

    const controller = new AbortController();

    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then((response) => {
        setUsers(response.data);
        setLoader(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoader(false);
      });

    return () => controller.abort;
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((i) => i.id !== user.id)); // Updated UI
    axios
      .delete("https://jsonplaceholder.typicode.com/users" + user.id)
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const addUser = () => {
    const originalUser = [...users];
    const newUser = {
      id: 0,
      name: "Harshit",
    };
    setUsers([newUser, ...users]);

    axios
      .post("https://jsonplaceholder.typicode.com/users", newUser)
      .then((res) => setUsers([res.data, ...users]))
      .catch((err) => {
        setError(err);
        setUsers(originalUser);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    axios
      .patch(
        "https://jsonplaceholder.typicode.com/users" + user.id,
        updatedUser
      )
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

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
      {bugs.map((bug) => (
        <p key={bug.id}>
          {bug.title} {bug.fixed ? "Fixed" : "New"}
        </p>
      ))}
      <button onClick={arrayOfObjectHandler}>Array Of Objects</button>
      <Navbar cartItemsCount={cartItems.length} />
      <Cart cartItems={cartItems} onClear={clearHandler} />
      {game.player.name}
      <button onClick={updateHandler}>Practice John State</button>
      {pizza.toppings}
      <button onClick={pizzHandler}> Pizza?</button>
      <button onClick={quantityHandler}> Add to Cart</button>
      <ExpandableText maxChars={10}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
        corrupti nostrum at, nobis doloribus sed accusantium magni inventore
        officiis molestiae eaque debitis atque maxime vero placeat quibusdam
        odio, vitae suscipit corporis quae. Fugit nam reiciendis voluptate
        accusantium consequuntur explicabo debitis placeat hic iste. Hic sequi
        voluptate accusantium, minus deleniti ea veritatis, non vero fuga ab
        accusamus, ullam deserunt at aspernatur distinctio facilis maxime
        officia sed eaque amet quo? Quo iusto alias porro quos corrupti
        voluptatem saepe fuga ipsa, omnis dignissimos libero. Nulla expedita
        quae pariatur modi similique corporis harum facere amet numquam eos est
        a, corrupti quis exercitationem libero aut.
      </ExpandableText>
      <br />
      <br />
      <br />
      <br />
      <Form />
      <br />
      <br />
      <br />
      <br />
      <HookFrm />
      <br />
      <br />
      <br />
      <br />
      <div className="mb-5">
        <ExpenseForm />
      </div>
      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>

      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
      />
      <ProductList />
      <br />
      <br />
      <br />
      <br />
      {loader && <div className="spinner-border"></div>}
      <div onClick={addUser} className="button btn btn-primary mb-3">
        Add Users
      </div>
      <ul className="list-group">
        {users.map((user) => (
          <li
            className="list-group-item d-flex justify-content-between"
            key={user.id}
          >
            {user.name}{" "}
            <div>
              {" "}
              <button
                className="btn btn-secondary me-2"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                onClick={() => deleteUser(user)}
                className="btn btn-outline-danger"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}

export default App;

//At line 18, we can pass children as Props, and due to this we can even use HTML elements inside the children components, But to use that we must change the props value from string to ReactNode. ReactNode lets us use HTML elements iniside a child.

// UPDATING OBJECTS

// Regarding the coffehandler and updating the drink price, we cannot directly go in the object and update it from there using drink.price = 6, No. We have to make a new object, copy the object values in that and update the changes there, and assign that value to the setState(newValue).

// Just like props we should treat State variables as immutable. But What if u had multiple properties for an object, the task becomes very tideous when we have to write every single one of those properties again, insted of that we can use the spread operator. (...drink)

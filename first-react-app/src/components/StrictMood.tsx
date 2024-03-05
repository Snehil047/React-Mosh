import React from "react";

let count = 0;

const StrictMood = () => {
  let count1 = 0;
  count++;
  count1++;
  return (
    <div>
      Message {count}
      <br /> Count1 {count1}
    </div>
  );
};

export default StrictMood;

// Now in browser we get as output, Message 2 , Message 4, Message 6 because react uses strict mode. React renders each meassage component twice and takes the result of 2nd render. First render is used for detecting potential issues or problems, and the 2nd render is used to finally render the component. Thats why we get that result. Now we wont get that same thing if we declare our variable inside the function/component scope.Because everytime the function/component will run/render, the value of let count1 will be assigned to 0.

// Also these are impure components or impure function.

// Strict Mode only run in development mode and not in production. In production, the components only render once.

import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";

interface Props {
  onClick: () => void;
}

const Like = ({ onClick }: Props) => {
  const [status, setStatus] = useState(false);
  const toggle = () => {
    setStatus(!status);
    onClick();
  };

  if (status) return <IoIosHeart color="#ff6b81" size={40} onClick={toggle} />;
  return <IoIosHeartEmpty size={40} onClick={toggle} />;
};

export default Like;

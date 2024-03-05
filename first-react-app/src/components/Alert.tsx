import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  ide: string;
  onClose: () => void;
}

const Alert = ({ children, ide, onClose }: Props) => {
  return (
    <div className="alert alert-primary alert-dismissible">
      {ide}
      {children}
      <button
        type="button"
        className="btn-close"
        onClick={onClose}
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
};

export default Alert;

// However, in this type of implementation, it is pretty outdated and limited, and what if you have to pass very large tex to it. In that case, we can pass children as props .

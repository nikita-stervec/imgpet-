import { useState } from "react";
import { Button } from "../Button/Button";
import styles from "./Form.module.css";

interface IFormProps {
  children: string;
  handleClick: (email: string, password: string) => void;
}

export const Form: React.FC<IFormProps> = ({ handleClick, children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles["form__wrapper"]}>
      <input
        type='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder='email'
      />
      <input
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder='password'
      />
      <Button
        onClick={() => handleClick(email, password)}
        className={styles["form__btn"]}
      >
        {children}
      </Button>
    </div>
  );
};

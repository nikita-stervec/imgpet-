import { useState } from "react";
import { Button } from "../Button/Button";
import styles from "./Form.module.css";

interface IFormProps {
  require: boolean;
  label?: string;
  children: string;
  handleClick: (email: string, password: string, username: string) => void;
}

export const Form: React.FC<IFormProps> = ({
  handleClick,
  children,
  label,
  require,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles["form__wrapper"]}>
      <input
        type='text'
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder='username'
        required={require}
      />
      {label}
      <input
        required
        type='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder='email'
      />
      <input
        required
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder='password'
      />
      <Button
        onClick={() => handleClick(email, password, username)}
        className={styles["form__btn"]}
      >
        {children}
      </Button>
    </div>
  );
};

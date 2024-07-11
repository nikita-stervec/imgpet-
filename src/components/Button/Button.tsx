import styles from "./Button.module.css";

interface IButton
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  // onClick: (
  //   event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  // ) => void;
}

export const Button = ({ children, onClick, ...props }: IButton) => {
  return (
    <button className={styles["button"]} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

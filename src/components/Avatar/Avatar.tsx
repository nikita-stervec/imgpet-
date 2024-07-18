import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const Avatar = ({ h, w }: { h: string; w: string }) => {
  const avatarFromState = useSelector((state: RootState) => state.user.avatar);
  const avatar = avatarFromState || "/avatar.jpg";

  return <img src={avatar} alt='avatar' height={h} width={w} />;
};

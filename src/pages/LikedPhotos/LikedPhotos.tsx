import { useAuth } from "../../hooks/useAuth";

export const LikedPhotos = () => {
  const { isAuth, email } = useAuth();

  return isAuth ? (
    <>
      <>Welcome {email}!</>
      <>you liked photos is...</>
    </>
  ) : (
    <>
      <>auth first!</>
    </>
  );
};

import { useSignin } from "@/apis";
import { useFetch, usePost } from "@/apis/hooks";
import { api } from "@/apis/utils";
import { ApiRoutes } from "@/constants";
import { toUrl } from "@/utils";
import { Button } from "@chakra-ui/react";

const Test = () => {
  const { mutate: signup } = usePost(ApiRoutes.SignUp);
  const { mutate: signin } = useSignin();
  const { refetch: club } = useFetch(toUrl(ApiRoutes.Group));
  const { refetch: me } = useFetch(ApiRoutes.Me);
  const { mutate: postClub } = usePost(toUrl(ApiRoutes.Group));

  const handlerSignUp = () => {
    signup({
      password: "1234",
      social_id: "1234",
      name: "SeongHwi",
      sex: true,
      phone: "01012341234",
      email: "123@gmail.com",
    });
  };

  const handlerSignIn = () => {
    signin(
      { email: "123@gmail.com", password: "1234" },
      { onSuccess: (res) => api.setToken(res.data.token) }
    );
  };

  const handlerPostClub = () => {
    postClub({
      name: "test",
      description: "test",
      capacity: 10,
    });
  };
  return (
    <>
      <Button onClick={() => handlerSignUp()}>Sign Up</Button>
      <Button onClick={() => handlerSignIn()}>Sign In</Button>
      <Button onClick={() => me()}>Me</Button>
      <Button onClick={() => club()}>Club</Button>
      <Button onClick={() => handlerPostClub()}>Post Club</Button>
    </>
  );
};

export default Test;

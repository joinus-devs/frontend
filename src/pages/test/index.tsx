import { useSignin } from "@/apis";
import { useDelete, useFetch, usePost } from "@/apis/hooks";
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
  const { mutate: postCategory } = usePost(toUrl(ApiRoutes.Category));
  const { data: categories, refetch: getCategories } = useFetch(
    toUrl(ApiRoutes.Category)
  );
  const { mutate: deleteCategory } = useDelete(toUrl(ApiRoutes.Category));

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
    signin({ email: "123@gmail.com", password: "1234" });
  };

  const handlerPostClub = () => {
    postClub({
      capacity: 20,
      categories: [3],
      description: "gd",
      maximum_age: 100,
      minimum_age: 0,
      name: "test",
      sex: true,
    });
  };
  return (
    <>
      <Button onClick={() => handlerSignUp()}>Sign Up</Button>
      <Button onClick={() => handlerSignIn()}>Sign In</Button>
      <Button onClick={() => me()}>Me</Button>
      <Button onClick={() => club()}>Club</Button>
      <Button onClick={() => handlerPostClub()}>Post Club</Button>
      <Button onClick={() => postCategory({ name: "기타" })}>
        post Category
      </Button>
      <Button
        onClick={() => {
          console.log(categories);
        }}
      >
        get Category
      </Button>
      <Button onClick={() => deleteCategory(1)}>delete Category</Button>
    </>
  );
};

export default Test;

import { useSignin } from "@/apis";
import { useGetGroupMembers } from "@/apis/group";
import { useDelete, useFetch, usePost } from "@/apis/hooks";
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
  const { mutate: deleteCategory } = useDelete(ApiRoutes.Category);
  const { refetch: getGroupMembers } = useGetGroupMembers(3);
  const { mutate: postFeed } = usePost(toUrl(ApiRoutes.GroupFeed, { id: 3 }));
  const { refetch: getFeed } = useFetch(toUrl(ApiRoutes.GroupFeed, { id: 1 }));
  const { mutate: postComment } = usePost(toUrl(ApiRoutes.Comments, { id: 5 }));

  const handlerSignUp = () => {
    signup({
      password: "1234",
      social_id: "123456",
      name: "SeongHwi3",
      sex: true,
      phone: "01012341234",
      email: "12345@gmail.com",
    });
  };

  const handlerSignIn = () => {
    signin({ email: "1234@gmail.com", password: "1234" });
  };

  const handlerPostClub = () => {
    postClub({
      capacity: 20,
      categories: [1],
      description: "gd2",
      maximum_age: 100,
      minimum_age: 0,
      name: "test3",
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
      <Button onClick={() => postCategory({ name: "영화" })}>
        post Category
      </Button>
      <Button onClick={() => getCategories()}>get Category</Button>
      <Button onClick={() => deleteCategory(1)}>delete Category</Button>
      <Button onClick={() => getGroupMembers()}>get Group Members</Button>
      <Button
        onClick={() =>
          postFeed({
            content: "안녕하세요",
            title: "제목test",
            is_private: false,
          })
        }
      >
        post Feed
      </Button>
      <Button onClick={() => getFeed()}>get Feed</Button>
      <Button onClick={() => postComment({ content: "댓글test" })}>
        post comment
      </Button>
    </>
  );
};

export default Test;

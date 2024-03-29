import { useSignin, useUpdate } from "@/apis";
import { useGetGroupMembers } from "@/apis/group";
import { useDelete, useFetch, usePost } from "@/apis/hooks";
import { ApiRoutes } from "@/constants";
import { toUrl } from "@/utils";
import { Button, Input } from "@chakra-ui/react";
import { toCategory } from "@/constants";

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
  const { mutate: updateClub } = useUpdate(toUrl(ApiRoutes.Group, { id: 1 }));
  const { mutate: deleteCategory } = useDelete(ApiRoutes.Category);
  const { refetch: getGroupMembers } = useGetGroupMembers(3);
  const { mutate: postFeed } = usePost(toUrl(ApiRoutes.GroupFeed, { id: 1 }));
  const { refetch: getFeed } = useFetch(toUrl(ApiRoutes.GroupFeed, { id: 1 }));
  const { mutate: postComment } = usePost(
    toUrl(ApiRoutes.FeedInComments, { id: 5 })
  );
  const { mutate: joinClub } = usePost(
    toUrl(ApiRoutes.GroupMembers, { id: 1 })
  );

  const categoryValues = Object.values(toCategory);
  const handlerSignUp = () => {
    signup({
      password: "12341234!@",
      name: "JohnDoe522",
      profile: "https://kr.object.ncloudstorage.com/joinus/image/profile.png",
      birth: "1995-01-01",
      sex: true,
      phone: "01012341239",
      email: "john522@gmail.com",
    });
  };

  const handlerSignIn = () => {
    signin({ email: "john522@gmail.com", password: "12341234!@" });
  };
  const hanldeUpdateClub = () => {
    updateClub({
      name: "test3",
      description: "gd2",
      capacity: 20,
      sex: true,
      minimum_age: 20,
      maximum_age: 100,
      categories: [1, 2, 3],
      images: [
        {
          url: "https://kr.object.ncloudstorage.com/joinus/image/profile.png",
          type: "main",
        },
      ],
    });
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
      images: [
        {
          url: "https://kr.object.ncloudstorage.com/joinus/image/profile.png",
          type: "main",
        },
      ],
    });
  };
  return (
    <>
      <Button onClick={handlerSignUp}>Sign Up</Button>
      <Button onClick={handlerSignIn}>Sign In</Button>
      <Button onClick={() => me()}>Me</Button>
      <Button onClick={() => club()}>Club</Button>
      <Button onClick={() => handlerPostClub()}>Post Club</Button>
      <Button
        onClick={() => {
          categoryValues.map((category) => {
            postCategory({
              name: category,
            });
          });
        }}
      >
        post Category
      </Button>
      <Button onClick={() => getCategories()}>get Category</Button>
      <Button onClick={() => deleteCategory(1)}>delete Category</Button>
      <Button onClick={() => getGroupMembers()}>get Group Members</Button>
      <Button
        onClick={() =>
          postFeed({
            content:
              "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttsttesttesttesttesttesttesttesttesttesttesttessttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestteststtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestteststtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestteststtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestteststtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestteststtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestteststtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestteststtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestteststtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestteststtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestteststtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestteststtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestteststtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestteststtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest",
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
      <Button onClick={() => joinClub({})}>joinClub</Button>
      <Button onClick={() => hanldeUpdateClub()}>UpdateClub</Button>
      <Input type={"file"} />
    </>
  );
};

export default Test;

const baseUrl = "http://44.204.44.65/";

const catyegories = [
  "영화",
  "스포츠",
  "음악",
  "게임",
  "책",
  "요리",
  "IT",
  "기타",
  "운동",
];

const api = [
  {
    url: "auth/signup",
    method: "POST",
    params: {
      password: "12341234!@",
      name: "승휘",
      profile:
        "https://kr.object.ncloudstorage.com/joinus/image/1711678253222.jpg",
      birth: "1996-01-05",
      sex: true,
      phone: "01041351531",
      email: "ush0105@aaa.com",
    },
  },
  {
    url: "auth/signin",
    method: "POST",
    params: {
      email: "ush0105@aaa.com",
      password: "12341234!@",
    },
  },
  {
    url: "clubs",
    method: "POST",
    params: {
      capacity: 20,
      categories: [9],
      description: "함께 운동하실 분들을 모집합니다.",
      maximum_age: 100,
      minimum_age: 0,
      name: `Venus Health`,
      sex: true,
      images: [
        {
          url: "https://kr.object.ncloudstorage.com/joinus/image/1713330560054.jpg",
          type: "main",
        },
      ],
    },
  },
];

const main = async () => {
  const header = {
    "Content-Type": "application/json",
    Authorization: "",
  };

  api.reduce(
    async (prev, curr) => {
      return prev.then(() => {
        return fetch(baseUrl + curr.url, {
          method: curr.method,
          headers: header,
          body: JSON.stringify(curr.params),
        }).then((response) => {
          console.log("api Request:", curr.method, baseUrl + curr.url);
          if (curr.url === "auth/signin") {
            return response.json().then((data) => {
              const token = data.data.token;
              header.Authorization = token;
            });
          }
        });
      });
    },
    new Promise((resolve) => resolve())
  );
};

main();

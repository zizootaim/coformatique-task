const url = "http://localhost:3000/";
export const getData = async (resource) => {
  try {
    const res = await fetch(url+resource);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const setData = async (resource,method,postedData) => {
  await fetch(url + resource, {
    method: method,
    body: postedData,
    headers: {
      "Content-Type": "application/json",
    },
  })
};

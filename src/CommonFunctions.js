const url = "http://localhost:3000/";

// Get Data from the Server

export const getData = async (resource) => {
  try {
    const res = await fetch(url + resource);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

// Send Data to the Server

export const setData = async (resource, method, targetData) => {
  await fetch(url + resource, {
    method: method,
    body: targetData,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

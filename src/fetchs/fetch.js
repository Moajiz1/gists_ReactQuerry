import { baseUrl } from "../constants/constants";
import { Octokit } from "@octokit/core";
import { api } from "../Components/util/fetch-utils";

export const localToken = localStorage.getItem("accessToken");

export const getStarredGists = async () => {
  const req = await api({ url: `/gists/starred` });
  return req.data;
};

export const fetchStarredGists = async (setStatus) => {
  // setLoading(true);
  const dataa = await fetch(`${baseUrl}/gists/starred`, {
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `token ${localToken}`,
    },
  })
    .then((response) => {
      setStatus(response.status);
      return response.json();
    })
    .then((response) => {
      return response;
    });
  return dataa;
};

export const fetchPrivateGist = async () => {
  const req = await api({
    url: `/gists`,
    method: "get",
  });
  return req.data;
};

export const fetchPrivateGists = async (setStatus) => {
  // setLoading(true);
  const dataa = await fetch(`${baseUrl}/gists`, {
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `token ${localToken}`,
    },
  })
    .then((response) => {
      setStatus(response.status);
      return response.json();
    })
    .then((response) => {
      return response;
    });
  return dataa;
};

export const addGist = async (opts) => {
  console.log(opts);
  const req = await api({
    url: `/gists`,
    method: "post",
    data: JSON.stringify(opts),
  });
  return req.status;
};

export const updateGists = async (opts) => {
  console.log(opts);
  const req = await api({
    url: `/gists/${opts.id}`,
    method: "patch",
    data: JSON.stringify(opts),
  });
  return req.status;
};

export const createGist = async (opts) => {
  console.log("Posting request to GitHub API...");
  const resp = await fetch(`${baseUrl}/gists`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `token ${localToken}`,
    },
    body: JSON.stringify(opts),
  }).then((response) => {
    console.log(response.status);
    return response.status;
  });
  return resp;
};

export const gistUpdatee = (id, opts) => {
  console.log("updating request to GitHub API...");
  console.log("id", id);
  fetch(`${baseUrl}/gists/${id}`, {
    method: "patch",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `token ${localToken}`,
    },
    body: JSON.stringify(opts),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("updated Gist:", data.html_url);
      alert("Check console for updated gist's link");
    });
};

export const editRecord = async (user) => {
  const data = await fetch(`${baseUrl}/gists/${user.id}`, {
    method: "get",
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      return res;
    });
  return data;
};

export const fetchRecordsBackend = async (page, per_page, setDataSource) => {
  // setLoading(true);
  // ?page=${page}&per_page=${per_page}
  const dataa = await fetch(`${baseUrl}/gists`, {
    method: "get",
  })
    .then((response) => {
      // setStatus(response.status);
      return response.json();
    })
    .then((response) => {
      setDataSource(response);
      return response;
    });
  return dataa;
};

export const forkAGists = async (id) => {
  const dataa = await fetch(`${baseUrl}/gists/${id}/forks`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `token ${localToken}`,
    },
  }).then((response) => {
    return response.status;
  });
  return dataa;
};

export const userTableRecord = async (user) => {
  if (user) {
    const data = await fetch(`${baseUrl}/users/${user}/gists`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `token ${localToken}`,
      },
    })
      .then((response) => response.json())
      .then((res) => res);

    return data;
  }
};

export const starAGist = async (id) => {
  const dataa = await fetch(`${baseUrl}/gists/${id}/star`, {
    method: "put",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `token ${localToken}`,
    },
  }).then((response) => {
    return response.status;
  });
  return dataa;
};

export const UnStarAGist = async (id) => {
  const dataa = await fetch(`${baseUrl}/gists/${id}/star`, {
    method: "delete",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `token ${localToken}`,
    },
  }).then((response) => {
    return response.status;
  });
  return dataa;
};

export const gistDelete = async (id) => {
  const dataa = await fetch(`${baseUrl}/gists/${id}`, {
    method: "delete",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `token ${localToken}`,
    },
  }).then((response) => {
    return response;
  });

  return dataa;
};

const updateGist = new Octokit({ auth: `${localToken}` });

export const update = async (dataGist) => {
  console.log(dataGist);
  if (dataGist.description && dataGist.content) {
    const data = await updateGist
      .request(`PATCH /gists/${dataGist.id}`, {
        description: dataGist?.description,
        files: dataGist?.filename,
        files: {
          [dataGist?.filename]: {
            content: dataGist?.content,
          },
        },
      })
      .then((res) => res.status);
    return data;
  }
};

export const gistOnSearch = async (userId, setDataSource) => {
  if (userId) {
    fetch(`https://api.github.com/gists/${userId}`).then((res) => {
      res.json().then((response) => {
        console.log(response);
        if (response.message !== "Not Found") setDataSource([response]);
        else setDataSource([]);
      });
    });
  } else {
    const data = await fetchRecordsBackend(1, 10, setDataSource);
    console.log(data);
    setDataSource(data);
  }
};

export const checkStar = async (id, resStar) => {
  await fetch(`${baseUrl}/gists/${id}/star`, {
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `token ${localToken}`,
    },
  }).then((response) => {
    resStar(response.status);
    return response.status;
  });
};

export const checkForkk = async (id) => {
  await fetch(`${baseUrl}/gists/${id}/forked`, {
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `token ${localToken}`,
    },
  }).then((response) => {
    console.log(response);
    // resFork(response.status);
    return response.status;
  });
};

export const fetchPanets = async () => {
  const dataa = await fetch(`${baseUrl}/gists`, {
    method: "get",
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return response;
    });
  return dataa;
};

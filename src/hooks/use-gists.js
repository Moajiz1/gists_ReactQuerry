import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  successCheck,
  successCheckAdd,
  successCheckFork,
} from "../Components/util/Utfn";
import { baseUrl } from "../constants/constants";
import { useClient } from "../context/auth-context";
import {
  addGist,
  editRecord,
  forkAGists,
  gistDelete,
  starAGist,
  UnStarAGist,
  updateGists,
} from "../fetchs/fetch";

const bookQueryConfig = {
  // cacheTime: 1000 * 60 * 60,
  // staleTime: 5000,
};

//for calling gists
const useGists = () => {
  const client = useClient();
  const { isLoading, data } = useQuery({
    queryKey: "gists",
    queryFn: () => client(`gists`).then((data) => data),
    ...{
      cacheTime: 0,
      // staleTime: 5000,
    },
  });
  if (isLoading) return "Loading...";
  return { data, isLoading };
};

const useGistStarred = () => {
  const client = useClient();
  const { isLoading, data } = useQuery({
    queryKey: ["gists-starred"],
    queryFn: () => client(`gists/starred`).then((data) => data),
    ...{ refetchOnMount: false },
  });

  return { data, isLoading };
};

const useStarResp = (id) => {
  const [star, setStar] = useState(false);

  const client = useClient();
  const { data, status } = useQuery({
    queryKey: [`star-response${id}`],
    queryFn: () => client(`gists/${id}/star`).then((statusStar) => statusStar),
    ...{ retry: false },
  });
  console.log(data);

  return { status, data, star };
};

const useMarkStar = (id) => {
  const [star, setStar] = useState(false);
  const { status } = useStarResp(id);
  console.log("Yaha status", status);
  const client = useClient();
  const { mutate: starGist } = useMutation(
    (id) => {
      if (!star) {
        return client(`gists/${id}/star`, {
          method: "PUT",
        });
      } else {
        return client(`gists/${id}/star`, {
          method: "DELETE",
        });
      }
    },
    {
      onSuccess: () => {
        if (!star || status === "success") {
          setStar(true);
        } else {
          setStar(false);
        }
      },
    }
  );
  return { starGist, star };
};

// const useUnMarkStar = () => {
//   const [unstar, setUnstar] = useState(true); // for fork & star
//   const client = useClient();
//   const { mutate: unStarGist } = useMutation(
//     (id) => {
//       return client(`gists/${id}/star`, {
//         method: "DELETE",
//       });
//     },
//     {
//       onSuccess: () => {
//         if (unstar) {
//           setUnstar(false);
//         }
//       },
//     }
//   );
//   return { unStarGist, unstar };
// };

const useMarkFork = () => {
  const [fork, setFork] = useState(false);
  const client = useClient();
  const { mutate: forkGist } = useMutation(
    (id) => {
      return client(`gists/${id}/forks`, {
        method: "POST",
      });
    },
    {
      onSuccess: () => {
        setFork(true);
        successCheckFork(201);
      },
      onError: () => {
        successCheckFork();
      },
    }
  );
  return {
    fork,
    forkGist,
  };
};

const useAddGist = () => {
  let navigate = useNavigate();
  const client = useClient();
  return useMutation(
    (data) => {
      return client(`gists`, {
        method: "POST",
        data: {
          description: data.description,
          public: data.public,
          files: {
            [data.filename]: {
              content: data.content,
            },
          },
        },
      });
    },
    {
      onSuccess: () => {
        successCheckAdd(201);
        navigate("/userprofile");
      },
      onError: () => {
        successCheck();
      },
    }
  );
};

const useUpdateGist = () => {
  const client = useClient();
  let navigate = useNavigate();
  return useMutation(
    (data) => {
      return client(`gists/${data.gistID}`, {
        method: "PATCH",
        data: {
          description: data.value.description,
          public: data.value.public,
          files: {
            [data.value.filename]: {
              content: data.value.content,
            },
          },
        },
      });
    },
    {
      onSuccess: () => {
        successCheck(200);
        navigate("/userprofile");
      },
      onError: () => {
        successCheck();
      },
    }
  );
};

const useEditRecord = (id) => {
  const client = useClient();
  const { data } = useQuery({
    queryKey: ["gists-record", id],
    queryFn: () => client(`gists/${id}`).then((data) => data),
    ...bookQueryConfig,
  });
  let gistContent;
  let filename;
  if (data?.files) {
    Object.values(data?.files).map((file) => {
      filename = file.filename;
      gistContent = file.content;
    });
    // myContentArray = content.split('\n');
  }
  return { data, gistContent, filename };
};

export const useDataOfUser = () => {
  const client = useClient();
  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["gist-user"],
    queryFn: () => client(`user`).then((data) => data),
    ...{
      staleTime: 1000 * 60 * 60,
    },
  });
  return { userInfo, isLoading };
};

export const useDeleteGist = () => {
  const queryClient = useQueryClient();
  const client = useClient();
  return useMutation(
    (id) => {
      return client(`gists/${id}`, {
        method: "DELETE",
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("gists");
      },
    }
  );
};

export {
  useGists,
  useGistStarred,
  useStarResp,
  useMarkStar,
  useMarkFork,
  useAddGist,
  useUpdateGist,
  useEditRecord,
};

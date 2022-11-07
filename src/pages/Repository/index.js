import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "./styles";

import api from "../../services/api";

export default function Repository() {
  const { repository } = useParams();
  const [repoData, setRepoData] = useState({});
  const [repoIssues, setRepoIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRepo() {
      const [repositoryData, repositoryIssues] = await Promise.all([
        api.get(`/repos/${repository}`),
        api.get(`/repos/${repository}/issues`, {
          params: {
            state: "open",
            per_page: 5,
          },
        }),
      ]);

      setRepoData(repositoryData.data);
      setRepoIssues(repositoryIssues.data);

      setIsLoading(false);
    }
    loadRepo();
  }, []);

  if (isLoading) return <h1>Loading...</h1>;

  return <Container>{repository}</Container>;
}

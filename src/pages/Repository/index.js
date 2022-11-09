import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Loading, Container, Owner, BackButton } from "./styles";

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

  if (isLoading)
    return (
      <Loading>
        <h1>Loading...</h1>
      </Loading>
    );

  return (
    <Container>
      <BackButton to="/">
        <FaArrowLeft color="#000" size={30} />
      </BackButton>

      <Owner>
        <img src={repoData.owner.avatar_url} alt={repoData.owner.login} />

        <h1>{repoData.name}</h1>
        <p>{repoData.description}</p>
      </Owner>
    </Container>
  );
}

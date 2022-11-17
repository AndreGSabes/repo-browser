import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import {
  Loading,
  Container,
  Owner,
  BackButton,
  Issues,
  Title,
  IssueTitle,
  IssueLabel,
  LabelText,
  PageActions,
} from "./styles";

import api from "../../services/api";

export default function Repository() {
  const { repository } = useParams();
  const [repoData, setRepoData] = useState({});
  const [repoIssues, setRepoIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [openIssues, setOpenIssues] = useState(0);
  const per_page = 5;
  const lastPage = openIssues / per_page;

  useEffect(() => {
    async function loadRepo() {
      const [repositoryData, repositoryIssues] = await Promise.all([
        api.get(`/repos/${repository}`),
        api.get(`/repos/${repository}/issues`, {
          params: {
            state: "open",
            per_page,
          },
        }),
      ]);

      setRepoData(repositoryData.data);
      setRepoIssues(repositoryIssues.data);
      setOpenIssues(repositoryData.data.open_issues);

      setIsLoading(false);
    }
    loadRepo();
  }, []);

  useEffect(() => {
    async function loadIssues() {
      const response = await api.get(`/repos/${repository}/issues`, {
        params: {
          state: "open",
          page,
          per_page,
        },
      });

      setRepoIssues(response.data);
    }

    loadIssues();
  }, [page]);

  function handlePage(action) {
    setPage(action === "previous" ? page - 1 : page + 1);
  }

  console.log(repoData);

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

      <Issues>
        <Title>Ongoing issues</Title>

        {repoIssues.map((issue) => (
          <li key={issue.id}>
            <div>
              <h4>
                #{issue.number} - {issue.title}
              </h4>

              {issue.labels.map((label, index) => (
                <IssueLabel key={index} color={label.color}>
                  <p>{label.name}</p>
                </IssueLabel>
              ))}
            </div>
            <a href={`https://github.com/${repository}/issues/${issue.number}`}>
              {`https://github.com/${repository}/issues/${issue.number}`}
            </a>
          </li>
        ))}
      </Issues>

      <PageActions>
        <button
          type="button"
          onClick={() => handlePage("previous")}
          disabled={page < 2}
        >
          Voltar
        </button>
        <button
          type="button"
          onClick={() => handlePage("next")}
          disabled={page + 1 > lastPage}
        >
          Proxima
        </button>
      </PageActions>
    </Container>
  );
}

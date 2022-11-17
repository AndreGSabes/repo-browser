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
} from "./styles";

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

      <Issues>
        <Title>Ongoing issues</Title>

        {repoIssues.map((issue) => (
          <li key={issue.id}>
            <div style={{ display: "flex", marginBottom: "16px" }}>
              <IssueTitle>
                #{issue.number} - {issue.title}
              </IssueTitle>

              {issue.labels.map((label, index) => (
                <IssueLabel key={index} color={label.color}>
                  <LabelText>{label.name}</LabelText>
                </IssueLabel>
              ))}
            </div>
            <a href={`https://github.com/${repository}/issues/${issue.number}`}>
              {`https://github.com/${repository}/issues/${issue.number}`}
            </a>
          </li>
        ))}
      </Issues>
    </Container>
  );
}

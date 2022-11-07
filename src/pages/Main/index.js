import React, { useCallback, useEffect, useState } from "react";
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from "react-icons/fa";
import { Container, Form, SubmitButton, List, DeleteButton } from "./styles";

import api from "../../services/api";
import { Link } from "react-router-dom";

export default function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const SubmitButtonIcon = isLoading ? FaSpinner : FaPlus;

  useEffect(() => {
    const repoStorage = window.localStorage.getItem("repos");

    if (repoStorage) {
      setRepositories(JSON.parse(repoStorage));
    }
  }, []);

  function handleInputChange(e) {
    setNewRepo(e.target.value);
    setAlert(null);
  }

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      async function submit() {
        setIsLoading(true);
        setAlert(false);

        try {
          if (newRepo === "") {
            throw new Error("Repository name is required");
          }

          const response = await api.get(`repos/${newRepo}`);

          const hasRepo = repositories.find((r) => r.name === newRepo);

          if (hasRepo) {
            throw new Error("Repository already exists: " + newRepo);
          }

          const data = {
            name: response.data.full_name,
          };

          setRepositories([...repositories, data]);
          window.localStorage.setItem(
            "repos",
            JSON.stringify([...repositories, data] || [])
          );
          setNewRepo("");
        } catch (error) {
          setAlert(true);
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }

      submit();
    },
    [newRepo, repositories]
  );

  const handleDelete = useCallback(
    (repo) => {
      const filterRepoList = repositories.filter((r) => r.name !== repo);

      setRepositories(filterRepoList);
      window.localStorage.setItem(
        "repos",
        JSON.stringify(filterRepoList || [])
      );
    },
    [repositories]
  );

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositorios
      </h1>

      <Form onSubmit={handleSubmit} error={alert}>
        <input
          type="text"
          placeholder="Adicionar repositorios"
          value={newRepo}
          onChange={handleInputChange}
        />

        <SubmitButton loading={isLoading ? 1 : 0}>
          <SubmitButtonIcon color="#fff" size={14} />
        </SubmitButton>
      </Form>

      <List>
        {repositories.map((repo) => (
          <li key={repo.name}>
            <span>
              <DeleteButton onClick={() => handleDelete(repo.name)}>
                <FaTrash size={14} />
              </DeleteButton>
              {repo.name}
            </span>
            <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
              <FaBars size={20} />
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}

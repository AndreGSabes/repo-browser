import React, { useCallback, useState } from "react";
import { FaGithub, FaPlus, FaSpinner } from "react-icons/fa";
import { Container, Form, SubmitButton } from "./styles";

import api from "../../services/api";

export default function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const SubmitButtonIcon = isLoading ? FaSpinner : FaPlus;

  function handleInputChange(e) {
    setNewRepo(e.target.value);
  }

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      async function submit() {
        setIsLoading(true);

        try {
          const response = await api.get(`repos/${newRepo}`);
          const data = {
            name: response.data.full_name,
          };

          setRepositories([...repositories, data]);
          setNewRepo("");
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }

      submit();
    },
    [newRepo, repositories]
  );

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositorios
      </h1>

      <Form onSubmit={handleSubmit}>
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
    </Container>
  );
}

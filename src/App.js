import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRespositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRespositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    
    const response = await api.post('repositories', {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });

    const repository = response.data;

    setRespositories([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {
    
    await api.delete(`repositories/${id}`);

    const filteredRepositories = repositories.filter((repository) => {return repository.id !== id});

    setRespositories(filteredRepositories);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

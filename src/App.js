import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo repositório ${Date.now()}`,
      url: "https://github.com/morikawa77",
      techs: [
        "PHP",
        "html",
        "javascript"
      ],
      likes: 0
    })

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            <a target="_blank" rel="noopener noreferrer" href={repository.url}>{repository.title}</a><br />
            Techs: {repository.techs.join(", ")}<br />
            Likes: {repository.likes}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        )
        )}
      </ul>

      <button width={350} onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

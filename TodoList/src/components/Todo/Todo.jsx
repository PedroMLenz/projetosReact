import { useEffect, useState } from "react";
import "./todo.css";

const Todo = ({ index, todo, deleteTodo, editTodo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEtapa, setNewEtapa] = useState("");
  const [etapas, setEtapas] = useState([]);

  // Carregar etapas do localStorage quando o componente monta
  useEffect(() => {
    const savedEtapas = localStorage.getItem(`etapas_${todo.title}`);
    if (savedEtapas) {
      console.log(`Etapas carregadas do localStorage para ${todo.title}:`, savedEtapas);
      setEtapas(JSON.parse(savedEtapas));
    } else {
      console.log(`Nenhuma etapa encontrada no localStorage para ${todo.title}`);
    }
  }, [todo.title]);

  // Salvar etapas no localStorage quando o estado etapas mudar
  useEffect(() => {
    if (etapas.length > 0) {
      localStorage.setItem(`etapas_${todo.title}`, JSON.stringify(etapas));
      console.log(`Etapas salvas no localStorage para ${todo.title}:`, etapas);
    }
  }, [etapas, todo.title]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddEtapa = () => {
    if (newEtapa.trim() !== "") {
      const updatedEtapas = [...etapas, newEtapa];
      setEtapas(updatedEtapas);
      setNewEtapa("");
      closeModal();
    }
  };

  const handleDeleteEtapa = (index) => {
    const updatedEtapas = etapas.filter((_, i) => i !== index);
    setEtapas(updatedEtapas);
  };

  return (
    <div className="todo_item">
      <div>
        <h3>
          &nbsp;&nbsp;&nbsp;{index + 1}º
          &nbsp;&nbsp;&nbsp;{todo.title}
        </h3>
      </div>
      <details>
        <summary>Descrição</summary>
        {todo.text}
        <details>
          <summary>Etapas</summary>
          <ol>
            {etapas.map((etapa, i) => (
              <li key={i}>
                {etapa}
                <button
                  onClick={() => handleDeleteEtapa(i)}
                  className="delete-etapa"
                >
                  &#x274C;
                </button>
              </li>
            ))}
          </ol>
        </details>
      </details>
      <div>
        <button onClick={() => deleteTodo(todo)}>&#x274C;</button>
        <button className="todo_edit" onClick={() => editTodo(todo)}>
          &#x1F4DD;
        </button>
        <button onClick={openModal}>Adicionar etapa</button>
      </div>

      {/* Modal para adicionar nova etapa */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Adicionar Etapa</h2>
            <input
              type="text"
              value={newEtapa}
              onChange={(e) => setNewEtapa(e.target.value)}
              placeholder="Digite a nova etapa"
            />
            <button onClick={handleAddEtapa}>Adicionar</button>
            <button onClick={closeModal}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;

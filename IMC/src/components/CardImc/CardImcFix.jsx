import { useState } from 'react';
import './style.css';

export default function CardImc({ pessoa }) {
  const [peso, setPeso] = useState(pessoa.peso);
  const alt = pessoa.altura;
  const [imc, setImc] = useState(peso / alt ** 2);

  const incrementaPeso = () => {
    setPeso((peso) => {
      let novo_peso = peso + 1;
      setImc(novo_peso / alt ** 2);
      return novo_peso;
    });
  };

  const decrementaPeso = () => {
    setPeso((peso) => {
      let novo_peso = peso - 1;
      setImc(novo_peso / alt ** 2);
      return novo_peso;
    });
  };

  return (
    <div
      className={`imcCard ${
        imc < 24.5 ? 'verde' : imc >= 24.5 && imc < 30 ? 'amarelo' : 'vermelho'
      }`}
    >
      <h1>{pessoa.name}:</h1>
      <p>Altura: {alt} m</p>
      <p>
        Peso: {peso}
        <button className="botao" onClick={incrementaPeso}>
          &nbsp;+&nbsp;
        </button>
        <button className="botao" onClick={decrementaPeso}>
          &nbsp;-&nbsp;
        </button>
      </p>
      <p>Imc: {imc.toFixed(2)}</p>
    </div>
  );
}

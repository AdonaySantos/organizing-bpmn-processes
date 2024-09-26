export default function ProcessCard({ processo, handleClick }) {
  return (
    <div
      className="repository-processo-card"
      onClick={() => handleClick(processo)}
    >
      <h2>{processo.nome}</h2>
      {processo.imagem && (
        <img
          src={`https://backend-southstar.onrender.com/processos/${processo.imagem}`}
          alt={processo.nome}
          style={{ width: "100%", height: "auto", borderRadius: "8px" }}
        />
      )}
      <p><strong>Número:</strong> {processo.numero}</p>
      <p><strong>Descrição:</strong> {processo.descricao}</p>
      <p><strong>Data:</strong> {processo.data}</p>
    </div>
  );
}

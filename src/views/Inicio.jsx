export default function Inicio({ Card }) {
  return (
    <Card>
      <h2>Inicio</h2>

      <p style={{ fontSize: "1.4rem", fontWeight: "bold", marginBottom: "8px" }}>
        Bienvenido a nuestro sistema de citas
      </p>

      <p style={{ fontSize: "0.95rem", color: "#555", lineHeight: "1.5" }}>
        El SGCM (Sistema de Gestión de Citas Médicas) es una plataforma diseñada
        para facilitar la programación, consulta y administración de citas entre
        pacientes y personal médico.
      </p>
    </Card>
  );
}
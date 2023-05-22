const TEST_INTERFACE = ({ context }) => {
  const muestra = {
    clave1: "valor1",
    clave2: "valor2",
    clave3: [
      {
        claveAnidada1: "valorAnidado1",
        claveAnidada2: "valorAnidado2",
      },
      {
        claveAnidada3: "valorAnidado3",
        claveAnidada4: "valorAnidado4",
      },
    ],
  };

  return (
    <div
      style={{
        width: "100%",
        height: "600px",
        position: "fixed",
        top: "0",
        left: "0",
        background: "#e1afaf",
        zIndex: "1000",
      }}
    >
      <div style={{ width: "100%", padding: "32px", marginBottom: "64px" }}>
        <h1 style={{ width: "100%", marginBottom: "32px" }}>
          Para manejo de ps_data
        </h1>

        <button
          onClick={() => {
            console.log("Contexto actual:", context);
            console.log(
              "Local Storage ps_data_id actual (comp):",
              localStorage.getItem("ps_data_id")
            );
            console.log(
              "Local Storage ps_data actual (comp):",
              localStorage.getItem("ps_data")
            );
          }}
        >
          Visualizar LS y context
        </button>
      </div>
    </div>
  );
};

export default TEST_INTERFACE;

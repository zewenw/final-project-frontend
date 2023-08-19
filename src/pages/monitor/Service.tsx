import React from "react";

function Service() {
  const eureka = import.meta.env.VITE_EUREKA_SERVICE_URL;
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <iframe src={eureka} width="100%" height="100%" frameBorder="0"></iframe>
    </div>
  );
}

export default Service;

import React from "react";

function Tracing() {
  
  const tracingUrl = import.meta.env.VITE_ZIPKIN_URL;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* alert({tracingUrl}) */}
      <iframe
        src={tracingUrl}
        width="100%"
        height="100%"
        frameBorder="0"
      ></iframe>
    </div>
  );
}

export default Tracing;

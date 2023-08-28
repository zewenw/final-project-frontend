import React from 'react'

function Log() {

  const logUrl = import.meta.env.VITE_LOGSTASH_URL;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* alert({tracingUrl}) */}
      <iframe
        src={logUrl}
        width="100%"
        height="100%"
        frameBorder="0"
      ></iframe>
    </div>
  )
}

export default Log

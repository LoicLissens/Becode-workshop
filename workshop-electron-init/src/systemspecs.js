import React, { useEffect, useState } from "react";

const channels = ["type", "arch", "platform", "freemem", "totalmem", "hostname"];

const convertToMb = (number) => {
  if (Number.isInteger(number)) {
    const mb = number / 1048576; // one megabyte = 1.048.576 bytes
    const rounded = mb.toFixed(1);
    return `${rounded} mb`;
  } else {
    return "";
  }
};

const SystemSpecs = () => {
  const [specs, setSpecs] = useState({});
  const [, refresh] = useState(0);

  const receiveSpecs = (elements) => {
    let object = {};
    elements.forEach((element) => {
      // utilisé pour récupérer les données envoyées par Electron. Prend comme paramètre une string et un callback.
      window.ipcRenderer.on(element, (event, message) => {
        object[element] = message;
      });
    });
    setSpecs(object);
    console.log(object);
  };

  const handleRefresh = () => {
    refresh();
    console.log(specs);
  };

  useEffect(() => {
    receiveSpecs(channels);
  }, []);

  return (
    <div>
      <ul>
        <li>OS: {specs.type}</li>
        <li>Architecture: {specs.arch}</li>
        <li>Platforme: {specs.platform}</li>
        <li>Nom du PC: {specs.hostname}</li>
        <li>Mémoire totale: {convertToMb(specs.totalmem)} bytes</li>
        <li>Mémoire restante: {convertToMb(specs.freemem)} bytes</li>
      </ul>
      <div>
        <button onClick={handleRefresh}>refresh</button>
      </div>
    </div>
  );
};
export default SystemSpecs;

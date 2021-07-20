type Log = {
  timestamp: Date;
  description: string;
  moduleName: string;
};

export function mockLogs(): Log[] {
  return [
    {
      timestamp: new Date(Date.now()),
      description: "Los parámetros han sido enviados y guardados",
      moduleName: "Región sureste",
    },
    {
      timestamp: new Date(Date.now()),
      description: "Los parámetros han sido enviados y guardados",
      moduleName: "Región sureste",
    },
  ];
}

export default Log;

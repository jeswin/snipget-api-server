import psychopiggy from "psychopiggy";

export interface IPGConfig {
  database: string;
  host: string;
  password: string;
  port: string;
  user: string;
}

let configSettings: IPGConfig;

export async function init(config: IPGConfig) {
  if (!configSettings) {
    psychopiggy.createPool(config);
    configSettings = config;
  }
}

export function getConfig() {
  return configSettings;
}

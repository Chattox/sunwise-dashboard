export {};

declare global {
  type Reading = {
    station_name: string;
    timestamp: string;
    data: {
      [key: string]: number;
      temperature: number;
      humidity: number;
      pressure: number;
      luminance: number;
      wind_speed: number;
      gust_speed: number;
      wind_direction: number;
      rain: number;
    };
  };

  type FormattedReading = {
    stationName: string;
    timestamp: string;
    data: {
      [key: string]: number;
      temperature: number;
      humidity: number;
      pressure: number;
      luminance: number;
      windSpeed: number;
      gustSpeed: number;
      windDirection: number;
      rain: number;
    };
  };

  type DataLabels = {
    [key: string]: { label: string; unit: string };
  };
}

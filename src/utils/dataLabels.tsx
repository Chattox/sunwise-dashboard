import { ComponentType } from "react";
import { PiWind } from "react-icons/pi";
import {
  WiBarometer,
  WiDaySunny,
  WiHumidity,
  WiShowers,
  WiStrongWind,
  WiThermometer,
  WiWindDeg,
} from "react-icons/wi";

const iconFn =
  (Icon: ComponentType<{ size?: string | number; color?: string }>) =>
  (size?: string | number, color?: string) =>
    <Icon size={size} color={color} />;

export const dataLabels: DataLabels = {
  temperature: {
    label: "Temperature",
    unit: "°C",
    color: "green.8",
    icon: iconFn(WiThermometer),
  },
  humidity: {
    label: "Humidity",
    unit: "%",
    color: "indigo.8",
    icon: iconFn(WiHumidity),
  },
  pressure: {
    label: "Pressure",
    unit: "hPa",
    color: "teal.8",
    icon: iconFn(WiBarometer),
  },
  luminance: {
    label: "Luminance",
    unit: "lx",
    color: "yellow.8",
    icon: iconFn(WiDaySunny),
  },
  windSpeed: {
    label: "Wind speed",
    unit: "m/s",
    color: "cyan.8",
    icon: iconFn(WiStrongWind),
  },
  gustSpeed: {
    label: "Gust speed",
    unit: "m/s",
    color: "cyan.8",
    icon: iconFn(PiWind),
  },
  windDirection: {
    label: "Wind direction",
    unit: "⁰",
    color: "cyan.8",
    icon: iconFn(WiWindDeg),
  },
  rain: {
    label: "Rainfall",
    unit: "mm",
    color: "blue.8",
    icon: iconFn(WiShowers),
  },
  cumulativeRain: { label: "Cumulative rainfall", unit: "mm", color: "blue.8" },
};

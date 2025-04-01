import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

export const ColorSchemeSwitcher = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme();

  return (
    <ActionIcon
      onClick={() => {
        setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
      }}
      size="lg"
      variant="default"
    >
      {computedColorScheme === "dark" ? (
        <IoMoonOutline size={21} />
      ) : (
        <IoSunnyOutline size={24} />
      )}
    </ActionIcon>
  );
};

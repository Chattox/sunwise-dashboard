import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IoMoon, IoSunny } from "react-icons/io5";

export const ColorSchemeSwitcher = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme();

  return (
    <ActionIcon
      onClick={() => {
        setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
      }}
      variant="filled"
    >
      {computedColorScheme === "dark" ? <IoMoon /> : <IoSunny />}
    </ActionIcon>
  );
};

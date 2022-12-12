import { Stack, Typography, useTheme } from "@mui/material";
import { ComponentProps, ReactNode } from "react";

interface Props extends ComponentProps<typeof Stack> {
  label: ReactNode;
  value: ReactNode;
}

export function Property({ label, value, direction = "row", ...rest }: Props) {
  const theme = useTheme();

  return (
    <Stack direction={direction} gap={1} alignItems="center" {...rest}>
      <Typography
        variant="body1"
        color={theme.palette.text.primary}
        fontWeight="bold"
      >
        {label}
      </Typography>

      <Typography variant="body2" color={theme.palette.text.secondary}>
        {value}
      </Typography>
    </Stack>
  );
}

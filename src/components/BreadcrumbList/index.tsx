import { Breadcrumbs, Typography } from "@mui/material";
import { Link, useMatches } from "react-router-dom";

export function BreadcrumbList() {
  const matches = useMatches();
  const matchesWithHandle = matches.filter((match) => match.handle);
  const lastHandle = matchesWithHandle.at(-1)?.handle as string;

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{
        py: (theme) => theme.spacing(2),
      }}
    >
      {matchesWithHandle.map((item) => (
        <Typography
          variant="h5"
          component={Link}
          key={item.id}
          to={item.pathname}
          sx={{
            fontWeight: item.handle === lastHandle ? 700 : "inherit",
            textDecoration: "none",
            color: "inherit",
            ":hover": {
              textDecoration: "underline",
            },
          }}
        >
          {item.handle as string}
        </Typography>
      ))}
    </Breadcrumbs>
  );
}

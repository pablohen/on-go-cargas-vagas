import { Add } from "@mui/icons-material";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { GridFilterModel } from "@mui/x-data-grid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TerminalTable } from "../../components/TerminalTable";
import { initialState, PaginationOptions, useOnGo } from "../../hooks/useOnGo";

export function TerminalList() {
  const { getTerminals } = useOnGo();
  const [options, setOptions] = useState<PaginationOptions>(initialState);
  const terminalsQuery = getTerminals(options);

  const navigate = useNavigate();

  function handleOnPageChange(pageIndex: number) {
    setOptions({ ...options, pageIndex: pageIndex + 1 });
  }

  function handleFilterChange(filterModel: GridFilterModel) {
    if (!filterModel.quickFilterValues?.length) {
      return setOptions({ ...options, pesquisa: "" });
    }

    const pesquisa = filterModel.quickFilterValues.join("");
    setOptions({ ...options, pesquisa });
  }

  return (
    <Container>
      <Box pt="2rem" pb="1rem">
        <Stack gap="1rem">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">Terminais</Typography>

            <Button onClick={() => navigate("./new")}>
              <Add /> Novo terminal
            </Button>
          </Box>

          <TerminalTable
            data={terminalsQuery.data}
            handleOnPageChange={handleOnPageChange}
            handleFilterChange={handleFilterChange}
          />
        </Stack>
      </Box>
    </Container>
  );
}

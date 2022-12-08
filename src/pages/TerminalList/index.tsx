import { Add } from "@mui/icons-material";
import { Box, Button, Card, Container, Stack } from "@mui/material";
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

  function handleOnPageChange(page: number) {
    setOptions({ ...options, pageIndex: page });
  }

  function handleFilterChange(filterModel: GridFilterModel) {
    if (!filterModel.quickFilterValues?.length) {
      return setOptions({ ...options, pesquisa: "" });
    }

    const pesquisa = filterModel.quickFilterValues.join("");
    setOptions({ ...options, pesquisa });
  }

  return (
    <Container sx={{ pb: "1rem" }}>
      <Card sx={{ p: "1rem" }}>
        <Stack gap="1rem">
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={() => navigate("./new")}
              startIcon={<Add />}
            >
              Novo terminal
            </Button>
          </Box>

          <TerminalTable
            data={terminalsQuery.data}
            handleOnPageChange={handleOnPageChange}
            handleFilterChange={handleFilterChange}
          />
        </Stack>
      </Card>
    </Container>
  );
}

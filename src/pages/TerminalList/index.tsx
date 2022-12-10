import { Add } from "@mui/icons-material";
import { Box, Button, Card, Container, Stack } from "@mui/material";
import { GridFilterModel } from "@mui/x-data-grid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TerminalTable } from "../../components/TerminalTable";
import {
  initialOptions,
  PaginationOptions,
  useOnGo,
} from "../../hooks/useOnGo";

export function TerminalList() {
  const { getTerminals } = useOnGo();
  const [options, setOptions] = useState<PaginationOptions>(initialOptions);
  const terminalsQuery = getTerminals(options);

  const navigate = useNavigate();

  function handleOnPageChange(page: number) {
    setOptions({ ...options, pageIndex: page });
  }

  function handleOnPageSizeChange(pageSize: number) {
    setOptions({ ...options, pageSize });
  }

  function handleFilterChange(filterModel: GridFilterModel) {
    if (!filterModel.quickFilterValues?.length) {
      return setOptions({ ...options, pesquisa: "" });
    }

    const pesquisa = filterModel.quickFilterValues.join("");
    setOptions({ ...options, pesquisa });
  }

  return (
    <Container sx={{ pb: (theme) => theme.spacing(2) }}>
      <Card sx={{ p: (theme) => theme.spacing(2) }}>
        <Stack gap={2}>
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
            rowsPerPage={options.rowsPerPage}
            handleOnPageChange={handleOnPageChange}
            handleOnPageSizeChange={handleOnPageSizeChange}
            handleFilterChange={handleFilterChange}
          />
        </Stack>
      </Card>
    </Container>
  );
}

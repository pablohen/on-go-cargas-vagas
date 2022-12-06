import { Edit as EditIcon } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRenderCellParams,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Result } from "../../types/Terminals";

interface Props {
  data?: Result;
  handleOnPageChange: (page: number) => void;
  handleFilterChange: (filterModel: GridFilterModel) => void;
}

export function TerminalTable({
  data,
  handleOnPageChange,
  handleFilterChange,
}: Props) {
  const navigate = useNavigate();
  const [result, setResult] = useState<Result>();

  const terminals = result?.data.data;

  const rows: GridRowsProp = terminals
    ? terminals.map((terminal) => ({
        id: terminal.id,
        name: terminal.nome,
        address: `${terminal.endereco.logradouro}, ${terminal.endereco.numero} - ${terminal.endereco.cidade}/${terminal.endereco.nomeEstado}`,
        actions: terminal.id,
      }))
    : [];

  const renderActionsCell = (rowData: GridRenderCellParams) => {
    return (
      <Tooltip title="Editar">
        <IconButton
          onClick={() => navigate(`./edit/${rowData.id}`)}
          aria-label="edit"
          data-testid="edit-button"
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
    );
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Nome", flex: 1 },
    { field: "address", headerName: "Endereço", flex: 1 },
    { field: "actions", headerName: "Ações", renderCell: renderActionsCell },
  ];

  useEffect(() => {
    if (data) {
      setResult(data);
    }
  }, [data]);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      rowCount={result?.data.totalResult}
      pageSize={result?.data.pageSize}
      autoHeight
      filterMode="server"
      paginationMode="server"
      loading={!result}
      disableColumnFilter
      disableDensitySelector
      disableSelectionOnClick
      components={{ Toolbar: GridToolbar }}
      componentsProps={{
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 },
        },
      }}
      onPageChange={handleOnPageChange}
      onFilterModelChange={handleFilterChange}
      checkboxSelection={false}
      sx={{ border: 0 }}
    />
  );
}

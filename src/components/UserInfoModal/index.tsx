import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useTheme,
} from "@mui/material";
import { useOnGo } from "../../hooks/useOnGo";
import { Property } from "../Property";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function UserInfoModal({ open, onClose }: Props) {
  const { decodedToken } = useOnGo();
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="modal-user-info"
      aria-describedby="modal-show-basic-user-info"
    >
      <DialogTitle>Minha conta</DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: "flex",
            gap: (theme) => theme.spacing(2),
            flexDirection: "column",
            alignItems: "center",
            [theme.breakpoints.up("sm")]: {
              flexDirection: "row",
              alignItems: "flex-start",
            },
          }}
        >
          <Avatar sx={{ height: "96px", width: "96px" }}>
            {decodedToken?.client_id.at(0)?.toUpperCase()}
          </Avatar>

          <Box>
            <Property label="Nome:" value={decodedToken?.client_id} />
            <Property
              label="ID_Empresa:"
              value={decodedToken?.identificador_empresa}
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
}

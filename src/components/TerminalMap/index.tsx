import { useTheme } from "@mui/system";
import {
  GoogleMap,
  MarkerF,
  MarkerProps,
  useJsApiLoader,
} from "@react-google-maps/api";

type Coord = MarkerProps["position"];

interface Props {
  center: Coord;
  title: string;
}

export function TerminalMap({ center, title }: Props) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
  });

  const theme = useTheme();

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            borderRadius: theme.shape.borderRadius,
            display: "flex",
            flexGrow: 1,
            minHeight: "20rem",
          }}
          zoom={14}
          center={center}
        >
          <MarkerF position={center} title={title} />
        </GoogleMap>
      )}
    </>
  );
}

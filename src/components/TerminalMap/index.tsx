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

export default function TerminalMap({ center, title }: Props) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
  });

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            borderRadius: "8px",
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

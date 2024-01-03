import {
  Autocomplete,
  GoogleMap,
  MarkerF,
  useJsApiLoader,
  LoadScriptProps,
} from "@react-google-maps/api";
import { useEffect, useState, useRef } from "react";

interface Marker {
  lat: number | undefined;
  lng: number | undefined;
}

const googleMapsLibraries: LoadScriptProps['libraries'] = ["places"];

export default function MapComponent({
  setLat,
  setLong,
  setName,
}: {
  setLat: (lat: number | null) => void;
  setLong: (long: number | null) => void;
  setName: (name: string | null) => void;
}) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!,
    libraries: googleMapsLibraries
  });
  const [searchResult, setSearchResult] =
    useState<google.maps.places.Autocomplete>();
  const [marker, setMarker] = useState<Marker | null>(null);
  const harvard_coords = { lat: 42.374443, lng: -71.116943 };
  const [center, setCenter] = useState(harvard_coords);
  const [addressBar, setAddressBar] = useState("");

  function onLoad(autocomplete: google.maps.places.Autocomplete) {
    setSearchResult(autocomplete);
  }

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCenter(userLocation);
      });
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  function onPlaceChanged() {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      if (place?.geometry?.location) {
        setCenter({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
        setMarker({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
        setLat(place.geometry.location.lat());
        setLong(place.geometry.location.lng());
        if (place.name) setName(place.name);
        if (place.name) setAddressBar(place.name);
      }
    }
  }

  function isIconMouseEvent(
    e: google.maps.MapMouseEvent | google.maps.IconMouseEvent
  ): e is google.maps.IconMouseEvent {
    return "placeId" in e;
  }

  function handleClick(event: google.maps.MapMouseEvent) {
    if (isIconMouseEvent(event)) {
      const placeId = event.placeId;
      if (!placeId) return;
      const placeService = new google.maps.places.PlacesService(new window.google.maps.Map(document.createElement("div")));
      placeService.getDetails(
        {
          placeId,
          fields: ["geometry", "name"],
        },
        (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            if (!place?.geometry?.location) return;
            setLat(place.geometry.location.lat());
            setLong(place.geometry.location.lng());
            if (place.name) setName(place.name);
            if (place.name) setAddressBar(place.name);
          }
        }
      );
    }
  }

  if (isLoaded) {
    return (
      <>
        <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
          <input
            type="text"
            placeholder="Enter Address Here"
            className="input input-bordered w-full"
            value={addressBar}
            onChange={(e) => setAddressBar(e.target.value)}
          />
        </Autocomplete>
        <div className="z-10 mt-5 h-[20rem] w-full">
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{
              width: "100%",
              height: "100%",
              borderRadius: "1rem",
            }}
            options={{
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onClick={handleClick}
          >
            {marker && (
              <MarkerF
                title="Destination"
                position={{
                  lat: marker.lat!,
                  lng: marker.lng!,
                }}
              />
            )}
          </GoogleMap>
        </div>
      </>
    );
  } else {
    return <h1 className="text-md text-center font-bold">Loading...</h1>;
  }
}

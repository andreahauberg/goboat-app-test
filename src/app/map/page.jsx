"use client";
import './styles.css';
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { supabase } from "../lib/supabaseClient";
import mapboxgl from "mapbox-gl";
import RouteSelection from "../../app/components/map/RouteSelection"; 
import GeoLocate from "../../app/components/map/GeoLocate";
import ToggleMap from "../../app/components/map/ToggleMap";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;


export default function MapPage() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const geolocateControlRef = useRef(null);
  const [route, setRoute] = useState(null);
  const [showRouteSelect, setShowRouteSelect] = useState(false);
  const [showSatellite, setShowSatellite] = useState(false);
  const [availableRoutes, setAvailableRoutes] = useState([]);
  const [selectedRouteId, setSelectedRouteId] = useState("");
  const [isSatellite, setIsSatellite] = useState(false);

  useEffect(() => {
    const fetchAvailableRoutes = async () => {
      const { data, error } = await supabase
        .from("routes")
        .select("id, name, coordinates");

      if (error) {
        console.error("Error fetching routes:", error);
      } else if (data && data.length > 0) {
        setAvailableRoutes(data);
      }
    };

    fetchAvailableRoutes();
  }, []);

  useEffect(() => {
    const fetchRoute = async () => {
      if (!selectedRouteId) return;

      const { data: routeData, error: routeError } = await supabase
        .from("routes")
        .select("*")
        .eq("id", selectedRouteId)
        .single();

      if (routeError) {
        console.error("Error fetching route:", routeError);
      } else if (routeData) {
        setRoute(routeData.coordinates);

        if (map.current && routeData.coordinates) {
          if (map.current.getSource("route")) {
            map.current.removeLayer("route");
            map.current.removeSource("route");
          }

          map.current.addSource("route", {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: routeData.coordinates,
              },
            },
          });

          map.current.addLayer({
            id: "route",
            type: "line",
            source: "route",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#3b84f0",
              "line-width": 5,
            },
          });

          if (routeData.coordinates.length > 1) {
            const bounds = routeData.coordinates.reduce(
              (bounds, coord) => bounds.extend(coord),
              new mapboxgl.LngLatBounds(routeData.coordinates[0], routeData.coordinates[0])
            );

            map.current.fitBounds(bounds, {
              padding: 50,
            });
          }
        }
      }
    };

    fetchRoute();
  }, [selectedRouteId]);

  useEffect(() => {
    if (typeof window !== "undefined" && !map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [12.57856, 55.66952],
        zoom: 13,
      });

      map.current.on("load", () => {
        console.log("Map loaded successfully");

        geolocateControlRef.current = new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
        });

        map.current.addControl(geolocateControlRef.current, "bottom-right");

        const mapboxGeoLocate = document.querySelector('.mapboxgl-ctrl-geolocate');
        if (mapboxGeoLocate) {
          mapboxGeoLocate.style.display = 'none';
        }
      });
    }
  }, []);

  const toggleMapStyle = useCallback(() => {
    if (map.current) {
      const newStyle = showSatellite
        ? "mapbox://styles/mapbox/streets-v11"
        : "mapbox://styles/mapbox/satellite-streets-v11";
      map.current.setStyle(newStyle);
      setShowSatellite(!showSatellite);
      setIsSatellite(!isSatellite);
    }
  }, [showSatellite, isSatellite]);

  const getRouteName = useCallback(
    (routeId) => {
      const route = availableRoutes.find((route) => route.id === routeId);
      return route ? route.name : "";
    },
    [availableRoutes]
  );

  const selectedRouteName = useMemo(() => getRouteName(selectedRouteId), [selectedRouteId, getRouteName]);

  const handleRouteSelect = useCallback((routeId) => {
    setSelectedRouteId(routeId);
    setShowRouteSelect(false);
  }, []);

  const handleGeolocateClick = useCallback(() => {
    if (geolocateControlRef.current) {
      geolocateControlRef.current.trigger();
    }
  }, []);

  return (
    <div className="relative">
      <div ref={mapContainer} style={{ height: "80vh", width: "100%" }} />
      <div className="absolute top-2 right-4 z-30 flex flex-col items-center space-y-2">
        <button
          onClick={() => setShowRouteSelect(!showRouteSelect)}
          className="bg-white p-3 rounded-full shadow-md flex items-center space-x-2"
          style={{ visibility: showRouteSelect ? "hidden" : "visible" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 22" width="18">
            <g fill="currentColor" fillOpacity=".85" fillRule="nonzero">
              <path d="M11.0059 3.14453c0 .27004.0341.53231.102.78125H5.14648c-2.19726 0-3.57421 1.03516-3.57421 2.66602 0 1.66015 1.47461 2.7832 4.41406 3.08593l5.56637.58597c3.7891.3808 5.752 2.1191 5.752 4.7754 0 2.5976-1.9922 4.2382-5.1465 4.2382H6.19241c.07069-.2548.10642-.5237.10642-.8007 0-.2664-.03341-.5254-.09989-.7715h5.95926c2.1973 0 3.5742-1.0352 3.5742-2.666 0-1.6602-1.4844-2.7832-4.414-3.086l-5.58598-.5859C1.95312 10.9863 0 9.24805 0 6.5918c0-2.59766 1.99219-4.23828 5.14648-4.23828h5.96492c-.0701.25199-.1055.51759-.1055.79101Z"></path>
              <path d="M3.1543 21.6309c1.73828 0 3.14453-1.4161 3.14453-3.1543 0-1.7286-1.40625-3.1446-3.14453-3.1446S.00976562 16.748.00976562 18.4766c0 1.7382 1.40625438 3.1543 3.14453438 3.1543ZM14.1504 6.29883c1.748 0 3.1543-1.41602 3.1543-3.1543C17.3047 1.41602 15.8984 0 14.1504 0c-1.7285 0-3.1445 1.41602-3.1445 3.14453 0 1.73828 1.416 3.1543 3.1445 3.1543Zm0-1.53321c-.8984 0-1.6113-.71289-1.6113-1.62109 0-.9082.7226-1.61133 1.6113-1.61133.918 0 1.6211.70313 1.6211 1.61133 0 .9082-.7031 1.62109-1.6211 1.62109Z"></path>
            </g>
          </svg>
          {selectedRouteId && <span>{selectedRouteName}</span>}
        </button>

  
        <GeoLocate handleGeolocateClick={handleGeolocateClick} />
   
        <ToggleMap toggleMapStyle={toggleMapStyle} isSatellite={isSatellite} />

        {showRouteSelect && (
          <RouteSelection
            availableRoutes={availableRoutes}
            selectedRouteId={selectedRouteId}
            handleRouteSelect={handleRouteSelect}
            getRouteName={getRouteName}
          />
        )}
      </div>
    </div>
  );
}

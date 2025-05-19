import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import { LatLngExpression, Icon } from 'leaflet'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import L from 'leaflet'

const motoIcon = new Icon({
  iconUrl: '/moto.png',
  iconSize: [35, 35],
  iconAnchor: [17, 35],
})

const RealTimeMarker = ({ licensePlate }: { licensePlate: string }) => {
  const [position, setPosition] = useState<LatLngExpression>([5.0553, -75.4906])
  const markerRef = useRef<L.Marker | null>(null)
  const map = useMap()

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:5000/motorcycles/track/${licensePlate}`)
        const { lat, lng } = res.data
        const newPos: LatLngExpression = [lat, lng]
        setPosition(newPos)

        if (markerRef.current) {
          markerRef.current.setLatLng(newPos)
          map.panTo(newPos)
        }
      } catch (error) {
        console.error('Error al obtener la ubicación:', error)
      }
    }

    fetchLocation()
    const interval = setInterval(fetchLocation, 3000)
    return () => clearInterval(interval)
  }, [licensePlate, map])

  return (
    <Marker
      position={position}
      icon={motoIcon}
      ref={(ref) => {
        markerRef.current = ref as L.Marker
      }}
    />
  )
}

const MapRouteWithMoto = () => {
  const licensePlate = 'ABC124' // o puedes pasarlo como prop

  return (
    <MapContainer
      center={[5.0553, -75.4906]}
      zoom={15}
      scrollWheelZoom={true}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <RealTimeMarker licensePlate={licensePlate} />
    </MapContainer>
  )
}

export default MapRouteWithMoto

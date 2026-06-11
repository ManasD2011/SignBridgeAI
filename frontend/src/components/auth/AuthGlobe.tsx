import Globe from "react-globe.gl";

export default function AuthGlobe() {
  return (
    <div
      className="
        absolute
        inset-0
        opacity-50
        pointer-events-none
      "
    >
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundColor="rgba(0,0,0,0)"
      />
    </div>
  );
}

import React, { useRef, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Globe from "react-globe.gl";
import { useNavigate } from "react-router-dom";
import "../assets/css/CatPlanet.css";

const catOrigins = [
  {
    name: "Egyptian Mau",
    country: "Egypt",
    lat: 26.8,
    lng: 30.8,
    image: "https://t4.ftcdn.net/jpg/05/00/68/93/360_F_500689305_k1i18Xaz0cd4dbxPKQAZq4cXFL9AYKvL.jpg",
    desc: "An ancient, agile breed from Egypt — graceful and fast like the desert wind.",
  },
  {
    name: "Siamese",
    country: "Thailand",
    lat: 15.8,
    lng: 101.0,
    image: "https://images2.alphacoders.com/103/1036507.jpg",
    desc: "Elegant and vocal, the Siamese is a true royal from Thailand.",
  },
  {
    name: "Norwegian Forest Cat",
    country: "Norway",
    lat: 60.5,
    lng: 12,
    image: "https://wallpapers.com/images/hd/norwegian-forest-cat-1000-x-666-wallpaper-b7zk3x9k7445ees1.jpg",
    desc: "A majestic explorer from the cold Scandinavian forests.",
  },
  {
    name: "Maine Coon",
    country: "USA",
    lat: 44.0,
    lng: -69.0,
    image: "https://images7.alphacoders.com/109/1096186.jpg",
    desc: "Big-hearted and fluffy — the gentle giant from North America.",
  },
  {
    name: "Bengal",
    country: "India",
    lat: 20.6,
    lng: 78.9,
    image: "https://i.pinimg.com/736x/43/f2/17/43f2177c3a09036f9f7d7eafe8bc7559.jpg",
    desc: "A stunning hybrid with leopard-like spots and endless energy.",
  },
  {
    name: "Sphynx",
    country: "Canada",
    lat: 53.1,
    lng: -105.0,
    image: "https://w0.peakpx.com/wallpaper/993/779/HD-wallpaper-sphynx-cat-hairless-cat-pets-cute-animals-breeds-of-hairless-cats.jpg",
    desc: "Hairless but full of love — the iconic Canadian Sphynx.",
  },
  {
    name: "Japanese Bobtail",
    country: "Japan",
    lat: 36.2,
    lng: 138.2,
    image: "https://t4.ftcdn.net/jpg/00/23/08/93/360_F_23089333_NUAPkcp8NMIjAM1W0FpIAeVs2aLsZbWm.jpg",
    desc: "Symbol of luck and friendship — Japan’s famous bobtail cat.",
  },
  {
    name: "Turkish Van",
    country: "Turkey",
    lat: 39.0,
    lng: 35.2,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Turkish_Van.jpg/1200px-Turkish_Van.jpg",
    desc: "A swimming cat! Originating from Lake Van in Turkey.",
  },
  {
    name: "British Shorthair",
    country: "UK",
    lat: 52.1,
    lng: -0.2,
    image: "https://c4.wallpaperflare.com/wallpaper/850/501/319/muzzle-grey-bokeh-cat-british-shorthair-hd-wallpaper-preview.jpg",
    desc: "Calm, plush, and dignified — a British classic with a teddy bear face.",
  },
  {
    name: "Russian Blue",
    country: "Russia",
    lat: 61.5,
    lng: 105.3,
    image: "https://media.istockphoto.com/id/966220442/photo/russian-blue-cat.jpg?s=612x612&w=0&k=20&c=FgkaXZLX5Gb5aCxSgNys4MfPKTPJXCF6Iohu_9SEFys=",
    desc: "Elegant and mysterious, cloaked in shimmering silver fur.",
  },
  {
    name: "Abyssinian",
    country: "Ethiopia",
    lat: 9.1,
    lng: 38.7,
    image:
      "https://media.istockphoto.com/id/1713725987/photo/hunter-cat-the-muzzle-of-the-abyssinian-cat-before-the-attack-close-up-the-cat-is-playing.jpg?s=612x612&w=0&k=20&c=HNOBr0rRvryli6Pvo0nccddsVGfzeMJYstD7dpNHzGI=",
    desc: "Graceful and curious — one of the world’s oldest and most playful breeds.",
  },
  {
    name: "Persian",
    country: "Iran",
    lat: 32.4,
    lng: 53.7,
    image: "https://media.istockphoto.com/id/1135793728/photo/white-persian-cats.jpg?s=612x612&w=0&k=20&c=UeroNOVgXc3wUrR_tIBhT1uH_iAoH_ZZo9I95_L-mqU=",
    desc: "A royal beauty from Persia, adored for its luxurious coat and calm spirit.",
  },
  {
    name: "Scottish Fold",
    country: "Scotland",
    lat: 56.9,
    lng: -4.0,
    image: "https://media.istockphoto.com/id/467801366/photo/lovable-scottish-fold-cat.jpg?s=612x612&w=0&k=20&c=0OAfVoF3NaPUGRJG9260elTgUykTxFbNOlDlEVNu_Hc=",
    desc: "Known for its adorable folded ears and sweet expression.",
  },
  {
    name: "Ragdoll",
    country: "USA",
    lat: 37.8,
    lng: -122.4,
    image: "https://i.pinimg.com/1200x/fd/c3/a4/fdc3a404083dd390bafd43a48928c520.jpg",
    desc: "Floppy, affectionate, and gentle — the perfect cuddle companion.",
  },
  {
    name: "Birman",
    country: "Myanmar",
    lat: 21.9,
    lng: 95.9,
    image: "https://i.pinimg.com/736x/fb/da/3b/fbda3b0ce00490359f41955cc1014280.jpg",
    desc: "Sacred and serene — the temple cat of Burma.",
  },
  {
    name: "Savannah",
    country: "USA",
    lat: 33.0,
    lng: -83.5,
    image:
      "https://media.istockphoto.com/id/1424070375/photo/savannah-cat-sits-on-a-pedestal-pillow-against-a-background-of-greenery.jpg?s=612x612&w=0&k=20&c=48u686oEWUSpkbfVeqQOEcimNl1u0LMEsUSrA9y_ncY=",
    desc: "A striking hybrid — wild in look, loyal in heart.",
  },
  {
    name: "Chartreux",
    country: "France",
    lat: 46.6,
    lng: 2.2,
    image: "https://media.istockphoto.com/id/1138433493/photo/cat-carthusian.jpg?s=612x612&w=0&k=20&c=puW-mJmxwHs4n75F9AF4FzA1s16k-E6V2W62Sfs3INY=",
    desc: "A quiet, blue-gray companion from France — strong yet sweet.",
  },
  {
    name: "Manx",
    country: "Isle of Man",
    lat: 53.8,
    lng: -4.6,
    image: "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/FE2B/production/_90676056_mediaitem90676051.jpg",
    desc: "Tailless and brave — the island cat with a seafaring soul.",
  },
  {
    name: "Balinese",
    country: "USA",
    lat: 30.5,
    lng: -110.0,
    image:
      "https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL3NodXR0ZXJzdG9jay03MTgzMjI5MDguanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo4Mjh9fX0=",
    desc: "Graceful and silky, the long-haired Siamese — pure elegance.",
  },
  {
    name: "Singapura",
    country: "Singapore",
    lat: 1.35,
    lng: 103.82,
    image:
      "https://media.istockphoto.com/id/506347140/photo/closeup-singapura-cat-looking-in-camera-on-purple.jpg?s=612x612&w=0&k=20&c=8OHnXhQ4JiEflE_DXTtViVwvMVyCZcQZ-3Zy1uGaJ7U=",
    desc: "Tiny but mighty — the smallest cat breed with a big personality.",
  },
  {
    name: "Siberian",
    country: "Russia",
    lat: 63.5,
    lng: 90.3,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz2GjcsgDkNroPCUzrmhOJeztRg3XiVpb10w&s",
    desc: "A thick-coated survivor from the snowy Russian wilderness.",
  },
  {
    name: "Ocicat",
    country: "USA",
    lat: 40.0,
    lng: -99.0,
    image:
      "https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL3NodXR0ZXJzdG9jay0xMDM5MDU1NTc1LmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6ODI4fX19",
    desc: "Wild look, domestic heart — the spotted beauty born in America.",
  },
  {
    name: "Tonkinese",
    country: "Canada",
    lat: 40.4,
    lng: -75.7,
    image: "https://t4.ftcdn.net/jpg/14/74/78/19/360_F_1474781905_L7B7kXPxRC1hFtPnidiEd8a6P0SzW66U.jpg",
    desc: "Balanced and loving — a charming mix of Siamese and Burmese.",
  },
  {
    name: "Oriental Shorthair",
    country: "Thailand",
    lat: 12.2,
    lng: 100.9,
    image:
      "https://media.istockphoto.com/id/153567998/photo/creamy-brown-oriental-cat-sitting-on-fabric.jpg?s=612x612&w=0&k=20&c=LgIU6c6ujaz7r49DhFY2oHh511IExZT_frGfUiSKQEI=",
    desc: "Sleek, vocal, and intelligent — the expressive cousin of the Siamese.",
  },
  {
    name: "Bombay",
    country: "USA",
    lat: 38.9,
    lng: -90.0,
    image: "https://www.shutterstock.com/image-photo/black-bombay-cat-looks-like-600nw-2483539887.jpg",
    desc: "A mini-panther with a heart full of affection and mystery.",
  },
  {
    name: "Himalayan",
    country: "Nepal",
    lat: 28.4,
    lng: 84.1,
    image:
      "https://media.istockphoto.com/id/1699175131/photo/siamese-himalayan-persian-cat.jpg?s=612x612&w=0&k=20&c=j1Yk0rv3mlJ-B1ccUc77_HbpjgeyggViDaN-yD8aftM=",
    desc: "A serene blend of Persian and Siamese — beauty from the mountains.",
  },
  {
    name: "American Curl",
    country: "USA",
    lat: 45.1,
    lng: -122.0,
    image: "https://media.istockphoto.com/id/136401296/photo/american-curl-cat.jpg?s=612x612&w=0&k=20&c=cKuB0oYK2YLZKmlNf5FuNAam6-bD0HyV7W7pP4CQnVw=",
    desc: "Recognizable by its unique curled ears and friendly personality.",
  },
];

const CatPlanet = () => {
  const globeEl = useRef();
  const navigate = useNavigate();
  const [selectedCat, setSelectedCat] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (globeEl.current) {
      // Visuale iniziale
      globeEl.current.pointOfView({ lat: 10, lng: 0, altitude: 2.3 }, 1000);
    }
  }, []);

  const handleLabelClick = (cat) => {
    setShowPopup(false);
    setTimeout(() => {
      setSelectedCat(cat);
      setShowPopup(true);
    }, 200);
  };

  return (
    <div className="cat-planet-fullscreen">
      {/* BACK BUTTON */}
      <Button className="back-btn" variant="outline-light" onClick={() => navigate("/")}>
        ← Back Home
      </Button>

      {/* GLOBE */}
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        labelsData={catOrigins}
        labelLat={(d) => d.lat}
        labelLng={(d) => d.lng}
        labelText={(d) => d.name}
        labelSize={1.1}
        labelColor={() => "rgba(255,255,255,0.9)"}
        labelDotRadius={0.45}
        onLabelClick={handleLabelClick}
      />

      {/* POPUP */}
      {selectedCat && (
        <div className={`cat-popup ${showPopup ? "show" : ""}`}>
          <button className="close-btn" onClick={() => setShowPopup(false)}>
            ✕
          </button>
          <img src={selectedCat.image} alt={selectedCat.name} />
          <div className="cat-popup-text">
            <h3>{selectedCat.name}</h3>
            <p>{selectedCat.desc}</p>
            <span>📍 {selectedCat.country}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatPlanet;

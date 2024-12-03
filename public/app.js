const socket = io();
//Server pe connection request jaaegi
//Then we have to handle that connection request at backend

if(navigator.geolocation){
    navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        socket.emit("send-location", { latitude, longitude})
    },
    (error) => {
        console.error(error);
    },
    {
        enableHighAccuracy: true,
        maximumAge: 0, //caching
        timeout: 5000,
    }
);
}

const map = L.map("map").setView([0, 0], 10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "OpenstreetMap"
}).addTo(map); 

const markers = {};

socket.on("receive-location", (data) => {
    const {id, latitude, longitude} = data;
    map.setView([latitude, longitude]);
    if(markers[id]){
        markers[id].setLatLng([latitude, longitude]);
    }else{
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    }
});

socket.on("User-disconnected", (id) => {
   if(markers[id]){
    map.removeLayer(markers[id]);
    delete markers[id];
   }
})
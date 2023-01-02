// ce loader va nous montrer a la fois le loader et un message d'erreur si on refuse la localisation du navigateur 
const loader = document.querySelector(".loader")

//la geolocalisation est une propriete du navigateur 
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(location => {
      const long = location.coords.longitude;
      const lat = location.coords.latitude;
      console.log(long,lat)
      getWeatherData(long, lat)
    }, () => {
      loader.textContent = "Vous avez refusé la géolocalisation, l'application ne peut pas fonctionner, veuillez l'activer."
    })
  }

async function getWeatherData(long, lat) {
    try {

       // const results = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=cb0e220c844a5d9d514cbf7c9ed34c00`)
       const results = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&APPID=cb0e220c844a5d9d514cbf7c9ed34c00`)
        if (!results.ok) {
            throw new Error(`Erreur: ${results.status}`)
        }
        const data = await results.json()

        console.log(data);

        loader.classList.add("fade-out");

    } catch (e) {
        loader.textContent = e;
    }

}
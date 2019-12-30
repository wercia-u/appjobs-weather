const APIURL = "http://api.openweathermap.org";
const ApiIconUrl = "http://openweathermap.org/img/wn/";
const API_KEY = "fabc365b1f5e9e266ded85460586491d";

let weatherApp = new Vue({
    el: '#app',
    data: {
        position: 'Katowice',
        timer: '',
        loading: true,
        random: '',
        icon: '',
        errorStr:'',
        results: []
    },
    methods: {
        getLocation(){
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(position=>{
                    this.getWeather(position);
                    this.position = position;
                });
            }else{
                this.errorStr = "Geolocation is not supported.";
            }
        },
        getWeather(position) {
            let lat = position.coords.latitude;
            let long = position.coords.longitude;
            let url = `${APIURL}/data/2.5/find?lat=${lat}&lon=${long}&units=metric&APPID=${API_KEY}`;
            this.loading = true;
            axios
                .get(url)
                .then(response => {
                    this.results = response.data.list;
                    this.icon = `${ApiIconUrl}${response.data.list[0].weather[0].icon}.png`;
                    this.random = Math.random();
                    this.loading = false;
                })
                .catch(error => {
                    this.errorStr = "Ups, something went wrong";
                    this.loading = false
                });
        },
    },
    created () {
        this.getLocation();
        setInterval(() => {
            this.getWeather(this.position)
        }, 20000)
    },
    beforeDestroy () {
        clearInterval(this.timer)
    },
});
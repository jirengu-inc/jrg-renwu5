import '../css/style.css'
import $ from "jquery";
$.ajax({
			url:'http://api.jirengu.com/weather.php',
			dataType:"jsonp",
		}).done(function(ret){
			if(ret&&!ret.error&&ret.status==='success'){
				setDate(ret.date)
				setCity(ret.results[0].currentCity)
				var weather=ret.results[0].weather_data;
				console.log(weather)
				for(var i=0;i<weather.length;i++){
					setWeather(weather[i])
				}
			}
		})

		function setDate(date){
			var arrDate = date.split('-');
			console.log(1)
			var strDate=arrDate[0]+'年';
			strDate+=arrDate[1]+'月';
			strDate+=arrDate[2]+'日';
			console.log(strDate)
			$('.now-date').text(strDate)
		}
		function setCity(city){
			$('.city').text(city)
		}
		function setWeather(obj){
			var weather="<div class='weather'>"
			for(var key in obj){
				console.log(obj[key])
				if(obj[key][0]==="h"){
					weather+="<img src='"+obj[key]+"'>"
				}else{
					weather+="<div>";
					weather+=obj[key];
					weather+="</div>";
				}
			}
			weather+='</div>'
			$('#container').append(weather)
		}
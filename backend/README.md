# BACKEND-API5S

DADOS DA API DA NASA: 
https://power.larc.nasa.gov/#resources
https://power.larc.nasa.gov/api/pages/?urls.primaryName=Indicators

URL utilizada no software:
https://power.larc.nasa.gov/api/projection/daily/point?start=**DATA INICIAL**&end=**DATA FINAL**&latitude=**LATITUDE**&longitude=**LONGITUDE**&community=ag&parameters=T2M%2CPRECTOTCORR%2CRH2M&header=true&time-standard=utc&model=ensemble&scenario=ssp126

Exemplo com data inicial 2020, final 2024, latitude e longitude 40
https://power.larc.nasa.gov/api/projection/daily/point?start=2020&end=2024&latitude=40&longitude=40&community=ag&parameters=T2M%2CPRECTOTCORR%2CRH2M&header=true&time-standard=utc&model=ensemble&scenario=ssp126

Dados utilizados: Temperatura a 2 metros, umidade a 2 metros e precipitação corrigida

---

DADOS DA API DA OPEN METEO: 
https://open-meteo.com/

URL utilizada no software:
https://api.open-meteo.com/v1/forecast?latitude=**LATITUDE**&longitude=**LONGITUDE**&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation&timezone=America/Sao_Paulo

Exemplo latitude e longitude 40
https://api.open-meteo.com/v1/forecast?latitude=40&longitude=40&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation&timezone=America/Sao_Paulo

Dados utilizados: Temperatura a 2 metros, umidade a 2 metros e precipitação

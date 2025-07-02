const nodemailer = require('nodemailer');
const { fetchAllWeatherData } = require('../services/clima/api_clima'); // Adjust path if necessary

function enviarEmail(email, titulo, texto) {
    console.log(`Sending email to: ${email} with title: ${titulo}`);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'fatecfullstack@gmail.com',
        pass: 'zvmy dvhc tful wzus',
      },
    });
  
    const mailOptions = {
      from: 'fatecfullstack@gmail.com',
      to: email,
      subject: titulo,
      text: texto,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }

async function startMonitoring(db) {
  const usersCollection = db.collection('usuarios');
  const users = await usersCollection.find().toArray();

  for (const user of users) {
    const { email_usuario, pontos, max_temp, min_temp, max_hum, min_hum } = user;

    // Ensure pontos is an array before proceeding
    if (!Array.isArray(pontos)) {
      console.error(`Invalid "pontos" for user ${email_usuario}:`, pontos);
      continue;
    }

    for (const point of pontos) {
      const { lat_long } = point;

      // Ensure lat_long exists and has latitude and longitude
      if (!lat_long || typeof lat_long.latitude !== 'number' || typeof lat_long.longitude !== 'number') {
        console.error(`Invalid "lat_long" in point for user ${email_usuario}:`, point);
        continue;
      }

      const { latitude, longitude } = lat_long;

      try {
        // Fetch weather data for temperature and humidity
        const weatherData = await fetchAllWeatherData(latitude, longitude);
        const hourlyTemps = weatherData.hourly.temperature_2m;
        const hourlyHums = weatherData.hourly.relative_humidity_2m;

        // Find the max and min temperature and humidity
        const maxTemp = Math.max(...hourlyTemps);
        const minTemp = Math.min(...hourlyTemps);
        const maxHum = Math.max(...hourlyHums);
        const minHum = Math.min(...hourlyHums);

        console.log(`${point.apelido}: Max Temp: ${maxTemp}°C, Min Temp: ${minTemp}°C, Max Humidity: ${maxHum}%, Min Humidity: ${minHum}% ---- Limites : ${point.max_temp} a ${point.min_temp}`);

        // Check if any conditions exceed limits
        if (
            maxTemp > point.max_temp || // Current max temperature exceeds the threshold
            minTemp < point.min_temp || // Current min temperature is below the threshold
            maxHum > point.max_hum ||  // Current max humidity exceeds the threshold
            minHum < point.min_hum     // Current min humidity is below the threshold
          ) {
            console.log(`Alert triggered for ${point.apelido}`);
            console.log(`Max Temp: ${maxTemp}°C, Min Temp: ${minTemp}°C, Max Humidity: ${maxHum}%, Min Humidity: ${minHum}%`);
          
            let message = `Alerta: Temperatura ou Humidade para o ponto ${point.apelido} está fora dos limites.\n\n`;
          
            // Check the limits and add the appropriate messages
            if (minTemp < point.min_temp) {
              message += `- Temperatura mínima (${minTemp}°C) abaixo do limite estipulado (${point.min_temp}°C).\n`;
            }
            if (maxTemp > point.max_temp) {
              message += `- Temperatura máxima (${maxTemp}°C) acima do limite estipulado (${point.max_temp}°C).\n`;
            }
            if (minHum < point.min_hum) {
              message += `- Humidade mínima (${minHum}%) abaixo do limite estipulado (${point.min_hum}%).\n`;
            }
            if (maxHum > point.max_hum) {
              message += `- Humidade máxima (${maxHum}%) acima do limite estipulado (${point.max_hum}%).\n`;
            }
          
            // Send the email alert
            enviarEmail(email_usuario, 'Alerta de tempo', message);
            console.log(`Alerta enviado para ${email_usuario} para o ponto: ${point.apelido}`);
          }

      } catch (error) {
        console.error(`Error processing weather data for user ${email_usuario} at point ${point.apelido}:`, error);
      }
    }
  }
}

module.exports = { startMonitoring };

import { useEffect, useState } from "react";
import Prayer from "./Components/Prayer";
// import "./index.css"; // هنعمل فيه التنسيقات

function App() {
  const [prayerTimes, setPrayerTimes] = useState({});
  const [dateTime, setDateTime] = useState("");
  const [city, setCity] = useState("Cairo");

  const cities = [
    { name: "القاهره", value: "Cairo" },
    { name: "الاسكندريه", value: "Alexandria" },
    { name: "المنصوره", value: "El-Mansourah" },
    { name: "الجيزه", value: "Giza" },
    { name: "اسوان", value: "Aswan" },
    { name: "الاقصر", value: "Luxor" },
  ];

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Egypt`
        );
        const data_Prayer = await response.json();

        setPrayerTimes(data_Prayer.data.timings || {});
        setDateTime(data_Prayer.data.date.gregorian.date || "");
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      }
    };

    fetchPrayerTimes();
  }, [city]);

  const formatTime = (time) => {
    if (!time) return "00:00";
    let [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? `0${minutes}` : minutes} ${period}`;
  };

  return (
    <section>
      <div className="container">
        {/* الجزء العلوي */}
        <div className="top-sec">
          <div className="city">
            <h3>المدينه</h3>
            <select onChange={(e) => setCity(e.target.value)} value={city}>
              {cities.map((cityItem) => (
                <option key={cityItem.value} value={cityItem.value}>
                  {cityItem.name}
                </option>
              ))}
            </select>
          </div>

          <div className="date">
            <h3>التاريخ</h3>
            <h4>{dateTime}</h4>
          </div>
        </div>

        {/* مواعيد الصلاة */}
        <div className="prayers-grid">
          <Prayer name="الفجر" time={formatTime(prayerTimes.Fajr)} />
          <Prayer name="الظهر" time={formatTime(prayerTimes.Dhuhr)} />
          <Prayer name="العصر" time={formatTime(prayerTimes.Asr)} />
          <Prayer name="المغرب" time={formatTime(prayerTimes.Maghrib)} />
          <Prayer name="العشاء" time={formatTime(prayerTimes.Isha)} />
        </div>
      </div>
    </section>
  );
}

export default App;

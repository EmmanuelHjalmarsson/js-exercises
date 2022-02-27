let url;
{
  url = new URL("https://localhost");

  url.hostname = "api.openweathermap.org";
  url.pathname = "/data/2.5/weather"; /** vart ligget detta */
  url.searchParams.set("q", "Hoting");
  url.searchParams.set("appid", "ac5d516646126253361022bafa972296");
  url.searchParams.set("mode", "json");
  url.searchParams.set("units", "metric");
  url.searchParams.set("lang", "se");

  for (let [key, val] of url.searchParams) {
    console.log(`${key}:${val}`);
  }

  document.getElementById("ex-1-out").innerText = url;
}

// clickar man på knappen skrivs ut fetch() i ex-2-out
document.getElementById("ex-2-btn").onclick = function (event) {
  const out = document.getElementById("ex-2-out");

  fetch(url)
    .then((response) => {
      if (!response.ok) throw `${response.status} ${response.statusText}`;
      return response.text();
    })
    .then((text) => {
      const prettyJSON = JSON.stringify(JSON.parse(text), null, " ");
      out.innerText = prettyJSON;
    })
    .catch((error) => console.log(error));
};

document.getElementById("ex-3-btn").onclick = function (event) {
  const out = document.getElementById("ex-3-out");
  const xhr = new XMLHttpRequest();

  xhr.open("GET", url);
  xhr.responseType = "text";

  xhr.onload = function (event) {
    console.log(
      `Weather request status: ${event.target.status} ${event.target.statusText}`
    );

    if (event.target.status === 200) {
      // Begäran lyckades
      let text = event.target.response;
      let prettyJSON = JSON.stringify(JSON.parse(text), null, " ");
      out.innerText = prettyJSON;
    }
  };

  xhr.onerror = function (e) {
    console.log(url.origin + " could not be reached");
  };

  xhr.send();
};

document.getElementById("ex-4-btn").onclick = function (event) {
  const out = document.getElementById("ex-4-out");

  fetch(url)
    .then((response) => {
      if (!response.ok) throw `${response.status} ${response.statusText}`;
      return response.json();
    })
    .then((weatherReport) => {
      const mainWeather = weatherReport.weather[0];
      const title = mainWeather.main;
      const flavortext = mainWeather.description;

      const imgUrl = new URL("http://openweathermap.org");
      imgUrl.pathname = `/img/wn/${mainWeather.icon}@4x.png`;

      const mainTemp = weatherReport.main;
      const temp = mainTemp.temp;
      const feelsLike = mainTemp.feels_like;

      out.innerHTML = /* html */ `
          <h3>${title}</h3>
          <img src="${imgUrl}">
          <p>${flavortext}</p>
          <p>Det är ${temp}&#8451; men känns som ${feelsLike}&#8451;</p>
        `;
    })
    .catch((error) => console.log(error));
};

{
  const titleH2 = document.getElementById("ex-5-title");
  const contentP = document.getElementById("ex-5-content");
  const authorP = document.getElementById("sex-5-author");
  const commentsDiv = document.getElementById("ex-5-comments");

  //sök efter användare 1
  const userUrl = new URL("http://jsonplaceholder.typicode.com/users/1");

  //sök efter blogginlägg för användare 1
  const postsUrl = new URL("http://jsonplaceholder.typicode.com/users/1/posts");

  //sök efter max 4 kommenarer releterad till
  const commentsUrl = new URL(
    "http://jsonplaceholder.typicode.com/users/1/posts/comments"
  );
  commentsUrl.searchParams.set("_limit", 4);

  fetch(userUrl)
    .then((response) => {
      if (!response.ok) throw `${response.status} ${response.statusText}`;
      return response.json();
    })
    .then((user) => {
      authorP.textContent = user.name;
    })
    .catch((error) => console.log());
}

let input = document.getElementById("search");
const list = document.getElementById("list");
const body = document.getElementById("body");
const model = document.getElementById("model");
const container = document.getElementById("searchEngine");

let popupStatus = false;
//port 2345
const getRes = async () => {
  list.innerHTML = null;
  let data = await getData(input.value);
  ListSection(data);
};

const getData = async (input) => {
  const URL = "http://localhost:2345/data";
  const limit = 5;
  const data = await fetch(`${URL}?q=${input}&_limit=${limit}`);
  const jsonData = await data.json();
  return jsonData;
};

const popup = (
  name,
  images,
  powerstats,
  appearance,
  biography,
  work,
  connections
) => {
  model.innerHTML = null;
  model.style.visibility = "visible";
  container.style.visibility = "hidden";
  let main = document.createElement("main");
  let div = document.createElement("div");
  div.setAttribute("id", "card-container");
  div.setAttribute("data-offset", "2");
  div.innerHTML = ` <div class="pg">
          <img
            src=${images.lg}
          />
        </div>
        <div id="card">
          <div class="shine"></div>
          <div class="text-block">
            <h1>${name} <small>${appearance.race}</small></h1>
            <h2>intelligence - ${powerstats.intelligence} , strength - ${powerstats.strength} , speed - ${powerstats.speed}</h2>
            <h3>Full name - <small>${biography.fullName}</small></h3>

            <h3>gender - <small>${appearance.gender}</small></h3>
            <h3>race - <small>${appearance.race}</small></h3>
            <h3>place Of Birth - <small>${biography.placeOfBirth}</small></h3>
            <h3>
              firstAppearance -
              <small>${biography.firstAppearance}</small>
            </h3>
            <h3>publisher - <small>${biography.publisher}</small></h3>

            <h3></h3>
          </div>
        </div>`;
  let btn = document.createElement("button");
  btn.setAttribute("class", "closeBtn close");
  btn.addEventListener("click", () => {
    container.style.visibility = "visible";
    model.style.visibility = "hidden";
  });
  btn.innerText = "❌";
  main.append(div, btn);
  model.append(main);
};

const ListSection = (x) => {
  //   console.log("x:", x);
  x.forEach(
    ({
      name,
      images,
      powerstats,
      appearance,
      biography,
      work,
      connections,
    }) => {
      let div = document.createElement("div");
      div.addEventListener("click", () => {
        popup(
          name,
          images,
          powerstats,
          appearance,
          biography,
          work,
          connections
        );
      });
      div.setAttribute(
        "class",
        " flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2"
      );

      //span
      let span = document.createElement("span");
      span.setAttribute("class", "bg-gray-400 h-2 w-2 m-2 rounded-full");

      //name div
      let nameDiv = document.createElement("div");
      nameDiv.setAttribute("class", "flex-grow font-medium px-2");
      nameDiv.innerText = name;

      //image div
      let imageDiv = document.createElement("div");
      imageDiv.setAttribute(
        "class",
        "text-sm font-normal text-gray-500 tracking-wide"
      );

      //image
      let image = document.createElement("img");
      image.setAttribute("src", images.xs);

      //append image in imagediv
      imageDiv.append(image);

      //append all element in main div
      div.append(span, nameDiv, imageDiv);

      /*

    div.innerHTML = `<div
                    class="
                      flex
                      justify-start
                      cursor-pointer
                      text-gray-700
                      hover:text-blue-400 hover:bg-blue-100
                      rounded-md
                      px-2
                      py-2
                      my-2
                    "
                  >
                    <span class="bg-gray-400 h-2 w-2 m-2 rounded-full"></span>
                    <div class="flex-grow font-medium px-2">${name}</div>
                    <div
                      class="text-sm font-normal text-gray-500 tracking-wide"
                    >
                      <img
                        src=${images.xs}
                        alt=""
                      />
                    </div>
                  </div>`;
                  */
      list.append(div);
    }
  );
};

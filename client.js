/*=== === === === === === === === === === === === === === === === === === 
                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                  ~~~ Fetch GitHub Data Project ~~~
                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                  Author: https://github.com/ittid
                  Email: ahnaine3bd@gmail.com
                  Release Date: 1 nov, 2022
                  Detail: A Pure JavaScript Project
=== === === === === === === === === === === === === === === === === ===*/

addEventListener("DOMContentLoaded", () => {
  /*=== Get the username value and asigne it to Variable ===*/
  const user = document.querySelector("[data-username]");
  const submitField = document.querySelector("[data-submit]");
  const userInCodeTag = document.getElementsByClassName("user_in_code")[0];
  const DefaultUi = document.getElementsByClassName("lead")[0];
  const fetchinUi = document.getElementsByClassName("content_api")[0];
  const nameAfterFetchData = document.getElementById("name_after_fetch_data");
  const avatar = document.getElementById("avatar_name");
  const allRepository = document.getElementById("repos");
  const repoSize = document.getElementById("size");
  /* add class hidden to the fetch api */
  fetchinUi.classList.add("hidden");
  fetchinUi.classList.remove("content_api");

  /* Handlse the submit event */
  submitField.addEventListener("click", (e) => {
    /* the Html Template to append repos in the fetch Ui */
    e.preventDefault();
    if (!user.value.trim().length) {
      user.style.outline = "2px solid #ff5721";
      return;
    }
    /*=== Fetch data with async and await and try, catch, finally ===*/
    async function fetchData(url) {
      try {
        let fetchOnGithub = await fetch(
          `https://api.github.com/users/${url}/repos`
        );
        let response = await fetchOnGithub.json();
        let handleReturnRes = response.map((repo) => {
          avatar.setAttribute("src", `${repo.owner.avatar_url}`);
          avatar.setAttribute("alt", `${repo.owner.login}`);
          const template = `
          <article class="repos_details">
            <span class="date">
              release on,
              ${new Date(repo.created_at).toDateString()}
            </span> 
            <a href="${repo.html_url}" target="_blank">
              <h2>${repo.name}</h2>
              <p>
                ${
                  repo.description
                    ? repo.description
                    : "no description for this repository"
                } 
              </p>
              <span class="lang">lang:<strong>${
                repo.language ? repo.language : "not reconized"
              }</strong></span>
              <ul>
                <li>forks: ${repo.forks}</li>
                <li>watchers: ${repo.watchers}</li>
              </ul>
            </a>
            <p class="topic">${repo.topics
              .map((topic) => {
                return `<strong>#${topic}</strong>`;
              })
              .join("")}</p>

          </article>
          `;
          allRepository.innerHTML += template;
          return repo;
        });

        console.log(handleReturnRes);
        repoSize.textContent = handleReturnRes.length;
        /* add class hidden to the fetch api */
        DefaultUi.classList.add("hidden");
        DefaultUi.classList.remove("lead");
        /* add class hidden to the fetch api */
        fetchinUi.classList.remove("hidden");
        fetchinUi.classList.add("content_api");
        /* show the name user in the code tag */
      } catch (error) {
        throw new Error(
          "fetch Api Has not been fetching the data from the Json File: check you connection and the usename",
          error
        );
      } finally {
      }
    }
    const data = user.value;
    nameAfterFetchData.textContent = data;
    // show name under image
    const nameUser = document.getElementById("name_avatar"); //name_avatar
    nameUser.innerText = `@${data}`;

    // run the function to fetch the data
    fetchData(data);

    // asigne user value to the user in link inside the <code> tag.
    userInCodeTag.textContent = data;
    user.style.outline = "none";
    user.style.border = "1px solid #d2d4d7";
    setTimeout(() => {
      user.value = "";
    }, 2300);
  });
});

# To Do List App

<a id="readme-top"></a>

[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

[![Product Name Screen Shot][product-screenshot]](https://todolist.nalyd.dev)

> This is a simple fullstack to do list app project I decided to make to learn NextJS.

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

As I am just learning NextJS, I decided to challenge myself with some fullstack projects that use NextJS to solidify my knowledge and continue to learn. This is my first project with NextJS! Below are some of the features this project includes:

- oAuth for full authentication with Google sign-in or Github sign-in
- Lightweight database using SQLite, no need for separate database but it is easily integratable if needed, using Prisma as the ORM.
- As expected, you can create to do list items, delete, complete, edit and they are tied to your email so you can log in with Github or Google and as long as it is that same email, you will see those same to dos.

There's much more I can do with this project, and below is a roadmap for a few things I may end up adding to this!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

Below are some of the libraries I used to build this application:

- [![Next][Next.js]][Next-url]
- [![React][React.js]][React-url]
- [![Mantine]][Mantine-url]
- [![Tailwind]][Tailwind-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Below are some instructions you can follow in order to run this app locally! If not, feel free to also checkout the [demo](https://todolist.nalyd.dev)!

### Installation

1. Retrieve your client ID and client secrets at [Google](https://developers.google.com/identity/protocols/oauth2) and/or [Github](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps)
2. Clone the repo
   ```sh
   git clone https://github.com/nalyDzzz/to-do-list.git
   ```
3. Navigate to repo directory
   ```sh
   cd to-do-list
   ```
4. Install NPM packages
   ```sh
   npm install
   ```
5. Open `sample.env` and use the reference to make your own `.env` file
6. Run the below command to initialize the SQLite DB file
   ```sh
   npx prisma db push
   ```
7. Run development environment
   ```sh
   npm run dev
   ```
8. Open [localhost:3000](http://localhost:3000)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

- **Add to do**

[![add-item]][add-item]

- **Complete to do**

[![complete-item]][complete-item]

- **Delete to do**

[![delete-item]][delete-item]

- **Complete multiple**

[![complete-multiple]][complete-multiple]

- **Delete multiple**

[![delete-multiple]][delete-multiple]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [ ] Add select all button
- [ ] Add more style features
- [ ] Add logo
- [ ] Fix responsive title
- [ ] Multi-language Support
- [ ] Potentially make React Native App

See the [open issues](https://github.com/nalyDzzz/to-do-list/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Dylan - [@nalyDzzz](https://twitter.com/nalyDzzz) - dylanmarin2018@gmail.com

Project Link: [https://github.com/nalyDzzz/to-do-list](https://github.com/nalyDzzz/to-do-list)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/nalyDzzz/to-do-list.svg?style=for-the-badge
[contributors-url]: https://github.com/nalyDzzz/to-do-list/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/nalyDzzz/to-do-list.svg?style=for-the-badge
[forks-url]: https://github.com/nalyDzzz/to-do-list/network/members
[stars-shield]: https://img.shields.io/github/stars/nalyDzzz/to-do-list.svg?style=for-the-badge
[stars-url]: https://github.com/nalyDzzz/to-do-list/stargazers
[issues-shield]: https://img.shields.io/github/issues/nalyDzzz/to-do-list.svg?style=for-the-badge
[issues-url]: https://github.com/nalyDzzz/to-do-list/issues
[license-shield]: https://img.shields.io/github/license/nalyDzzz/to-do-list?style=for-the-badge
[license-url]: https://github.com/nalyDzzz/to-do-list/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/marin-dylan
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Mantine]: https://img.shields.io/badge/MANTINE-3299f0?style=for-the-badge&logo=mantine&logoColor=white
[Mantine-url]: https://mantine.dev/
[Tailwind]: https://img.shields.io/badge/TAILWIND%20CSS-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[product-screenshot]: public/ss1.png
[add-item]: public/add-item.gif
[complete-item]: public/complete-item.gif
[delete-item]: public/delete-item.gif
[complete-multiple]: public/complete-multiple.gif
[delete-multiple]: public/delete-multiple.gif

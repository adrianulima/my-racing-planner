# Racing Planner

This tool helps iRacing users efficiently navigate series, cars, and tracks, allowing them to make informed decisions about the best content to purchase based on usage in the current season. The project also includes wishlist functionality, allowing users to add items and navigate to iRacing's website for easy purchasing.

Visit it at: [https://racingplanner.com](https://racingplanner.com)

![image](https://github.com/user-attachments/assets/8284bc52-811c-495d-89d7-8da642154ff4)

_This project is not affiliated with or endorsed by iRacing.com._

---

## Features

- **Content Analysis:** View cars and tracks used by every active series, and decide best purchase for the season.
- **Wishlist:** Add cars and tracks to a wishlist for streamlined purchasing.
- **Integration with iRacing:** Links to iRacing's website to complete purchases.

---

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v20 or newer)
- `pnpm` package manager

## Running the Project Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/iracing-content-navigator.git
   cd iracing-content-navigator
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

### Development Server

To start the development server:

```bash
pnpm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

### Building for Production

To create a production build:

```bash
pnpm run build
```

The output will be located in the `dist` folder.

### Previewing the Production Build

To preview the production build locally:

```bash
pnpm run preview
```

---

## Scripts for Data Fetching

The project includes scripts to fetch data from iRacing's public API and parse it into JSON files. These scripts require valid iRacing credentials in the `.env` file.

### Fetching Data

1. Create a `.env` file in the root directory and add your iRacing API credentials:

   ```env
   IRACING_USERNAME=your_username
   IRACING_PASSWORD=your_password
   ```

2. Run the fetch script:

   ```bash
   pnpm run fetch-data
   ```

   ```bash
   pnpm run fetch-past
   ```

3. Process the fetched data into src/ir-data/ JSON files:

   ```bash
   pnpm run parse-data
   ```

   ```bash
   pnpm run parse-past
   ```

---

## Contributing

Contributions are welcome! If you'd like to improve this project, please:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add feature-name'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a pull request

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
- `npm` package manager

## Running the Project Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/iracing-content-navigator.git
   cd iracing-content-navigator
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Development Server

To start the development server:

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

### Building for Production

To create a production build:

```bash
npm run build
```

The output will be located in the `dist` folder.

### Previewing the Production Build

To preview the production build locally:

```bash
npm run preview
```

---

## Scripts for Data Fetching

The project includes scripts to fetch data from iRacing's public API and parse it into JSON files. These scripts use OAuth 2.1 authentication with the Password Limited Grant flow.

### Prerequisites for Data Fetching

1. **Register your application with iRacing:**
   - Contact iRacing support to register your application and get OAuth credentials
   - Request access to the Password Limited Grant flow
   - You will receive a `client_id` and `client_secret`
   - Your iRacing account (email) will be added to the access list for your client

2. **Create a `.env` file** in the root directory with your credentials:

   ```env
   IRACING_USERNAME=your_email@example.com
   IRACING_PASSWORD=your_iracing_password
   IRACING_CLIENT_ID=your_client_id
   IRACING_CLIENT_SECRET=your_client_secret
   ```

   > **Important:** The Password Limited Grant flow requires that your specific iRacing account is registered with your client application. This is a security feature to prevent credential harvesting.

### Fetching Data

Run the fetch script to download current season data:

```bash
npm run fetch-data
```

Run the fetch-past script to download historical season data:

```bash
npm run fetch-past
```

Process the fetched data into src/ir-data/ JSON files:

```bash
npm run parse-data
```

```bash
npm run parse-past
```

### Authentication Details

The scripts use OAuth 2.1 Password Limited Grant, which:

- Automatically handles token acquisition and refresh
- Uses secure password masking (SHA-256 + Base64 encoding)
- Includes rate limiting protection
- Tokens are cached and reused until expiration

---

## Contributing

Contributions are welcome! If you'd like to improve this project, please:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add feature-name'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a pull request

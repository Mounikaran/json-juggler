# Json Juggler

A full-stack Next.js TypeScript application that converts XLSX files to JSON format and updates target keys in your input JSON data.

## Features

- **JSON Input**: Paste or type your JSON data with any structure
- **XLSX File Upload**: Drag and drop or click to upload Excel files
- **Smart Column Conversion**: Automatically converts column names to snake_case
- **Data Processing**: Mirrors the exact Python script functionality
- **Intuitive UI**: Clean, responsive interface for seamless workflow
- **Real-time Results**: See the updated JSON immediately after processing
- **Copy to Clipboard**: One-click copy of the final result

## How It Works

1. **Input JSON**: Enter your JSON data (the `org_mapper` key will be updated with converted XLSX data)
2. **Upload XLSX**: Select an Excel file to be converted
3. **Process**: Click "Process Files" to convert and merge the data
4. **Result**: Get your updated JSON with the new `org_mapper` values

## Column Name Conversion

The application converts Excel column names to snake_case following these rules:

- `#` column becomes `id` (then removed from final output)
- Spaces, hyphens, slashes become underscores
- CamelCase and PascalCase converted to snake_case
- Special characters removed
- Multiple underscores cleaned up
- Everything converted to lowercase

### Examples:

- `First Name` → `first_name`
- `EmailAddress` → `email_address`
- `Phone#` → `phone`
- `Date/Time` → `date_time`

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd json-juggler
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Usage Example

### Input JSON:

```json
{
  "company": "Example Corp",
  "org_mapper": [],
  "metadata": {
    "version": "1.0"
  }
}
```

### After Processing XLSX file:

```json
{
  "company": "Example Corp",
  "org_mapper": [
    {
      "first_name": "John",
      "last_name": "Doe",
      "email_address": "john@example.com",
      "phone_number": "555-0123"
    },
    {
      "first_name": "Jane",
      "last_name": "Smith",
      "email_address": "jane@example.com",
      "phone_number": "555-0456"
    }
  ],
  "metadata": {
    "version": "1.0"
  }
}
```

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **File Processing**: XLSX library
- **Deployment**: Vercel-ready

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main application page
└── utils/
    └── xlsxConverter.ts     # XLSX processing utilities
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

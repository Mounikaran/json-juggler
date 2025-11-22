# Org File Mapper

A modern, configurable file converter built with Next.js and TypeScript. Transform XLSX/CSV files into JSON with flexible conversion modes and customizable output formatting.

## ✨ Features

### 🎛️ Inline Settings

- **Always-visible settings bar** - No modals, instant configuration
- **Auto-save preferences** - Settings persist across sessions via localStorage
- Quick toggle switches for all options

### 📁 File Format Support

- **XLSX** - Excel files (.xlsx, .xls)
- **CSV** - Comma-separated values
- Drag-and-drop file upload
- File validation and preview

### 🔄 Flexible Conversion Modes

#### Direct Conversion

- Convert files directly to JSON arrays
- No JSON input required
- Perfect for simple file-to-JSON workflows

#### Update Key Mode

- Update specific keys in existing JSON
- Merge file data with current JSON structure
- Configurable target key (default: `org_mapper`)

### 🔤 Key Naming Conventions

Choose your preferred output format:

- **snake_case** (default) - `first_name`, `email_address`
- **camelCase** - `firstName`, `emailAddress`
- **as-is** - Preserve original column names

### 💅 Modern UI

- Clean, minimal interface
- Full-height cards for maximum space
- Responsive design
- Real-time feedback
- One-click copy to clipboard

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd org-file-mapper

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📖 How to Use

1. **Configure Settings** (optional)

   - Choose file type: XLSX or CSV
   - Select conversion mode: Direct or Update Key
   - Pick key naming convention
   - Set target key for Update mode

2. **Upload File**

   - Drag and drop or click to browse
   - Supports XLSX and CSV files

3. **Add JSON** (Update Key mode only)

   - Paste existing JSON data
   - Specify which key to update

4. **Process**
   - Click "Process" button
   - View formatted output
   - Copy result to clipboard

## 💡 Usage Examples

### Direct Conversion Mode

**Input:** XLSX file with columns: `First Name`, `Last Name`, `Email Address`

**Output (snake_case):**

```json
[
  {
    "first_name": "John",
    "last_name": "Doe",
    "email_address": "john@example.com"
  },
  {
    "first_name": "Jane",
    "last_name": "Smith",
    "email_address": "jane@example.com"
  }
]
```

### Update Key Mode

**Input JSON:**

```json
{
  "company": "Example Corp",
  "org_mapper": [],
  "metadata": {
    "version": "1.0"
  }
}
```

**After Processing XLSX:**

```json
{
  "company": "Example Corp",
  "org_mapper": [
    {
      "first_name": "John",
      "last_name": "Doe",
      "email_address": "john@example.com"
    },
    {
      "first_name": "Jane",
      "last_name": "Smith",
      "email_address": "jane@example.com"
    }
  ],
  "metadata": {
    "version": "1.0"
  }
}
```

## 🔧 Column Name Conversion

### snake_case Rules

- Spaces, hyphens, slashes → underscores
- CamelCase/PascalCase → snake_case
- Special characters removed
- Multiple underscores cleaned up
- Lowercase conversion

**Examples:**

- `First Name` → `first_name`
- `EmailAddress` → `email_address`
- `Phone#` → `phone`
- `Date/Time` → `date_time`
- `Branch Manager Name` → `branch_manager_name`

### camelCase Rules

- First word lowercase, subsequent words capitalized
- Special characters removed
- Spaces/hyphens removed

**Examples:**

- `First Name` → `firstName`
- `Email Address` → `emailAddress`
- `Branch Manager` → `branchManager`

### as-is Rules

- Preserves original column names exactly
- No transformation applied

## 🏗️ Technology Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **File Processing:** XLSX library
- **State Management:** React Hooks
- **Storage:** localStorage API

## 📂 Project Structure

```
src/
├── app/
│   ├── globals.css                    # Global styles
│   ├── layout.tsx                     # Root layout
│   └── page.tsx                       # Main application
├── components/
│   ├── features/
│   │   ├── FileUploader.tsx          # File upload component
│   │   ├── JsonInput.tsx             # JSON input component
│   │   ├── ResultDisplay.tsx         # Result viewer
│   │   ├── InlineSettings.tsx        # Settings bar
│   │   ├── Header.tsx                # App header
│   │   └── HelpModal.tsx             # Help documentation
│   └── ui/
│       ├── Button.tsx                 # Reusable button
│       ├── Card.tsx                   # Card wrapper
│       └── Modal.tsx                  # Modal wrapper
├── types/
│   └── settings.ts                    # TypeScript types
└── utils/
    └── xlsxConverter.ts              # File processing logic
```

## ⚙️ Configuration

Settings are automatically saved to localStorage with the following defaults:

```typescript
{
  fileType: 'xlsx',              // 'xlsx' | 'csv'
  conversionMode: 'updateKey',   // 'direct' | 'updateKey'
  targetKey: 'org_mapper',       // string
  keyNamingConvention: 'snake_case'  // 'snake_case' | 'camelCase' | 'as-is'
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with Next.js and Tailwind CSS
- XLSX processing powered by SheetJS
- Icons from Heroicons

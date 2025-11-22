/**
 * Converts various column naming conventions to snake_case
 * This function replicates the Python convert_to_snake_case function exactly
 */
export function convertToSnakeCase(columnName: string): string {
  // Handle special case for '#' column
  if (columnName === '#') {
    return 'id';
  }

  // Convert camelCase or PascalCase to snake_case
  let result = columnName;

  // Handle camelCase or PascalCase
  result = result.replace(/(.)([A-Z][a-z]+)/g, '$1_$2');

  // Handle case where there are multiple capital letters
  result = result.replace(/([a-z0-9])([A-Z])/g, '$1_$2');

  // Replace various special characters with underscores
  result = result.replace(/ /g, '_');  // Replace spaces with underscores
  result = result.replace(/-/g, '_');  // Replace hyphens with underscores
  result = result.replace(/\//g, '_'); // Replace forward slashes
  result = result.replace(/\\/g, '_'); // Replace backslashes
  result = result.replace(/\./g, '_'); // Replace periods

  // Remove parentheses and other special characters
  result = result.replace(/[\(\)\[\]\{\}\?\!\@\#\$\%\^\&\*\+\=\|\:\;\,\<\>]/g, '');

  // Clean up multiple underscores
  result = result.replace(/_+/g, '_'); // Replace multiple underscores with a single one
  result = result.replace(/^_|_$/g, ''); // Remove leading/trailing underscores

  return result.toLowerCase();
}

/**
 * Converts column name to camelCase
 */
export function convertToCamelCase(columnName: string): string {
  // Handle special case for '#' column
  if (columnName === '#') {
    return 'id';
  }

  // First convert to snake_case to normalize
  const snakeCase = convertToSnakeCase(columnName);

  // Split by underscore and convert to camelCase
  const parts = snakeCase.split('_');
  if (parts.length === 0) return '';

  // First part stays lowercase, rest are capitalized
  return parts[0] + parts.slice(1).map(part =>
    part.charAt(0).toUpperCase() + part.slice(1)
  ).join('');
}

/**
 * Preserves original column name with minimal cleanup
 */
export function preserveOriginal(columnName: string): string {
  // Handle special case for '#' column
  if (columnName === '#') {
    return 'id';
  }

  // Just trim whitespace
  return columnName.trim();
}

// Debug function to test specific column conversions
export function testColumnConversion() {
  const testColumns = [
    'branch_manager_email_1',
    'area_manager_email_1',
    'Branch Manager Email 1',
    'Area Manager Email 1',
    'BranchManagerEmail1',
    'AreaManagerEmail1',
    'Branch Manager Email (1)',
    'Area Manager Email (1)'
  ];

  console.log('Testing column conversions:');
  testColumns.forEach(col => {
    console.log(`"${col}" -> "${convertToSnakeCase(col)}"`);
  });
}

// Function to help debug missing columns
export function debugMissingColumns(processedData: any[], expectedColumns: string[]) {
  if (processedData.length === 0) {
    console.log('No data to check');
    return;
  }

  const firstRow = processedData[0];
  const actualColumns = Object.keys(firstRow);

  console.log('Expected columns:', expectedColumns);
  console.log('Actual columns in result:', actualColumns);

  expectedColumns.forEach(col => {
    if (!actualColumns.includes(col)) {
      console.log(`❌ Missing column: ${col}`);
    } else {
      console.log(`✅ Found column: ${col} = ${firstRow[col]}`);
    }
  });
}

/**
 * Converts XLSX data to JSON format matching the Python implementation
 */
/**
 * Handles duplicate headers by appending .1, .2, etc. to match Pandas behavior
 */
function handleDuplicateHeaders(headers: any[]): string[] {
  const counts: { [key: string]: number } = {};

  return headers.map(header => {
    const original = String(header).trim();

    if (counts[original] === undefined) {
      counts[original] = 0;
      return original;
    } else {
      counts[original]++;
      return `${original}.${counts[original]}`;
    }
  });
}

/**
 * Converts XLSX data to JSON format matching the Python implementation
 */
export function processXlsxData(data: any[][], namingConvention: 'snake_case' | 'camelCase' | 'as-is' = 'snake_case'): any[] {
  if (!data || data.length === 0) {
    return [];
  }

  // First row contains headers
  const rawHeaders = data[0];
  const rows = data.slice(1);

  console.log('Original headers:', rawHeaders);

  // Handle duplicate headers (e.g. "Email", "Email" -> "Email", "Email.1")
  const uniqueHeaders = handleDuplicateHeaders(rawHeaders);
  console.log('Unique headers:', uniqueHeaders);

  // Convert column names based on naming convention
  const convertFunc = namingConvention === 'camelCase' ? convertToCamelCase :
    namingConvention === 'as-is' ? preserveOriginal :
      convertToSnakeCase;

  const convertedHeaders = uniqueHeaders.map(header => {
    const converted = convertFunc(header);
    console.log(`Converting (${namingConvention}): "${header}" -> "${converted}"`);
    return converted;
  });

  console.log('Converted headers:', convertedHeaders);

  // Convert rows to objects
  let jsonData = rows.map(row => {
    const obj: any = {};
    convertedHeaders.forEach((header, index) => {
      const value = row[index];
      // Include all columns, even if empty (matching Python behavior)
      // Trim string values like in Python
      // Use null for undefined/empty values to ensure keys are preserved in JSON
      if (value === undefined || value === null) {
        obj[header] = null;
      } else {
        obj[header] = typeof value === 'string' ? value.trim() : value;
      }
    });
    return obj;
  });

  console.log('Before removing id column:', jsonData[0]);

  // Remove id column if it exists (matching Python behavior)
  jsonData = jsonData.map(obj => {
    const { id, ...rest } = obj;
    return rest;
  });

  console.log('Final processed data sample:', jsonData[0]);

  return jsonData;
}

/**
 * Updates the org_mapper key in the input JSON with converted XLSX data
 */
export function updateOrgMapper(inputJson: any, xlsxData: any[]): any {
  try {
    const parsedInput = typeof inputJson === 'string' ? JSON.parse(inputJson) : inputJson;
    return {
      ...parsedInput,
      org_mapper: xlsxData
    };
  } catch (error) {
    throw new Error('Invalid JSON format in input');
  }
}
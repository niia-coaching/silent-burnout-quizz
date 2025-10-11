// Google Sheets Integration
// This submits user data to Google Sheets when they start the evaluation

// SETUP INSTRUCTIONS:
// 1. Go to https://sheet.best/
// 2. Sign up for free account
// 3. Connect your Google Sheets
// 4. Get your API endpoint URL
// 5. Replace the URL below with your endpoint

const GOOGLE_SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL;

// Alternative: Use Google Apps Script (Free, unlimited)
// See GOOGLE_SHEETS_SETUP.md for full instructions

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  timestamp: string;
}

export const saveToGoogleSheets = async (userData: UserData): Promise<boolean> => {
  try {
    // Add timestamp if not provided
    const dataToSubmit = {
      ...userData,
      timestamp: userData.timestamp || new Date().toISOString(),
      date: new Date().toLocaleString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    // Use URLSearchParams for Google Apps Script (avoids CORS preflight)
    const formData = new URLSearchParams();
    Object.entries(dataToSubmit).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type - let browser set it automatically for URLSearchParams
    });

    const result = await response.text();
    console.log('Google Sheets response:', result);

    if (response.ok) {
      console.log('Data saved to Google Sheets successfully');
      return true;
    } else {
      console.error('Failed to save to Google Sheets:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    return false;
  }
};


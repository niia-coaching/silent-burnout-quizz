# Google Sheets Integration Setup - Complete Guide

This app saves user information to Google Sheets when they start the assessment. This guide includes the **working solution** that avoids CORS issues.

---

## Quick Start (Recommended Method)

### Option 1: Google Apps Script (FREE & Unlimited) ⭐

This is the **working method** that avoids CORS errors!

#### Step 1: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "NIIA Assessment Leads"
3. Add these column headers in **row 1**:

```
firstName | lastName | email | phone | timestamp | date | results
```

#### Step 2: Set Up Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. **Delete** any existing code
3. **Paste** this code:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Get data from POST request (URLSearchParams format)
    var params = e.parameter;
    
    // Add row with data - includes both user info and comprehensive assessment results
    sheet.appendRow([
      params.firstName || '',
      params.lastName || '',
      params.email || '',
      params.phone || '',
      params.timestamp || '',
      params.date || '',
      params.results || ''
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Data saved successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ message: 'NIIA Lead Capture API is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Click **💾 Save** (or Ctrl+S / Cmd+S)
5. Name your project: "NIIA Leads API"

#### Step 3: Deploy the Web App (CRITICAL!)

⚠️ **This step is crucial to avoid CORS errors!**

1. Click **Deploy** → **New deployment**
2. Click the **gear icon** ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure these settings:
   - **Description**: "NIIA Leads API v1"
   - **Execute as**: **Me (your@email.com)** ⚠️
   - **Who has access**: **Anyone** ⚠️ (THIS IS CRITICAL!)
5. Click **Deploy**

#### Step 4: Authorize the Script

You'll need to authorize the script:

1. Click **"Authorize access"**
2. Choose your Google account
3. You'll see a warning "Google hasn't verified this app"
4. Click **"Advanced"**
5. Click **"Go to NIIA Leads API (unsafe)"**
6. Click **"Allow"**

#### Step 5: Copy the Deployment URL

After authorization, you'll see the deployment URL:

```
https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID_HERE/exec
```

⚠️ **Important**: The URL should:
- Start with `https://script.google.com/macros/s/`
- **NOT** contain `/a/esi.dz/` or `/a/macros/`
- End with `/exec`

**Copy this URL!** You'll need it in the next step.

#### Step 6: Configure Your .env File

1. Create a `.env` file in your project root (if it doesn't exist)
2. Add this line with your actual deployment URL:

```env
VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_ACTUAL_DEPLOYMENT_ID/exec
```

Replace `YOUR_ACTUAL_DEPLOYMENT_ID` with your real ID from the deployment URL.

#### Step 7: Restart Your Dev Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

#### Step 8: Test It!

1. Open your app in the browser
2. Fill out the form with test data
3. Click "Commencer l'évaluation"
4. Check your Google Sheet - you should see the data! ✅
5. Check the browser console - you should see "Data saved to Google Sheets successfully"

---

## Option 2: Sheet.best (Easiest Alternative)

If Google Apps Script is too complex, use Sheet.best:

### Setup (2 minutes)

1. Go to [https://sheet.best](https://sheet.best)
2. Sign up free (100 submissions/month)
3. Click "New Connection"
4. Connect your Google Sheet (same column headers as above)
5. Copy the connection URL: `https://sheet.best/api/sheets/YOUR_SHEET_ID`
6. Update `.env`:

```env
VITE_GOOGLE_SHEETS_URL=https://sheet.best/api/sheets/YOUR_SHEET_ID
```

7. Restart: `npm run dev`

**Pros**: No CORS issues, automatic handling, very simple
**Cons**: 100 submissions/month limit on free plan

---

## What Data Gets Saved?

When a user completes the assessment, this data is saved:

### User Information
| Column | Description | Example |
|--------|-------------|---------|
| firstName | User's first name | "Marie" |
| lastName | User's last name | "Dupont" |
| email | User's email | "marie@example.com" |
| phone | User's phone (optional) | "+33 6 12 34 56 78" |
| timestamp | ISO timestamp | "2024-01-15T14:30:00.000Z" |
| date | Formatted date | "15 janvier 2024 à 14:30" |

### Assessment Results
| Column | Description | Example |
|--------|-------------|---------|
| results | Complete assessment data in JSON format | See detailed structure below |

#### Results JSON Structure:
```json
{
  "overall": {
    "totalScore": 145,
    "totalPercentage": 69,
    "profile": "Équilibré"
  },
  "batteries": {
    "physical": {
      "score": 22,
      "level": "optimal",
      "percentage": 73,
      "answers": {
        "Sommeil": "Je dors bien et me réveille reposé(e)",
        "Ton niveau d'énergie": "Stable et suffisant"
      }
    },
    "mental": {
      "score": 18,
      "level": "unstable", 
      "percentage": 60,
      "answers": {
        "Clarté mentale": "Je pense clairement et décide facilement",
        "Ruminations": "Rarement"
      }
    }
    // ... other batteries
  }
}
```

---

## Troubleshooting

### ❌ CORS Error: "No 'Access-Control-Allow-Origin' header"

**Problem**: You deployed from a Google Workspace account OR didn't set "Anyone" access

**Solution**:
1. Delete the current deployment
2. Deploy again ensuring:
   - Execute as: **Me**
   - Who has access: **Anyone** ⚠️
3. The new URL should NOT contain `/a/esi.dz/` or `/a/your-domain/`
4. Use a **personal Google account** if possible, not a workspace account

### ❌ URL Contains `/a/esi.dz/` or `/a/macros/`

**Problem**: Deployed from Google Workspace with restrictions

**Solution**:
1. Deploy from a personal Google account, OR
2. Contact your workspace admin to enable Apps Script external access, OR
3. Use Sheet.best instead (easier!)

### ❌ "Authorization required" error

**Problem**: You didn't complete the authorization steps

**Solution**: 
1. Go back to Apps Script
2. Click "Review Permissions"
3. Follow the authorization steps above

### ❌ Data not appearing in sheet

**Problem**: Column headers don't match

**Solution**: Make sure row 1 has these EXACT headers:
```
firstName | lastName | email | phone | timestamp | date | results
```

### ✅ Testing Your Deployment

Visit your deployment URL in a browser:
```
https://script.google.com/macros/s/YOUR_ID/exec
```

You should see:
```json
{"message":"NIIA Lead Capture API is running"}
```

If you see this, your API is working! 🎉

---

## Environment Variables

Your `.env` file should look like this:

```env
# Google Sheets Integration
VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/abc123def456/exec
```

**Important Notes**:
- The variable name MUST start with `VITE_` (required for Vite)
- Place `.env` in the root directory (same level as `package.json`)
- Restart dev server after changing `.env`
- DO NOT commit `.env` to git (it's in `.gitignore`)

---

## Why This Solution Works

The original code was using `Content-Type: application/json` which triggers a CORS preflight request. Google Apps Script doesn't handle preflight requests well from certain deployment types.

**The Fix**: We switched to `URLSearchParams` format instead of JSON. This:
- Sends data as `application/x-www-form-urlencoded`
- Avoids CORS preflight requests
- Works reliably with Google Apps Script

---

## Comparison

| Feature | Google Apps Script | Sheet.best |
|---------|-------------------|------------|
| **Cost** | Free (unlimited) | Free (100/month) |
| **Setup Time** | 10 minutes | 2 minutes |
| **CORS Issues** | None (with our fix) | None |
| **Monthly Limit** | Unlimited ✅ | 100 submissions |
| **Difficulty** | Medium | Easy |
| **Best For** | Production | Quick testing |

---

## Need Help?

- **Apps Script Docs**: https://developers.google.com/apps-script
- **Sheet.best Docs**: https://docs.sheet.best
- **NIIA Support**: contact@niia.coach

---

## Security Notes

- The Apps Script is deployed with "Anyone" access because it's designed to receive public form submissions
- No sensitive data is exposed - users only submit their contact information
- All data goes directly to your private Google Sheet
- Only YOU can access the Google Sheet (unless you share it)

---

**🎉 That's it! Your Google Sheets integration is now working perfectly!**

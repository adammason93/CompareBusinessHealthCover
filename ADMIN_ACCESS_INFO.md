# Admin Leads Page - Access Information

## 🔒 Secure Access URL

**Bookmark this URL:**
```
https://your-domain.com/#admin-leads
```

## 🔑 Password

**Default Password:** `HealthCover2024!`

**To change the password:**
1. Open `/src/app/pages/AdminLeads.tsx`
2. Find line with `const ADMIN_PASSWORD = "HealthCover2024!";`
3. Change to your desired password
4. Save the file

## 📊 Page Features

### Columns Displayed:
- Company Name
- Lead Date (auto-populated from submission)
- Contact Info (Name, Email, Phone)
- Cover Type
- Is Insured (editable)
- Source - Organic/PPC (editable)
- Premium Value (editable by Matt)
- Commission Paid (editable by Matt)
- Policy Start Date (editable)
- Insurer (editable)
- Comments (editable)

### Features:
- ✏️ Click pencil icon to edit any row
- 💾 Click save (checkmark) to save changes
- 🔍 Search by company name, contact name, or email
- 🎯 Filter by Source (Organic/PPC) or Insured status
- 📥 Export to CSV with current filters applied
- 📊 Dashboard stats showing totals

## 🔐 Security Notes

- Password is stored in browser localStorage after first login
- Page is NOT linked anywhere on the website
- Normal users cannot find this page
- Clear browser localStorage to require password again
- Page is only accessible via direct URL bookmark

## 💡 Tips for Matt

1. **Bookmark the page** immediately for easy access
2. **Keep password secure** - only share with authorized staff
3. **Export CSV regularly** for backup/reporting
4. **Use comments field** for follow-up notes and status updates
5. **Filter by source** to track ROI on PPC vs Organic leads

## 🛠️ Troubleshooting

**If you forget the password:**
- Open browser console (F12)
- Type: `localStorage.removeItem('adminAuth')`
- Press Enter
- Refresh page and enter correct password

**If page won't load:**
- Check URL has `#admin-leads` at the end
- Try clearing browser cache
- Check browser console for errors

## 📞 Support

For technical issues, contact your developer with:
- Browser console errors (F12 → Console tab)
- Screenshot of the issue
- Steps to reproduce the problem

Schema Data Extraction Task — Simple Guide

🎯 Goal

Collect all structured data schemas (JSON-LD) from pages of Bimeh.com and export them into an Excel file.

📌 What Needs to Be Done
1️⃣ Find All Website URLs

Get the full list of site pages (usually from the sitemap).

Example source:

https://bimeh.com/sitemap.xml

2️⃣ Extract Schema Data From Each Page

On every page, look for this tag:

<script type="application/ld+json">


This contains structured data like:

FAQPage

Product

Breadcrumb

Organization

Article

3️⃣ Parse the JSON-LD Content

For each schema found, collect:

Page URL

Schema type (@type)

Full JSON content

4️⃣ Save Results Into Excel

The final Excel file should include columns like:

URL	Schema Type	Raw JSON
page link	FAQPage	full schema data
🛠 Suggested Implementation Approach

Use a simple crawler script that:

Reads URLs from the sitemap

Visits each page

Extracts JSON-LD scripts

Saves everything into an .xlsx file

✅ Expected Output

A single Excel file containing:

All site URLs with schema data

Each schema listed separately

Ready for SEO audit or documentation

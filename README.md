# 🏡 AI Lead Intelligence Dashboard

Transform customer call notes into actionable real-estate sales intelligence using AI.

## 🚀 Live Demo

**Deployed Application:**
https://real-estate-ai-lead-analyzer.vercel.app

**GitHub Repository:**
https://github.com/namratanagaraj75-prog/real-estate-ai-lead-analyzer

---

## 📌 Project Overview

Real estate sales teams spend significant time manually reviewing customer conversations and identifying potential leads.

The AI Lead Intelligence Dashboard automates this process by analyzing customer call notes and converting them into structured sales insights.

Using Generative AI, the system extracts key information such as:

* Lead Status
* Customer Name
* Budget
* Preferred Location
* Investment Timeline
* Customer Concerns
* Recommended Next Action
* Confidence Score

This helps sales teams prioritize leads and improve conversion rates.

---

## ✨ Key Features

### 🤖 AI-Powered Lead Analysis

Analyzes unstructured customer call notes and generates a structured intelligence report.

### 🔥 Lead Classification

Automatically categorizes leads as:

* Hot Lead
* Warm Lead
* Cold Lead

### 💰 Budget Extraction

Identifies customer budget and investment capacity.

### 📍 Location Detection

Extracts preferred investment locations from conversations.

### 📅 Timeline Identification

Determines expected purchase timeline.

### ⚠️ Concern Analysis

Detects customer objections and concerns such as:

* DTCP Approval
* Legal Documentation
* Loan Eligibility
* Registration Process
* Resale Value

### 📞 Next Action Recommendations

Provides actionable follow-up suggestions for sales teams.

### 🎯 Confidence Scoring

Displays AI confidence through a visual progress indicator.

### 📋 Copy Report

Allows users to copy generated reports instantly.

### 📥 Download Report

Downloads lead reports for future reference and sharing.

### 🌐 Cloud Deployment

Successfully deployed using Vercel for public access.

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* JavaScript
* CSS

### AI Integration

* OpenRouter API
* GPT OSS 20B Model

### Deployment

* Vercel

### Version Control

* Git
* GitHub

---

## 📂 Project Architecture

```text
Customer Notes
       │
       ▼
OpenRouter AI API
       │
       ▼
Lead Intelligence Extraction
       │
       ▼
Structured JSON Response
       │
       ▼
Dashboard Visualization
```

## 🔍 Sample Use Case

### Input

```text
Customer wants to invest in a 40x60 plot in Shadnagar.

Budget is around ₹30 Lakhs.

Investment planned within 45 days.

Asked about DTCP approval, loan eligibility and resale value.

Site visit scheduled this Sunday.
```

### AI Output

```json
{
  "leadStatus": "Hot Lead",
  "customer": "Karthik Reddy",
  "budget": "₹30 Lakhs",
  "location": "Shadnagar",
  "timeline": "Within 45 Days",
  "concerns": "DTCP approval, loan eligibility, resale value",
  "nextAction": "Schedule site visit and send brochure",
  "confidence": "92"
}
```

---

## 🎯 Business Impact

This solution helps real-estate organizations:

* Reduce manual lead analysis effort
* Improve lead prioritization
* Increase sales team productivity
* Accelerate customer follow-ups
* Improve conversion rates

---

## 📸 Screenshots

Add screenshots of:

1. Dashboard Home Screen
2. Customer Notes Input
3. AI Generated Report
4. Lead Status & Confidence Score

---

## 👩‍💻 Developed By

**Namrata N S**

Computer Science Engineering Student

Passionate about:

* Artificial Intelligence
* Generative AI
* Data Science
* Real-World Problem Solving

---

## ⭐ Future Enhancements

* PDF Report Generation
* CRM Integration
* Lead Analytics Dashboard
* Voice-to-Text Conversion
* Multi-Language Support
* Lead Conversion Prediction
* Email & WhatsApp Automation

---

## 📜 License

This project is developed for educational and internship evaluation purposes.

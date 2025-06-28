
# 🚀 Data Alchemist

*An AI-Powered Data Configuration Platform*

![Next.js](https://img.shields.io/badge/Next.js-000?logo=next.js\&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript\&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-764ABC?logo=redux\&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css\&logoColor=white)

---

## 📚 Overview

**Data Alchemist** is a modern AI-assisted tool to **upload, validate, manipulate, and export datasets** using:

* **Natural Language Rules**
* **AI Rule Suggestions**
* **Priority Management Sliders**
* **Editable Data Grids**
* **Bar Chart Visualizations**

It simplifies complex configuration by allowing natural interaction with your data.

---

## 🚀 Features

✅ Upload CSV/XLSX files for:

* Clients
* Workers
* Tasks

✅ Visual Data Grids (with in-line editing)

✅ Data Validation with detailed error summaries

✅ Priority Settings via interactive sliders

✅ AI-powered Rule Suggestions with lazy loading

✅ Manual Rule Builder for Task Co-Runs

✅ Natural Language Rule Input (e.g., *Co-run Task A and Task B*)

✅ Natural Language Data Search (e.g., *Show tasks longer than 2 phases in phase 3*)

✅ **Bar Chart Visualization of Search Results**

✅ Export Cleaned Datasets and Generated Rules

✅ Real-time Toast Notifications (via **Sonner**)

---

## 📂 Project Structure

```text
src/
├── app/                 # Next.js App Router
│   ├── page.tsx         # Main Page
│   └── providers.tsx    # Redux Provider
│
├── components/          # UI & Functional Components
│   ├── FileUpload.tsx
│   ├── DataGrid.tsx
│   ├── ValidationSummary.tsx
│   ├── RuleBuilder.tsx
│   ├── PrioritySlider.tsx
│   ├── NaturalLanguageRuleInput.tsx
│   ├── NaturalLanguageSearch.tsx
│   ├── AIRuleSuggestions.tsx
│   ├── DataExporter.tsx
│   └── ui/              # shadcn/ui components
│
├── store/               # Redux Toolkit Store
├── utils/               # Parsers, Validators, NLP Utilities
└── styles/              # Global CSS & Tailwind Config
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd data-alchemist
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

App will be running at:
[http://localhost:3000](http://localhost:3000)

---

## 💬 Natural Language Rule Examples

| Example Input                       | Effect                                |
| ----------------------------------- | ------------------------------------- |
| Co-run Task T1 and Task T2          | Creates a co-run rule for these tasks |
| Schedule Task A and Task B together | Same as co-run rule                   |
| Co-run Task X1 and Task Y2          | Supports multi-task selection         |

> You can add these directly in the **Natural Language Rule Input** field.

---

## 🔍 Natural Language Search Examples

| Example Query                              | Result                              |
| ------------------------------------------ | ----------------------------------- |
| Show tasks longer than 2 phases in phase 3 | Filters tasks by duration and phase |
| Clients with priority 1                    | Shows clients with priority level 1 |
| Workers in location Mumbai                 | Lists workers based in Mumbai       |
| Show tasks with duration greater than 3    | Filters tasks by duration           |
| Show clients located in Delhi              | Lists clients from Delhi            |

> Search queries are written in plain English using supported patterns.

---

## 📊 Visualizations

After each search, **bar charts automatically display the relevant data** for quick insights.

### Example:

* For **tasks**, a bar chart of `TaskName` vs `Duration` is shown.
* Easily switch to a line chart if needed.

> Visualization is powered by **recharts** and adapts to your search results.

---

## 📤 Export Options

* Export cleaned **Clients, Workers, Tasks** datasets as CSV files.
* Export all generated **Rules** as JSON.

---

## 🛠 Tech Stack

* **Next.js 15 (App Router)**
* **TypeScript**
* **Redux Toolkit**
* **Tailwind CSS**
* **shadcn/ui**
* **Sonner (Toast Notifications)**
* **@tanstack/react-table** (Editable Tables)
* **Recharts** (Data Visualizations)

---

## 📈 Future Improvements

* Advanced NLP Parsing with LLM APIs (OpenAI, Cohere)
* Role-based Authentication and Access
* Data Versioning and Rollback
* Visual Analytics and Priority Graphs
* Real-time Collaborative Editing

---

## 📄 License

This project is licensed under the MIT License.

---
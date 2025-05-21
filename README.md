# 📝 Cover Letter Generator

A responsive, intuitive **React-based web application** that helps users generate professional cover letters using AI. Just paste your **job description**, enter your **skills**, and get a polished, editable cover letter that can be exported as **PDF** or **DOCX**.

---

## 🚀 Features

### ✨ Core Functionality

- 🧠 **AI-Powered Cover Letter Generation**
  - Uses OpenRouter's LLM API (Google Gemma or compatible) to generate high-quality letters.
- 🔍 **Dual-Pane Editor**
  - Real-time markdown-supported live preview as you type.
- 📄 **Export Options**
  - Export cover letters as:
    - **PDF** (well-formatted, printable)
    - **DOCX** (editable Word doc)
- 🖋️ **Markdown Support**
  - Supports basic formatting: `**bold**`, `*italic*`, etc.
- 📱 **Responsive UI**
  - Fully mobile-friendly with seamless layout transitions.
- 🌐 **Custom Styling**
  - Glassmorphism interface
  - Customized scrollbar
  - Favicon and site name branding

---

## 🧰 Tech Stack

| Technology             | Description                                            |
| ---------------------- | ------------------------------------------------------ |
| **React.js**           | Front-end framework                                    |
| **Tailwind CSS**       | Utility-first styling                                  |
| **jsPDF**              | PDF generation client-side                             |
| **docx**               | Microsoft Word DOCX generation (OpenXML)               |
| **file-saver**         | Handles saving files to disk                           |
| **OpenRouter LLM API** | Free access to LLMs like deepseek-r1-distill-llama-70b |

---

## 📦 Installation

```bash
git clone https://github.com/your-username/cover-letter-generator.git
cd cover-letter-generator
npm install
npm run dev
```

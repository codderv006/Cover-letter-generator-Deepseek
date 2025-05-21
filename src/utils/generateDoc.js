import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun, AlignmentType } from "docx";
import jsPDF from "jspdf";

const inchToTwip = (inches) => inches * 1440; // for DOCX margins

// Simple markdown parser for bold (**text**) and italics (*text*)
function parseMarkdownToRuns(text) {
  const runs = [];
  const regex = /(\*\*([^*]+)\*\*|\*([^*]+)\*|([^\*]+))/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match[2]) {
      runs.push(new TextRun({ text: match[2], bold: true }));
    } else if (match[3]) {
      runs.push(new TextRun({ text: match[3], italics: true }));
    } else if (match[4]) {
      runs.push(new TextRun(match[4]));
    }
  }
  return runs;
}

export const exportAsDocx = (text, filename = "CoverLetter.docx") => {
  const subjectMatch = text.match(/^Subject:.*$/m);
  const subject = subjectMatch
    ? subjectMatch[0]
    : "Subject: Application for the Position";
  const bodyText = text.replace(subject, "").trim();

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: inchToTwip(1),
              bottom: inchToTwip(1),
              left: inchToTwip(0.5),
              right: inchToTwip(0.5),
            },
          },
        },
        children: [
          new Paragraph({
            children: parseMarkdownToRuns(subject),
            spacing: { after: 200 },
            alignment: AlignmentType.JUSTIFIED,
          }),
          new Paragraph({
            children: parseMarkdownToRuns(bodyText),
            alignment: AlignmentType.JUSTIFIED,
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => saveAs(blob, filename));
};

export const exportAsPdf = (text, filename = "CoverLetter.pdf") => {
  const doc = new jsPDF({
    unit: "pt",
    format: "letter", // 612 x 792 points
  });

  const leftMargin = 36; // 0.5 inch
  const rightMargin = 36;
  const topMargin = 36;
  const lineSpacing = 18; // spacing between lines

  const pageWidth = doc.internal.pageSize.getWidth();
  const usableWidth = pageWidth - leftMargin - rightMargin;

  // Extract subject
  const subjectMatch = text.match(/^Subject:.*$/m);
  const subject = subjectMatch
    ? subjectMatch[0]
    : "Subject: Application for the Position";
  const bodyText = text.replace(subject, "").trim();

  const cleanBodyText = bodyText.replace(/\*\*/g, "").replace(/\*/g, "");

  // Set up font
  doc.setFont("Times-Roman");
  doc.setFontSize(14);

  // Split text properly
  const subjectLines = doc.splitTextToSize(subject, usableWidth);
  const bodyLines = doc.splitTextToSize(cleanBodyText, usableWidth);

  let y = topMargin;

  // Draw subject
  doc.text(subjectLines, leftMargin, y, { maxWidth: usableWidth });
  y += subjectLines.length * lineSpacing + 10;

  // Set font size for body
  doc.setFontSize(12);
  doc.text(bodyLines, leftMargin, y, { maxWidth: usableWidth });

  doc.save(filename);
};

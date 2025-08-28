import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { BadgeCheck } from 'lucide-react';

type ReportProps = {
  content: string; // raw markdown content
};

export default function ValidationReport({ content }: ReportProps) {
  // Trim markdown fences
  const trimmed = content
    .replace(/^```html?\s*/, '') // Remove opening fence
    .replace(/```$/, '') // Remove closing fence
    .trim();

  const [htmlContent, setHtmlContent] = useState<string>('');

  useEffect(() => {
    // parse markdown to HTML
    const rawHtml:any = marked.parse(trimmed);
    // sanitize HTML before injecting
    const cleanHtml = DOMPurify.sanitize(rawHtml);
    setHtmlContent(cleanHtml);
  }, [trimmed]);

  return (
    <>
      <style>{`
      .validation-report ul {
  list-style-type: disc ; /* solid dot bullets */
  margin-left: 1.5rem;    /* indent the list */
  padding-left: 0;
}
        .validation-report {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
            Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          max-width: 800px;
          margin: 2rem auto;
          padding: 1.5rem;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          color: #333;
          text-align: left;
        }
        .validation-report h1,
        .validation-report h2,
        .validation-report h3 {
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }
        .validation-report h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        .validation-report h2 {
          font-size: 1.5rem;
          margin-top: 1.5rem;
        }
        .validation-report p {
          line-height: 1.6;
          margin-bottom: 1rem;
        }
        .validation-report ul {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .validation-report ul li {
          margin-bottom: 0.4rem;
        }
        .validation-report .score {
          font-size: 2.2rem;
          font-weight: 700;
          color: #007bff;
        }
        /* Optional: style strong/bold */
        .validation-report strong {
          color: #222;
        }
      `}</style>

      <div className="validation-report">
        <h2 className="text-2xl font-bold text-purple-700 flex items-center gap-2" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
          <BadgeCheck size={24} className="text-green-600" />
          Validation Report
        </h2>

        {/* Inject parsed and sanitized HTML content */}
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </>
  );
}

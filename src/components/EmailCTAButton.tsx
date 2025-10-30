import React from "react";

interface EmailCTAButtonProps {
  /**
   * Optional override for email subject (will be URI-encoded automatically)
   */
  subject?: string;
  /**
   * Optional override for email body (will be URI-encoded automatically)
   */
  body?: string;
  /**
   * Tailwind classes to merge or override the default styling
   */
  className?: string;
  /**
   * Button text (children)
   */
  children?: React.ReactNode;
  /**
   * Optional title attribute (defaults to "Opens your mail app")
   */
  title?: string;
}

const DEFAULT_SUBJECT = "Consultation request – Mony Group";

const DEFAULT_BODY = `Hi Mony Group,%0D%0A%0D%0AI'd like to discuss a new project.%0D%0A%0D%0A• Project description:%0D%0A• Timeline:%0D%0A• Budget:%0D%0A%0D%0AI’m available for a call at the following times (please pick one):%0D%0A1.%0D%0A2.%0D%0A3.%0D%0A%0D%0AThanks!`;

export default function EmailCTAButton({
  subject = DEFAULT_SUBJECT,
  body,
  className = "inline-flex items-center gap-2 bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-md text-sm font-medium hover:opacity-80 transition",
  children = "Work With Me",
  title = "Opens your mail app",
}: EmailCTAButtonProps) {
  const href = React.useMemo(() => {
    const esc = encodeURIComponent;
    const mailto = `mailto:mony.group.corporation@gmail.com?subject=${esc(subject)}&body=${body ? esc(body) : DEFAULT_BODY}`;
    return mailto;
  }, [subject, body]);

  return (
    <a
      href={href}
      aria-label="Compose consultation email"
      title={title}
      className={className}
    >
      {/* envelope svg */}
      <span aria-hidden="true" className="text-lg leading-none">✉︎</span>
      {children}
    </a>
  );
}

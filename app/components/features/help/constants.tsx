import { FiMail, FiMessageSquare, FiBook, FiHeadphones } from "react-icons/fi";

export const faqs = [
    {
        id: 1,
        question: "How do I create a new document?",
        answer:
            'Creating a document is simple. Click the "New Document" button in your dashboard or workspace. You can then start typing immediately. All documents auto-save, so your work is always safe.',
    },
    {
        id: 2,
        question: "Can I share documents with specific people?",
        answer:
            "Yes! Click the Share button on any document to invite collaborators. You can set their role as either Editor (can modify) or Viewer (read-only). They'll receive an invitation email.",
    },
    {
        id: 3,
        question: "What happens to my documents if I delete my account?",
        answer:
            "Your documents will be permanently deleted 30 days after account deletion. During this grace period, you can recover your account and all its documents by logging back in.",
    },
    {
        id: 4,
        question: "Is there a limit to how many documents I can create?",
        answer:
            "No, on our free plan you can create unlimited documents. Storage is limited to 5GB. For more storage, upgrade to a paid plan.",
    },
    {
        id: 5,
        question: "How do I recover a deleted document?",
        answer:
            "Deleted documents are moved to your Trash folder and kept for 30 days. You can restore them from there. After 30 days, they're permanently deleted.",
    },
    {
        id: 6,
        question: "Does Notez support markdown?",
        answer:
            "Yes, full markdown support is built-in. Use standard markdown syntax, and your formatting will render beautifully. You can also use slash commands for quick formatting.",
    },
    {
        id: 7,
        question: "How real-time is the collaboration?",
        answer:
            "Collaboration is truly real-time with sub-50ms latency. You see collaborators' cursors, selections, and changes instantly as they type. Perfect for synchronous teamwork.",
    },
    {
        id: 8,
        question: "Can I export my documents?",
        answer:
            "Absolutely! You can export documents as PDF, Word (.docx), or Markdown (.md) files. Click the export option in the document menu.",
    },
];

export const contactOptions = [
    {
        icon: <FiMail size={24} />,
        title: "Email Support",
        description: "Get help via email. We respond within 24 hours.",
        action: "support@notez.com",
        href: "mailto:support@notez.com",
    },
    {
        icon: <FiMessageSquare size={24} />,
        title: "Live Chat",
        description: "Chat with our team in real-time. Available 9AM-6PM EST.",
        action: "Start Chat",
        href: "#",
    },
    {
        icon: <FiBook size={24} />,
        title: "Knowledge Base",
        description: "Browse comprehensive guides and documentation.",
        action: "Explore Docs",
        href: "#",
    },
    {
        icon: <FiHeadphones size={24} />,
        title: "Community Forum",
        description: "Get answers from our community of users.",
        action: "Join Forum",
        href: "#",
    },
];

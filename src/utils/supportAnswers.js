// Local, deterministic help. This is not a live AI or a support ticket service.
export function supportAnswer(question) {
  const text = question.toLowerCase();
  if (/privacy|data|delete/.test(text)) return "Read /privacy-policy for data handling details. For account or deletion requests, email support@placementdo.app. This local help panel cannot access or change your account.";
  if (/pay|price|plan|refund|credit/.test(text)) return "Purchases are not enabled in this demo. Displayed plans are previews; no payment or account credit is processed here. Contact support@placementdo.app about availability.";
  if (/star|behavior|behaviour|playbook/.test(text)) return "Use Situation, Task, Action, Result: briefly explain the context, describe your own actions, then give an honest result and what you learned. See /blog for worked preparation guides.";
  if (/score|report|analysis/.test(text)) return "The demo shows sample reports, not an assessment of your answers. Use them to explore the layout; do not treat sample scores as personal feedback.";
  if (/start|guide|platform|interview/.test(text)) return "Explore the dashboard and interview walkthrough to see the interface. It uses sample questions and data; a live interview service is not connected to this demo. Free written preparation guides are available at /blog.";
  return "I don't have a verified answer for that. This is local quick help, not a live AI assistant. Please email support@placementdo.app with your question or visit /faq.";
}

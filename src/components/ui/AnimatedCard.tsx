// 📁 src/components/ui/AnimatedCard.tsx

import styled from "styled-components";
import { motion } from "framer-motion";

// ✅ AnimatedCard is a styled motion.div component for reusable card layout
const AnimatedCard = styled(motion.div)`
  background-color: #ffffff; /* white background for light mode */
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.04);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center; /* ✅ center horizontally */
  min-height: 120px; /* ✅ ensures vertical centering consistency */
  cursor: default;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
  }

  /* Optional: if card contains headings and paragraphs, style them too */
  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #1f2937; /* gray-800 */
    margin: 0;
  }

  p {
    font-size: 20px;
    font-weight: bold;
    color: #111827; /* gray-900 */
    margin: 0;
  }

  /* ✅ Responsive adjustments */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    text-align: left;
    gap: 12px;
    padding: 20px;
  }
`;

export default AnimatedCard;

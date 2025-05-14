// 📁 src/pages/Dashboard/components/StatCards.tsx

import { FileText, Users, DollarSign } from "lucide-react";
import AnimatedCard from "../../../components/ui/AnimatedCard";
import {
  StatCardsGrid,
  StyledCard,
  IconWrapper,
  StatDetails,
  CardInnerContent,
} from "../../../styles/DashboardStyles/StatCardsStyles";

interface StatCardsProps {
  totalInvoices: number;
  totalCustomers: number;
  totalRevenue: number;
}

const StatCards: React.FC<StatCardsProps> = ({
  totalInvoices,
  totalCustomers,
  totalRevenue
}) => {
  const safeRevenue =
    typeof totalRevenue === "number" && !isNaN(totalRevenue)
      ? totalRevenue.toFixed(2)
      : "0.00";

  return (
    <StatCardsGrid>
      {/* 🔢 Total Invoices */}
      <AnimatedCard
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <StyledCard $color="#3b82f6">
          <CardInnerContent>
            <IconWrapper $color="#3b82f6">
              <FileText size={20} />
            </IconWrapper>
            <StatDetails>
              <h4>Total Invoices</h4>
              <p>{totalInvoices}</p>
            </StatDetails>
          </CardInnerContent>
        </StyledCard>
      </AnimatedCard>

      {/* 👥 Total Customers */}
      <AnimatedCard
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <StyledCard $color="#10b981">
          <CardInnerContent>
            <IconWrapper $color="#10b981">
              <Users size={20} />
            </IconWrapper>
            <StatDetails>
              <h4>Total Customers</h4>
              <p>{totalCustomers}</p>
            </StatDetails>
          </CardInnerContent>
        </StyledCard>
      </AnimatedCard>

      {/* 💵 Total Revenue */}
      <AnimatedCard
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <StyledCard $color="#f59e0b">
          <CardInnerContent>
            <IconWrapper $color="#f59e0b">
              <DollarSign size={20} />
            </IconWrapper>
            <StatDetails>
              <h4>Total Revenue</h4>
              <p>${safeRevenue}</p>
            </StatDetails>
          </CardInnerContent>
        </StyledCard>
      </AnimatedCard>
    </StatCardsGrid>
  );
};

export default StatCards;

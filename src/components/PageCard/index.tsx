import { Card, type CardProps } from "antd";

interface PageCardProps extends CardProps {
  title: string;
}

export function PageCard({ title, children, ...rest }: PageCardProps) {
  return (
    <Card
      title={title}
      bordered
      className="safe-card"
      styles={{ body: { paddingTop: 16 } }}
      {...rest}
    >
      {children}
    </Card>
  );
}

import React from 'react';
import './ZenDashboardCard.css';

/**
 * ZenDashboardCard Component - Zen-Tech Aesthetic Dashboard Card
 *
 * This is an example component demonstrating the new Zen-Tech design philosophy.
 * Features:
 * - Glassmorphism with backdrop blur
 * - 10% white opacity borders for a soft, organic feel
 * - Soft shadows instead of harsh borders
 * - Smooth micro-interactions on hover
 *
 * Usage:
 * <ZenDashboardCard
 *   title="Learning Progress"
 *   icon="📊"
 *   value="75%"
 *   subtitle="Courses Completed"
 *   accentColor="primary" // or 'secondary'
 * >
 *   <p>Additional card content here</p>
 * </ZenDashboardCard>
 */
const ZenDashboardCard = ({
  title,
  icon,
  value,
  subtitle,
  accentColor = 'primary',
  children,
  onClick,
  className = '',
}) => {
  return (
    <div
      className={`zen-dashboard-card zen-dashboard-card--${accentColor} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : 'article'}
      tabIndex={onClick ? 0 : -1}
      onKeyPress={
        onClick ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClick(e);
          }
        } : null
      }
    >
      {/* Gradient overlay effect */}
      <div className="zen-dashboard-card__overlay"></div>

      {/* Icon section with subtle animation */}
      {icon && (
        <div className="zen-dashboard-card__icon">
          {icon}
        </div>
      )}

      {/* Content section */}
      <div className="zen-dashboard-card__content">
        <h3 className="zen-dashboard-card__title">
          {title}
        </h3>

        {value && (
          <div className="zen-dashboard-card__value">
            {value}
          </div>
        )}

        {subtitle && (
          <p className="zen-dashboard-card__subtitle">
            {subtitle}
          </p>
        )}

        {children && (
          <div className="zen-dashboard-card__extra">
            {children}
          </div>
        )}
      </div>

      {/* Bottom accent line */}
      <div className="zen-dashboard-card__accent"></div>
    </div>
  );
};

export default ZenDashboardCard;

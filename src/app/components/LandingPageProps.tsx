export interface LandingPageProps {
  /** Opens the multi-step quote form (hero “Start a quote”, etc.). */
  onGetStarted: () => void;
  onNavigate?: (page: string) => void;
  renderEmbeddedForm?: () => JSX.Element;
  onOpenAuth?: () => void;
  onLogout?: () => void;
  onViewSubmissions?: () => void;
  user?: any;
}

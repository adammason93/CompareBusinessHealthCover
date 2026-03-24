export interface LandingPageProps {
  onGetStarted: () => void;
  onNavigate?: (page: string) => void;
  renderEmbeddedForm?: () => JSX.Element;
  onOpenAuth?: () => void;
  onLogout?: () => void;
  onViewSubmissions?: () => void;
  user?: any;
}

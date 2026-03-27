export interface LandingPageProps {
  /** Opens the multi-step quote form (optional; primary CTAs may open the on-site chat instead). */
  onGetStarted?: () => void;
  onNavigate?: (page: string) => void;
  renderEmbeddedForm?: () => JSX.Element;
  onOpenAuth?: () => void;
  onLogout?: () => void;
  onViewSubmissions?: () => void;
  user?: any;
}

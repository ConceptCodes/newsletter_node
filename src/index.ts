import App from "@/app";
import HealthRoute from "@route/health";
import AuthRoute from "@route/auth";
import SubscriptionRoute from "@route/subscription";
import ContactRoute from "@route/contact";
import DashboardRoute from "@route/dashboard";

export const app = new App([
  new HealthRoute(),
  new AuthRoute(),
  new SubscriptionRoute(),
  new ContactRoute(),
  new DashboardRoute(),
]);

app.listen();

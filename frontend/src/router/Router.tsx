import Redirect from "components/auth/Redirect";
import AuthFallback from "components/fallback/AuthFallback";
import ContentFallback from "components/fallback/ContentFallback";
import Progress from "components/progress";
import Container from "layouts/Container";
import NotFound from "pages/NotFound";
import React, { Suspense, useState } from "react";
import { HashRouter, Route, Routes, BrowserRouter as Router } from "react-router-dom";
import routes, { MainPageRoute } from "./routes";

const RouterComponent: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  return (
    <Router>
      <Redirect mainRoute={MainPageRoute}>
        <Progress isAnimating={isAnimating} />
        <Routes>
          {routes.map(({ path, component: Component, isAuth }) => {
            if (isAuth) {
              return (
                <Route
                  key={path}
                  path={path}
                  element={
                    <Suspense
                      fallback={
                        <AuthFallback
                          isAnimating={isAnimating}
                          setIsAnimating={setIsAnimating}
                        />
                      }
                    >
                      <Component />
                    </Suspense>
                  }
                />
              );
            }
            return (
              <Route
                key={path}
                path={path}
                element={
                  <Suspense
                    fallback={
                      <ContentFallback
                        isAnimating={isAnimating}
                        setIsAnimating={setIsAnimating}
                      />
                    }
                  >
                    <Container>
                      <Component />
                    </Container>
                  </Suspense>
                }
              />
            );
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Redirect>
    </Router>
  );
};
export default RouterComponent;
